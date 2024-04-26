

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GitHubSearch from './GitHubSearch.jsx';
import UserProfile from './UserProfile';
import Repositories from './Repositories.jsx';
import { useTheme } from './context/ThemeContext'; // Import the useTheme hook from your ThemeProvider file

const App = () => {
  const { theme, handleThemeChange } = useTheme(); // Use the useTheme hook to access the theme and handleThemeChange

  const backgroundColor = {
    backgroundColor: theme === 'light' ? 'white' : 'black',
    color: theme === 'light' ? 'black' : 'white' 
  };

  return (
    <>
      <main style={backgroundColor}>
        <button className="flex items-center mb-4 ml-10 mt-4" onClick={handleThemeChange}>Change Theme</button>
      

    <Router>
      <Routes>
        <Route exact path="/" element={<GitHubSearch/>} />
        <Route path="/profile/:username" element={<UserProfile/>} />
        <Route path="/profile/:username/repositories" element={Repositories} />
      </Routes>
    </Router>
    </main>
    </>
  );
};

export default App;
