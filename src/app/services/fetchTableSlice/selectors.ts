import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.fetchTable || initialState;

export const selectFetchTable = createSelector([selectSlice], state => state);
