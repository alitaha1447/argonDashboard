import React, { useState, useEffect } from "react";

const NoInternetConnection = ({ children }) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return children;
  } else {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <h1>No Internet Connection</h1>
        <p>Please check your network and try again.</p>
      </div>
    );
  }
};

export default NoInternetConnection;
