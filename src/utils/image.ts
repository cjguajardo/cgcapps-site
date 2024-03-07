export const fileToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Calculates the size of a base64 encoded file in megabytes.
 *
 * @param {string} base64String - The base64 encoded file.
 * @returns {number} The size of the file in megabytes.
 */
export const getBase64Size = (
  base64String: string,
  rounded = false
): string => {
  // Step 1: Remove MIME type if present
  var commaIndex = base64String.indexOf(',');
  if (commaIndex !== -1) {
    base64String = base64String.slice(commaIndex + 1);
  }

  // Step 2: Calculate length in bytes
  var length = base64String.length;
  var paddingCount = base64String
    .slice(-2)
    .split('')
    .reduce(function (count, char) {
      return count + (char === '=' ? 1 : 0);
    }, 0);
  var fileSizeInBytes = 3 * (length / 4) - paddingCount;

  // Step 3: Convert to megabytes
  const fileSizeInMB = parseFloat((fileSizeInBytes / 1048576).toFixed(2));

  if (fileSizeInMB >= 1) {
    if (rounded) {
      return Math.round(fileSizeInMB) + ' Mb';
    }
    return `${fileSizeInMB} Mb`;
  }

  if (rounded) {
    return Math.round(fileSizeInMB * 1024) + ' Kb';
  }
  return `${parseFloat((fileSizeInMB * 1024).toFixed(2))} Kb`;
};
