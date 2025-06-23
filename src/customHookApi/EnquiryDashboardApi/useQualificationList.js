import React, { useEffect, useState } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const useQualificationList = () => {
  //   console.log("useQualificationList");
  // Qualifications
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [selectedQualification, setSelectedOptionsQualification] =
    useState(null);
  const [error, setError] = useState(null);

  const fetchQualificationLists = async () => {
    // console.log("fetchQualificationLists");

    try {
      const res = await axios.get(`${API_PATH}/api/GetQualification`, {
        params: {
          APIKEY: API_KEY,
          // searchtext: branchSearchText,
        },
        // headers: {
        //   APIKEY: API_KEY,
        // },
      });
      const formattedQualification = res.data.map((item) => ({
        label: item.QualificationName,
        value: item.QualificationId,
      }));
      setQualificationOptions(formattedQualification);
    } catch (error) {
      setError(error);
      console.error("qualification_Error --->", error);
    }
  };

  return { qualificationOptions, fetchQualificationLists, error };
};

export default useQualificationList;
