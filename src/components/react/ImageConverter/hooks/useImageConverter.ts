import { useReducer, useRef, useEffect, useDeferredValue } from "react";
import reducer, {
  initialState,
  action,
} from "../reducer/ImageConverterReducer";
import Compressor from "compressorjs";
import {
  fileToBase64,
  type ImageDimensions,
  getBase64Dimensions,
} from "@utils/image";

/**
 * Custom hook for managing image conversion and compression functionality
 *
 * Features:
 * - Image file selection and drag-and-drop support
 * - Real-time image compression with quality and size adjustment
 * - Format conversion (JPEG, PNG, WebP)
 * - Preview of original and compressed images
 * - Deferred rendering for smooth performance during adjustments
 *
 * @returns {Object} Image converter state and handlers
 * @returns {Object} state - Current converter state (image data, dimensions, settings)
 * @returns {Function} handleClick - Triggers file selection dialog
 * @returns {Function} handleInputFileChange - Handles file input change
 * @returns {Function} handleDragOver - Handles drag over event
 * @returns {Function} handleDrop - Handles file drop event
 * @returns {Function} handleQualityChange - Updates compression quality
 * @returns {Function} handleRatioSizeChange - Updates image size ratio
 * @returns {Function} handleConvertToChange - Changes target format
 * @returns {Function} handleReset - Resets converter to initial state
 * @returns {React.RefObject} fileSelectorRef - Reference to hidden file input
 * @returns {React.RefObject} dropBoxRef - Reference to drop zone element
 *
 * @example
 * ```tsx
 * const {
 *   state,
 *   handleClick,
 *   handleDrop,
 *   dropBoxRef
 * } = useImageConverter();
 * ```
 */
export default function useImageConverter() {
  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const dropBoxRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  // Use deferred values for smooth UI during slider adjustments
  const deferredRatioSize = useDeferredValue(state.ratioSize);
  const deferredQuality = useDeferredValue(state.quality);

  /**
   * Triggers the hidden file input click to open file selection dialog
   */
  const handleClick = () => {
    fileSelectorRef.current?.click();
  };

  /**
   * Sets the background image of the drop box preview
   *
   * @param {string} base64 - Base64 encoded image string
   */
  const setDropBoxBackground = (base64: string) => {
    dropBoxRef.current?.style.setProperty("background-image", `url(${base64})`);
    dropBoxRef.current?.style.setProperty("background-size", "contain");
    dropBoxRef.current?.style.setProperty("background-repeat", "no-repeat");
    dropBoxRef.current?.style.setProperty("background-position", "center");
  };

  /**
   * Handles file selection from the input element
   * Converts file to base64 and stores original image data
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - File input change event
   */
  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e === null) {
      return;
    }

    const { target } = e;

    if (typeof target === "undefined" || target === null) {
      return;
    }
    if (target.files === null) {
      return;
    }

    const file = target && target.files.length > 0 ? target.files[0] : null;
    if (file === null) {
      return;
    }

    dispatch({ type: action.NAME, payload: file.name });

    fileToBase64(file).then((base64: string) => {
      setDropBoxBackground(base64);
      dispatch({ type: action.ORIGINAL, payload: base64 });
      getBase64Dimensions(base64).then((dimensions: ImageDimensions) => {
        dispatch({ type: action.ORIGINAL_DIMENSIONS, payload: dimensions });
      });
    });
  };

  /**
   * Handles change of target image format
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Select change event
   */
  const handleConvertTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: action.CONVERT_TO, payload: e.target.value });
  };

  /**
   * Handles compression quality adjustment
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Range input change event
   */
  const handleQuality = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: action.QUALITY, payload: parseInt(e.target.value) });
  };

  /**
   * Handles image size ratio adjustment
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Range input change event
   */
  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: action.RATIOSIZE, payload: parseInt(e.target.value) });
  };

  /**
   * Resets the converter to initial state
   * Clears all image data and settings
   */
  const handleReset = () => {
    dispatch({ type: action.RESET, payload: "" });
    dropBoxRef.current?.style.setProperty("background-image", "none");
  };

  /**
   * Performs image compression and conversion
   * Uses Compressor.js to compress and convert the image
   * based on quality, size, and format settings
   */
  const handleConvert = () => {
    const file = fileSelectorRef.current?.files
      ? fileSelectorRef.current?.files[0]
      : null;

    if (file === null) {
      dispatch({ type: action.RESET, payload: "" });
      return;
    }

    const { width, height } = state.compressed_dimensions;

    new Compressor(file as File, {
      quality: deferredQuality / 100,
      convertSize: Infinity,
      mimeType: `image/${state.convertTo}`,
      convertTypes: [`image/${state.convertTo}`],
      width,
      height,
      maxWidth: width,
      maxHeight: height,
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
        // Silently handle compression errors
      },
    });
  };

  /**
   * Handles file drop event in the drop zone
   * Processes dropped image file and displays preview
   *
   * @param {React.DragEvent<HTMLDivElement>} e - Drop event
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0] || null;

    if (file === null) {
      return;
    }
    if (fileSelectorRef.current === null) {
      return;
    }

    fileSelectorRef.current.files = e.dataTransfer.files;

    dispatch({ type: action.NAME, payload: file.name });

    fileToBase64(file).then((base64: string) => {
      setDropBoxBackground(base64);
      dispatch({ type: action.ORIGINAL, payload: base64 });
      getBase64Dimensions(base64).then((dimensions: ImageDimensions) => {
        dispatch({ type: action.ORIGINAL_DIMENSIONS, payload: dimensions });
        dispatch({ type: action.COMPRESSED_DIMENSIONS, payload: dimensions });
      });
    });
  };

  /**
   * Prevents default drag over behavior to enable drop functionality
   *
   * @param {React.DragEvent<HTMLDivElement>} e - Drag over event
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCopyToClipboard = () => {
    if (state.compressed === null) {
      return;
    }
    navigator.clipboard.writeText(state.compressed);

    dispatch({ type: action.COPIED, payload: true });

    setTimeout(() => {
      dispatch({ type: action.COPIED, payload: false });
    }, 2000);
  };

  useEffect(() => {
    if (state.original === null) {
      return;
    }
    handleConvert();
  }, [state.original, state.convertTo, deferredQuality, deferredRatioSize]);

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
