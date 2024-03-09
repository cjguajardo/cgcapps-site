export const fileToBase64 = (file: Blob):  Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== 'string')
        {reject(new Error('Invalid base64 string'));}
      else {resolve(reader.result || '');}
    };
    reader.onerror = (error) => reject(error);
  });
};


export const getBase64Size = (base64String: string, rounded = false): string => {
  if(!base64String) return '';

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

export const getBase64Mime = (base64String: string): string => {
  if (!base64String) return '';
  if  (!base64String.includes('data:')) return '';

  return base64String.split(';')[0].split(':')[1];
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export const getBase64Dimensions = (base64String: string): Promise<ImageDimensions> => {
  if (!base64String) return Promise.resolve({ width: 0, height: 0 });

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64String;
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = (error) => reject(error);
  });
};
