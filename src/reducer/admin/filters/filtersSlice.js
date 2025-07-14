import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enquiryDashboard: {
    searchText: "",
    enquirytype: 1,
    status: null,
    branch: null,
    fromdate: null,
    todate: null,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAllFilters: (state, action) => {
      const screen = action.payload;
    },
  },
});

export const { setAllFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
