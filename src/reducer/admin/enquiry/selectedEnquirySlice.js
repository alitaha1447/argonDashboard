import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enquiryId: null,
};

const selectedEnquirySlice = createSlice({
  name: "selectedEnquiry",
  initialState,
  reducers: {
    setSelectedEnquiryId: (state, action) => {
      state.enquiryId = action.payload;
    },
    clearSelectedEnquiryId: (state) => {
      state.enquiryId = null;
    },
  },
});

export const { setSelectedEnquiryId, clearSelectedEnquiryId } =
  selectedEnquirySlice.actions;
export default selectedEnquirySlice.reducer;
