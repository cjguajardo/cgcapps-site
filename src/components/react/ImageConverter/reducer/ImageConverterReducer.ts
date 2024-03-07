export type actionType = {
  type: string;
  payload: string | number | boolean | null;
};
export type imageConverterStateType = {
  convertTo: string;
  quality: number;
  output: string;
  compressed: string | null;
  original: string | null;
  copied: boolean;
};
export const initialState = {
  convertTo: 'webp',
  quality: 95,
  output: 'file',
  compressed: null,
  original: null,
  copied: false,
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
    case 'OUTPUT':
      return { ...state, output: action.payload as string };
    case 'SET_COMPRESSED':
      return { ...state, compressed: action.payload as string };
    case 'SET_ORIGINAL':
      return { ...state, original: action.payload as string };
    case 'COPIED':
      return { ...state, copied: action.payload as boolean };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
