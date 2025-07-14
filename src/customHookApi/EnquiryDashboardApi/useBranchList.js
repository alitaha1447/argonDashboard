import React, { useState } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const useBranchList = () => {
  const [branchOptions, setBranchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [branchSearchText, setBranchSearchText] = useState("");

  const fetchBranch = async (branchtype = "", parent_branch_id = "") => {
    try {
      const res = await axios.get(`${API_PATH}/api/Branches`, {
        params: {
          APIKEY: API_KEY,
          branchtype: branchtype,
          parent_branch_id: parent_branch_id,
          searchtext: branchSearchText,
        },
      });

      const options =
        res.data?.map((branch) => ({
          label: branch?.BranchName,
          value: branch?.BranchId,
        })) || [];
      setBranchOptions(options);

      if (branchtype === "2") {
        const districtOptions =
          res.data?.map((branch) => ({
            label: branch?.BranchName,
            value: branch?.BranchId,
          })) || [];
        return districtOptions;
      }
    } catch (error) {
      console.error("Branch fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    branchSearchText,
    setBranchSearchText, // ✅ Add this to return
  };
};

export default useBranchList;
