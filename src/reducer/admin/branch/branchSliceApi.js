import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

export const branchApi = createApi({
  reducerPath: "branchApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_PATH }),
  endpoints: (builder) => ({
    branch: builder.query({
      query: ({ branchtype = "", parent_branch_id = "", searchtext = "" }) => {
        return {
          url: "/api/Branches",
          method: "GET",
          params: {
            APIKEY: API_KEY,
            branchtype,
            parent_branch_id,
            searchtext,
          },
        };
      },
    }),
  }),
});

export const { useBranchQuery } = branchApi;
