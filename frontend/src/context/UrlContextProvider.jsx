import { useState } from "react";
import { UrlContext } from "./UrlContest";

export const UrlContextProvider = ({ children }) => {
  const [url, setUrl] = useState("");

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
