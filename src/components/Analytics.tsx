
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-N0Y54XTQMM";

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
};
