import React, { useState } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const useStatusEnquiry = () => {
  const [statusOptions, setstatusOptions] = useState([]);
  const fetchEnquiry = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/Getstatus`, {
        params: {
          APIKEY: API_KEY,
          statusfor: "ENQUIRY",
        },
      });

      const formattedEnquiry = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setstatusOptions(formattedEnquiry);
    } catch (error) {
      console.log(`course_Error ---> ${error}`);
    }
  };

  return { statusOptions, fetchEnquiry };
};

export default useStatusEnquiry;
