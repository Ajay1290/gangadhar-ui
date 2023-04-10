import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { fetchTableSaga } from './saga';
import { FetchTableState } from './types';

export const initialState: FetchTableState = {};

const slice = createSlice({
  name: 'fetchTable',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {
      console.log('Caled');
    },
  },
});

export const { actions: fetchTableActions } = slice;

export const useFetchTableSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: fetchTableSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useFetchTableSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
