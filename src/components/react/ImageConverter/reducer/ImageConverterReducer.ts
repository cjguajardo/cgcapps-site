import {type ImageDimensions} from '@utils/image';

export type actionType = {
  type: string;
  payload: string | number | boolean | ImageDimensions | null;
};
export type imageConverterStateType = {
  convertTo: string;
  quality: number;
  ratioSize:number;
  compressed: string | null;
  compressed_dimensions: ImageDimensions;
  original: string | null;
  original_dimensions: ImageDimensions;
  copied: boolean;
  name:string|null
};
export const initialState = {
  convertTo: 'webp',
  quality: 95,
  ratioSize:100,
  compressed: null,
  compressed_dimensions: { width: 0, height: 0 },
  original: null,
  original_dimensions: { width: 0, height: 0 },
  copied: false,
  name:null
};

export const action = {
  CONVERT_TO: 'CONVERT_TO',
  QUALITY: 'QUALITY',
  RATIOSIZE: 'RATIOSIZE',
  COMPRESSED: 'COMPRESSED',
  COMPRESSED_DIMENSIONS: 'COMPRESSED_DIMENSIONS',
  ORIGINAL: 'ORIGINAL',
  ORIGINAL_DIMENSIONS: 'ORIGINAL_DIMENSIONS',
  COPIED: 'COPIED',
  RESET: 'RESET',
  NAME: 'NAME'

};

export const reducer = (
  state: imageConverterStateType,
  action: actionType
): imageConverterStateType => {
  switch (action.type) {
    case 'CONVERT_TO':
      return { ...state, convertTo: action.payload as string };
    case 'QUALITY':
      return { ...state, quality: action.payload as number };
    case 'RATIOSIZE':
      const ratio = (action.payload as number) / 100;
      const compressed_dimensions = {
        width: Math.round(state.original_dimensions.width * ratio),
        height: Math.round(state.original_dimensions.height * ratio),
      };

      return { ...state, ratioSize: action.payload as number, compressed_dimensions }
    case 'COMPRESSED':
      return { ...state, compressed: action.payload as string };
    case 'COMPRESSED_DIMENSIONS':
      return { ...state, compressed_dimensions: action.payload as ImageDimensions };
    case 'ORIGINAL':
      return { ...state, original: action.payload as string };
    case 'ORIGINAL_DIMENSIONS':
      return { ...state, original_dimensions: action.payload as ImageDimensions };
    case 'NAME':
      return { ...state, name: action.payload as string };
    case 'COPIED':
      return { ...state, copied: action.payload as boolean };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
