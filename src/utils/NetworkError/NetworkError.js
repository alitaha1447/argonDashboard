import React, { useEffect, useState } from 'react'

const NetworkError = () => {
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setOnline(true);
            // 🔄 Auto reload when internet comes back
            window.location.reload();
        };
        const handleOffline = () => setOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (online) return null;

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
            background: "#e11d48", color: "#fff", textAlign: "center", padding: "8px"
        }}>
            🚫 You’re offline. Some actions may not work.
        </div>
    )
}

export default NetworkError