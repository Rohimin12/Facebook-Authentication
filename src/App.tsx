import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./pages/authentication/context/authContext";
import Authenticate from "./pages/authentication/Authenticate";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Authenticate />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
