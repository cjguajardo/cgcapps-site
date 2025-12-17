/**
 * Image utility functions for file conversion and manipulation
 * @module utils/image
 */

/**
 * Converts a Blob/File object to a Base64 encoded string
 *
 * @param {Blob} file - The file or blob to convert
 * @returns {Promise<string>} Promise that resolves to a base64 encoded string with MIME type
 * @throws {Error} If the result is not a valid string or if reading fails
 *
 * @example
 * const file = document.querySelector('input[type="file"]').files[0];
 * const base64 = await fileToBase64(file);
 * console.log(base64); // "data:image/png;base64,iVBORw0KG..."
 */
export const fileToBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Invalid base64 string"));
      } else {
        resolve(reader.result || "");
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Calculates the file size from a Base64 encoded string
 *
 * Decodes the base64 string and calculates the actual file size in bytes,
 * then converts to a human-readable format (MB or KB).
 *
 * @param {string} base64String - Base64 encoded string (with or without MIME type)
 * @param {boolean} [rounded=false] - Whether to round the size to whole numbers
 * @returns {string} Human-readable file size (e.g., "1.5 Mb" or "250 Kb")
 *
 * @example
 * getBase64Size("data:image/png;base64,iVBORw0KG...", false) // "1.23 Mb"
 * getBase64Size("data:image/png;base64,iVBORw0KG...", true)  // "1 Mb"
 */
export const getBase64Size = (
  base64String: string,
  rounded = false,
): string => {
  if (!base64String) {
    return "";
  }

  // Step 1: Remove MIME type if present
  const commaIndex = base64String.indexOf(",");
  if (commaIndex !== -1) {
    base64String = base64String.slice(commaIndex + 1);
  }

  // Step 2: Calculate length in bytes
  const length = base64String.length;
  const paddingCount = base64String
    .slice(-2)
    .split("")
    .reduce(function (count, char) {
      return count + (char === "=" ? 1 : 0);
    }, 0);
  const fileSizeInBytes = 3 * (length / 4) - paddingCount;

  // Step 3: Convert to megabytes
  const fileSizeInMB = parseFloat((fileSizeInBytes / 1048576).toFixed(2));

  if (fileSizeInMB >= 1) {
    if (rounded) {
      return Math.round(fileSizeInMB) + " Mb";
    }
    return `${fileSizeInMB} Mb`;
  }

  if (rounded) {
    return Math.round(fileSizeInMB * 1024) + " Kb";
  }
  return `${parseFloat((fileSizeInMB * 1024).toFixed(2))} Kb`;
};

/**
 * Extracts the MIME type from a Base64 encoded string
 *
 * @param {string} base64String - Base64 encoded string with MIME type prefix
 * @returns {string} The MIME type (e.g., "image/png", "image/jpeg") or empty string
 *
 * @example
 * getBase64Mime("data:image/png;base64,iVBORw0KG...") // "image/png"
 * getBase64Mime("data:image/jpeg;base64,/9j/4AA...") // "image/jpeg"
 */
export const getBase64Mime = (base64String: string): string => {
  if (!base64String) {
    return "";
  }
  if (!base64String.includes("data:")) {
    return "";
  }

  return base64String.split(";")[0].split(":")[1];
};

/**
 * Dimensions of an image
 */
export type ImageDimensions = {
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
};

/**
 * Gets the dimensions (width and height) of an image from a Base64 string
 *
 * Creates a temporary image element, loads the base64 data, and returns
 * the natural dimensions of the image.
 *
 * @param {string} base64String - Base64 encoded image string
 * @returns {Promise<ImageDimensions>} Promise resolving to width and height in pixels
 * @throws {Error} If the image fails to load
 *
 * @example
 * const dimensions = await getBase64Dimensions("data:image/png;base64,iVBORw0KG...");
 * console.log(dimensions); // { width: 1920, height: 1080 }
 */
export const getBase64Dimensions = (
  base64String: string,
): Promise<ImageDimensions> => {
  if (!base64String) {
    return Promise.resolve({ width: 0, height: 0 });
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64String;
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = (error) => reject(error);
  });
};
