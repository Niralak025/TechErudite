import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventItem } from '../../types/eventsTypes';

export interface FavouritesState {
  items: EventItem[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<EventItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        // Remove from favorites if it exists
        state.items.splice(existingIndex, 1);
      } else {
        // Add to favorites if it doesn't exist
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
