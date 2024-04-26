import React, { createContext, useContext } from 'react';
import { useState } from 'react';
// Create a context
const ThemeContext = createContext();

// Create a hook to use the theme context
const useTheme = () => useContext(ThemeContext);

// Define the ThemeProvider component
const ThemeProvider = ({ children }) => {
  //use state to create the state
  const [theme, setTheme] = useState('light');
  
  //create a function that will update the state
  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    //return the provider with the value prop that contains the state and the function that will update the state
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };