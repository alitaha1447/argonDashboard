import React, { useState } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const usePreferredCourse = () => {
  const [courseOptions, setCourseOptions] = useState([]);
  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetCourse`, {
        params: {
          APIKEY: API_KEY,
          // searchtext: branchSearchText,
        },
        // headers: {
        //   APIKEY: API_KEY,
        // },
      });
      const formattedCourses = res.data.map((item) => ({
        value: item.Id,
        label: item.TopicTitle,
      }));
      setCourseOptions(formattedCourses);
    } catch (error) {
      console.log(`course_Error ---> ${error}`);
    }
  };

  return { courseOptions, fetchCourseDetails };
};

export default usePreferredCourse;
