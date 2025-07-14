import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

// console.log(API_PATH);

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ APIKEY, username, pwd }) => {
        // console.log(API_KEY);
        // console.log(username);
        // console.log(pwd);
        return {
          url: "/api/user_validate",
          method: "get",
          params: {
            APIKEY,
            username,
            pwd,
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
