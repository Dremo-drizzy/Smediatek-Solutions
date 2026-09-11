import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

// onNewLead is called with (resource, id) whenever the server emits a
// "new-lead" event. Kept in a ref so the effect below only connects once
// per mount, regardless of whether the caller passes a fresh function
// reference on every render.
const useLeadSocket = (onNewLead) => {
  const callbackRef = useRef(onNewLead);
  callbackRef.current = onNewLead;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return undefined;

    const socket = io(import.meta.env.VITE_API_URL, { auth: { token } });

    socket.on("new-lead", ({ resource, id }) => {
      callbackRef.current(resource, id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useLeadSocket;
