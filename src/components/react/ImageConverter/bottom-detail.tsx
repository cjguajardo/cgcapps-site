import { memo } from "react";
import { type ImageDimensions } from "@utils/image";

/**
 * Props for BottomDetail component
 */
type BottomDetailProps = {
  /** File size (e.g., "1.5 Mb", "250 Kb") */
  size: string | null;
  /** File name */
  name: string | null;
  /** MIME type (e.g., "image/png", "image/jpeg") */
  mime: string | null;
  /** Image dimensions in pixels */
  dimensions: ImageDimensions;
};

/**
 * Bottom detail panel displaying image metadata
 *
 * Shows file size, name, dimensions, and MIME type in a compact,
 * accessible format below image preview areas.
 *
 * @param {BottomDetailProps} props - Component props
 * @returns {JSX.Element} Formatted metadata panel
 *
 * @example
 * ```tsx
 * <BottomDetail
 *   size="1.2 Mb"
 *   name="photo.jpg"
 *   mime="image/jpeg"
 *   dimensions={{ width: 1920, height: 1080 }}
 * />
 * ```
 */
const BottomDetail = ({
  size = "",
  name = "",
  mime = "",
  dimensions = { width: 0, height: 0 },
}: BottomDetailProps) => {
  const dimString =
    dimensions.width + dimensions.height > 0
      ? `${dimensions?.width || 0}x${dimensions?.height || 0}`
      : "";
  const sizeString = size !== "" ? `${size}` : "";

  // Don't render if no data available
  if (!name && !size && !mime && !dimString) {
    return null;
  }

  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-b-lg px-4 py-2 bg-slate-900/30 border-gray-700 gap-2"
      role="region"
      aria-label="Image file information"
    >
      {/* File name - takes most space */}
      {name && (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <svg
            className="w-4 h-4 text-gray-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span
            className="text-sm text-gray-300 truncate"
            title={name}
            aria-label={`File name: ${name}`}
          >
            {name}
          </span>
        </div>
      )}

      {/* File size */}
      {sizeString && (
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
            />
          </svg>
          <span
            className="text-sm text-gray-300 font-mono"
            aria-label={`File size: ${sizeString}`}
          >
            {sizeString}
          </span>
        </div>
      )}

      {/* Dimensions */}
      {dimString && (
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
          <span
            className="text-sm text-gray-300 font-mono"
            aria-label={`Dimensions: ${dimString} pixels`}
          >
            {dimString}
          </span>
        </div>
      )}

      {/* MIME type */}
      {mime && (
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 tag M5.41 21L3 18.59V5a2 2 0 012-2h14a2 2 0 012 2v13.59L18.59 21M9 9h6m-6 4h6"
            />
          </svg>
          <span
            className="text-xs text-gray-400 font-mono uppercase"
            aria-label={`File type: ${mime}`}
          >
            {mime.replace("image/", "")}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(BottomDetail);
