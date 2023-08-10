import React, { ReactNode, createContext, useContext } from "react";

const FormContext = createContext({});

export const FormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <FormContext.Provider value={"hello"}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
