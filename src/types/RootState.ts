import { FetchTableState } from 'app/services/fetchTableSlice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  fetchTable?: FetchTableState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
