import React from "react";
import PropTypes from "prop-types";
import { BsDownload } from "react-icons/bs"; // Bootstrap icon

const DownloadSampleFile = ({
  filePath,
  fileName,
  label = "Download Sample File",
  className = "",
  showIcon = true,
}) => {
  return (
    <div className={`mb-3  align-items-center gap-0 ${className}`}>
      <p className="fw-bold">Download File</p>
      <a
        href={filePath}
        download={fileName}
        className="btn btn-outline-primary btn-sm d-flex align-items-center"
        title="Download the sample file"
      >
        {showIcon && <BsDownload className=" mr-2 my-2" size={12} />}
        {label}
      </a>
    </div>
  );
};

DownloadSampleFile.propTypes = {
  filePath: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  showIcon: PropTypes.bool,
};

export default DownloadSampleFile;
