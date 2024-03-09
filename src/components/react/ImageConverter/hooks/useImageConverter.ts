import { useReducer, useRef, useEffect, useDeferredValue } from 'react';
import reducer, {
  initialState,
  action,
} from '../reducer/ImageConverterReducer';
import Compressor from 'compressorjs';
import { fileToBase64, type ImageDimensions, getBase64Dimensions} from '@utils/image';

export default function useImageConverter() {
  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const dropBoxRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const deferredRatioSize = useDeferredValue(state.ratioSize);
  const deferredQuality = useDeferredValue(state.quality);

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
    if (file === null) return;

    dispatch({ type: action.NAME, payload: file.name });

    fileToBase64(file).then((base64: string) => {
      setDropBoxBackground(base64);
      dispatch({ type: action.ORIGINAL, payload: base64 });
      getBase64Dimensions(base64).then((dimensions:ImageDimensions) => {
        dispatch({ type: action.ORIGINAL_DIMENSIONS, payload: dimensions });
      });
    });
  };

  const handleConvertTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: action.CONVERT_TO, payload: e.target.value });
  };

  const handleQuality = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: action.QUALITY, payload: parseInt(e.target.value) });
  };

  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: action.RATIOSIZE, payload: parseInt(e.target.value) });
  };

  const handleReset = () => {
    dispatch({ type: action.RESET, payload: '' });
    dropBoxRef.current?.style.setProperty('background-image', 'none');
  };

  const handleConvert = () => {

    const file = fileSelectorRef.current?.files
      ? fileSelectorRef.current?.files[0]
      : null;

    if (file === null) {
      dispatch({ type: action.RESET, payload:'' })
      return;
    }

    const { width, height } = state.compressed_dimensions

    new Compressor(file as File, {
      quality: deferredQuality / 100,
      convertSize: Infinity,
      mimeType: `image/${state.convertTo}`,
      convertTypes: [`image/${state.convertTo}`],
      width, height,
      maxWidth: width, maxHeight: height,
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = function () {
          const base64 = reader.result as string;
          dispatch({ type: action.COMPRESSED, payload: base64 });
          // getBase64Dimensions(base64).then((dimensions:ImageDimensions) => {
          //   dispatch({ type: action.COMPRESSED_DIMENSIONS, payload: dimensions });
          // });
        };
      },
      error(err) {
        console.error(err.message);
      },
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0] || null;

    if (file === null) return;
    if (fileSelectorRef.current === null) return;

    fileSelectorRef.current.files = e.dataTransfer.files;

    dispatch({ type: action.NAME, payload: file.name });

    fileToBase64(file).then((base64: string) => {
      setDropBoxBackground(base64);
      dispatch({ type: action.ORIGINAL, payload: base64 });
      getBase64Dimensions(base64).then((dimensions:ImageDimensions) => {
        dispatch({ type: action.ORIGINAL_DIMENSIONS, payload: dimensions });
        dispatch({ type: action.COMPRESSED_DIMENSIONS, payload: dimensions });
      });

    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCopyToClipboard = () => {
    if (state.compressed === null) return;
    navigator.clipboard.writeText(state.compressed);

    dispatch({ type: action.COPIED, payload: true });

    setTimeout(() => {
      dispatch({ type: action.COPIED, payload: false });
    }, 2000);
  };

  useEffect(()=>{
    if(state.original===null) return;
    console.log({deferredRatioSize, deferredQuality})
    handleConvert();
  },[
    state.original,
    state.convertTo,
    deferredQuality,
    deferredRatioSize
  ])

  return {
    state,
    handlers: {
      handleConvertTo,
      handleSize,
      handleQuality,
      handleClick,
      handleInputFileChange,
      handleReset,
      // handleConvert,
      handleDrop,
      handleDragOver,
      handleCopyToClipboard,
    },
    refs: { fileSelectorRef, dropBoxRef },
  };
}
