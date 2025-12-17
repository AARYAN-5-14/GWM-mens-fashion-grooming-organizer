import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Loader from "./components/Loader.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    const isBeardFormNested =
      location.pathname.includes("/grooming/party/BeardForm/");

    if (isBeardFormNested && !firstLoad.current) {
      // Skip loader when navigating inside BeardForm subroutes
      setLoading(false);
      return;
    }

    // Always show loader on first page load or normal route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      firstLoad.current = false; // mark after first load
    }, 1000); // 1s loader

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <>{loading ? <Loader /> : <Outlet />}</>;
}

export default App;




