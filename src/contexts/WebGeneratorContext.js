import React, { createContext, useState } from "react";
import axios from "axios";

export const WebGeneratorContext = createContext();

export const WebGeneratorProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const generateWeb = async (prompt) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/anthropic/generate", { prompt });
      setGeneratedCode(response.data.data.response);
    } catch (error) {
      console.error("Error generating website:", error);
      alert(
        "An error occurred while generating the website. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WebGeneratorContext.Provider
      value={{ generateWeb, isLoading, generatedCode }}
    >
      {children}
    </WebGeneratorContext.Provider>
  );
};
