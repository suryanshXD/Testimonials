import { useState } from "react";
import { IdContext } from "./idcontext";

export const ContextProvider = ({ children }) => {
  const [testiomialId, setTestimonialId] = useState([]);
  return (
    <IdContext.Provider value={{ testiomialId, setTestimonialId }}>
      {children}
    </IdContext.Provider>
  );
};
