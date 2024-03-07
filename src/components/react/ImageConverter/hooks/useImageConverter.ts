import { useReducer, useRef } from 'react';
import reducer, { initialState } from '../reducer/ImageConverterReducer';
import Compressor from 'compressorjs';
import { fileToBase64 } from '@utils/image';

export default function useImageConverter() {
  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const dropBoxRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = () => {
    fileSelectorRef.current?.click();
  };

  const setDropBoxBackground = (base64: string) => {
    dropBoxRef.current?.style.setProperty('background-image', `url(${base64})`);
    dropBoxRef.current?.style.setProperty('background-size', 'contain');
    dropBoxRef.current?.style.setProperty('background-repeat', 'no-repeat');
    dropBoxRef.current?.style.setProperty('background-position', 'center');
  };

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e === null) return;

    const { target } = e;

    if (typeof target === 'undefined' || target === null) return;
    if (target.files === null) return;

    const file = target && target.files.length > 0 ? target.files[0] : null;

    fileToBase64(file).then((base64: string) => {
      setDropBoxBackground(base64);
      dispatch({ type: 'SET_ORIGINAL', payload: base64 });
    });
  };

  const handleConvertTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'CONVERT_TO', payload: e.target.value });
  };

  const handleQuality = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'QUALITY', payload: parseInt(e.target.value) });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET', payload: '' });
    dropBoxRef.current?.style.setProperty('background-image', 'none');
  };

  const handleOutput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'OUTPUT', payload: e.target.value });
  };

  const handleConvert = () => {
    console.log('Convert to:', state.convertTo);
    console.log('Quality:', state.quality);
    console.log('Output:', state.output);

    const file = fileSelectorRef.current?.files
      ? fileSelectorRef.current?.files[0]
      : null;

    if (file === null) return;

    new Compressor(file as File, {
      quality: state.quality / 100,
      convertSize: Infinity,
      mimeType: `image/${state.convertTo}`,
      convertTypes: [`image/${state.convertTo}`],
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = function () {
          const base64 = reader.result as string;
          dispatch({ type: 'SET_COMPRESSED', payload: base64 });
        };
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0] || null;

    if (file === null) return;
    if (fileSelectorRef.current === null) return;

    fileSelectorRef.current.files = e.dataTransfer.files;

    fileToBase64(file).then((base64: string) => {
      setDropBoxBackground(base64);
      dispatch({ type: 'SET_ORIGINAL', payload: base64 });
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCopyToClipboard = () => {
    if (state.compressed === null) return;
    navigator.clipboard.writeText(state.compressed);

    dispatch({ type: 'COPIED', payload: true });

    setTimeout(() => {
      dispatch({ type: 'COPIED', payload: false });
    }, 2000);
  };

  return {
    state,
    handlers: {
      handleConvertTo,
      handleOutput,
      handleQuality,
      handleClick,
      handleInputFileChange,
      handleReset,
      handleConvert,
      handleDrop,
      handleDragOver,
      handleCopyToClipboard,
    },
    refs: { fileSelectorRef, dropBoxRef },
  };
}
