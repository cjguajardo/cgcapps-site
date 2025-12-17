import React from "react";
import { getBase64Size, getBase64Mime } from "@utils/image";
import useImageConverter from "./hooks/useImageConverter";
import Success from "@components/react/animated/success";
import BottomDetail from "./bottom-detail";

/**
 * Image Converter component with compression and format conversion
 *
 * Features:
 * - Drag-and-drop or click to upload
 * - Convert between PNG, JPG, WebP, GIF
 * - Adjust quality and resize
 * - Copy base64 or download result
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <ImageConverter client:visible />
 * ```
 */
export default function ImageConverter() {
  const { state, handlers, refs } = useImageConverter();
  const {
    handleConvertTo,
    handleQuality,
    handleClick,
    handleInputFileChange,
    handleReset,
    handleCopyToClipboard,
    handleDrop,
    handleDragOver,
    handleSize,
  } = handlers;
  const { fileSelectorRef, dropBoxRef } = refs;

  const [isDragging, setIsDragging] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const compressedSize = getBase64Size(state.compressed || "", true);
  const compressedMime = getBase64Mime(state.compressed || "");

  const originalSize = getBase64Size(state.original || "", true);
  const originalMime = getBase64Mime(state.original || "");

  const downloadName = state.name
    ? state.name.split(".")[0] + "." + state.convertTo
    : "";

  const hasImage = state.original !== null;

  // Enhanced drag handlers with visual feedback
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDropWithFeedback = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setIsProcessing(true);
    handleDrop(e);
    setTimeout(() => setIsProcessing(false), 500);
  };

  const handleInputChangeWithFeedback = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsProcessing(true);
    handleInputFileChange(e);
    setTimeout(() => setIsProcessing(false), 500);
  };

  const handleResetWithConfirmation = () => {
    if (hasImage) {
      handleReset();
    }
  };

  return (
    <div
      className="flex flex-col justify-items-center w-full relative"
      role="region"
      aria-label="Image converter tool"
    >
      {/* Instructions */}
      <div className="mb-6 p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
        <h2 className="text-base sm:text-lg font-bold text-indigo-300 mb-2">
          How to use:
        </h2>
        <ol className="text-sm sm:text-base text-gray-300 space-y-1 list-decimal list-inside">
          <li>Upload an image by dragging or clicking the box below</li>
          <li>Adjust quality, size, and choose output format</li>
          <li>Copy the base64 string or download the result</li>
        </ol>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Supported formats: PNG, JPG, WebP, GIF (max 10MB recommended)
        </p>
      </div>

      {/* Upload Area */}
      <div className="mb-4 w-full md:px-5 py-2">
        <label
          htmlFor="file-input"
          className="block text-gray-400 font-bold mb-2 text-sm sm:text-base"
        >
          Upload Image
        </label>
        <div
          className={`border-2 border-dashed rounded-t-lg p-4 w-full h-[240px] sm:h-[200px] transition-all duration-200 ${
            isDragging
              ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
              : hasImage
                ? "border-green-500/50 bg-green-900/10"
                : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-900/5"
          } hover:cursor-pointer flex justify-items-center focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500`}
          ref={dropBoxRef}
          onDrop={handleDropWithFeedback}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="Upload image area - click to select or drag and drop"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          {isProcessing ? (
            <div className="text-center text-indigo-400 flex-wrap content-center flex mx-auto h-full">
              <div className="w-full">
                <svg
                  className="animate-spin h-8 w-8 mx-auto mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            </div>
          ) : state.original === null ? (
            <div className="text-center text-slate-400 flex-wrap content-center flex mx-auto h-full">
              <div className="w-full">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm sm:text-base">
                  Drag an image here or{" "}
                  <span className="text-indigo-400 underline">
                    click to select
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-green-400 flex-wrap content-center flex mx-auto h-full">
              <div className="w-full">
                <svg
                  className="w-12 h-12 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm sm:text-base">
                  Image loaded successfully!
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Click to select a different image
                </p>
              </div>
            </div>
          )}
        </div>
        <BottomDetail
          size={originalSize}
          name={state.name}
          mime={originalMime}
          dimensions={state.original_dimensions}
        />
        <input
          type="file"
          id="file-input"
          className="sr-only"
          ref={fileSelectorRef}
          onChange={handleInputChangeWithFeedback}
          accept="image/*"
          aria-label="Select image file"
        />
      </div>

      {/* Converted Image Output */}
      {state.compressed !== null && (
        <div className="mb-4 w-full md:px-5 py-2 animate-fadeIn">
          <label className="block text-gray-400 font-bold mb-2 text-sm sm:text-base">
            Converted Image (Base64)
          </label>
          <div
            className="border border-dashed rounded-t-lg border-green-500/50 bg-slate-900/50 p-4 w-full h-[240px] sm:h-[200px] break-words overflow-y-auto overflow-x-hidden text-xs sm:text-sm text-gray-300 font-mono"
            role="region"
            aria-label="Converted image base64 output"
            tabIndex={0}
          >
            {state.compressed}
          </div>
          <BottomDetail
            size={compressedSize}
            name={state.name}
            mime={compressedMime}
            dimensions={state.compressed_dimensions}
          />

          <div className="mb-4 w-full md:w-3/4 px-5 py-2 flex flex-col md:flex-row gap-2 justify-items-center m-auto">
            <button
              className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3 sm:py-2 px-4 rounded-full w-full transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 min-h-[44px]"
              onClick={handleCopyToClipboard}
              aria-label="Copy base64 string to clipboard"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy to clipboard
              {state.copied && (
                <span className="animate-bounceIn">
                  <Success />
                </span>
              )}
            </button>
            <a
              className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3 sm:py-2 px-4 rounded-full w-full transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 min-h-[44px]"
              download={downloadName}
              href={state.compressed || ""}
              aria-label={`Download converted image as ${downloadName}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </a>
          </div>
        </div>
      )}

      {/* Options */}
      <div
        className="flex flex-col sm:flex-row items-start justify-center gap-4 p-4 bg-slate-900/30 rounded-lg"
        role="group"
        aria-label="Image conversion options"
      >
        {/* Format Selection */}
        <div className="mb-4 w-full px-5 py-2">
          <label
            htmlFor="convertTo"
            className="block px-4 py-2 uppercase text-xs sm:text-sm font-bold text-gray-400"
          >
            Convert to:
          </label>
          <select
            className="w-full sm:w-48 p-3 sm:p-2 mt-2 rounded bg-slate-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[44px]"
            name="convertTo"
            id="convertTo"
            value={state.convertTo}
            onChange={handleConvertTo}
            aria-label="Select output format"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WebP</option>
            <option value="gif">GIF</option>
          </select>
        </div>

        {/* Resize */}
        <div className="mb-4 w-full px-5 py-2">
          <label
            htmlFor="resize-slider"
            className="block px-4 py-2 uppercase text-xs sm:text-sm font-bold text-gray-400"
          >
            Resize:
          </label>
          <div className="flex flex-row w-full mt-2 items-center gap-2">
            <input
              type="range"
              id="resize-slider"
              min="0"
              max="200"
              step="5"
              value={state.ratioSize}
              className="w-full sm:w-48 rounded accent-indigo-500 h-8 sm:h-6"
              onChange={handleSize}
              aria-label={`Resize image to ${state.ratioSize} percent`}
              aria-valuemin={0}
              aria-valuemax={200}
              aria-valuenow={state.ratioSize}
            />
            <span
              className="text-sm text-slate-300 font-mono min-w-[3rem] text-right"
              aria-live="polite"
            >
              {state.ratioSize}%
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1 px-4">
            <span>0%</span>
            <span>200%</span>
          </div>
        </div>

        {/* Quality */}
        <div className="mb-4 w-full px-5 py-2">
          <label
            htmlFor="quality-slider"
            className="block px-4 py-2 uppercase text-xs sm:text-sm font-bold text-gray-400"
          >
            Quality:
          </label>
          <div className="flex flex-row w-full mt-2 items-center gap-2">
            <input
              type="range"
              id="quality-slider"
              min="0"
              max="100"
              step="5"
              value={state.quality}
              className="w-full sm:w-48 rounded accent-indigo-500 h-8 sm:h-6"
              onChange={handleQuality}
              aria-label={`Set compression quality to ${state.quality} percent`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={state.quality}
            />
            <span
              className="text-sm text-slate-300 font-mono min-w-[3rem] text-right"
              aria-live="polite"
            >
              {state.quality}%
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1 px-4">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mb-4 w-full sm:w-auto px-5 py-2 flex items-end">
          <button
            className={`${
              hasImage
                ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
                : "bg-gray-600 cursor-not-allowed opacity-50"
            } text-white font-bold py-3 sm:py-2 px-6 rounded-full w-full sm:w-auto transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 min-h-[44px]`}
            onClick={handleResetWithConfirmation}
            disabled={!hasImage}
            aria-label="Reset image converter"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
