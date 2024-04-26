

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "./assets/github-logo.png"
const GitHubSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (data.items.length === 0) {
        throw new Error('No users found');
      }
      setError(null); // Clear any previous error message
      setSearchResults(data.items);
      setSearchTerm('');
    } catch (error) {
      setError(error.message);
      setSearchResults([]); // Clear search results if there's an error
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4"><img src={Logo} /> GitHub Profile Search</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2"
          placeholder="Enter username"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {searchResults.map((user) => (
          <li key={user.id} className="flex items-center mb-4">
            <Link to={`/profile/${user.login}`} className="flex items-center">
              <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full mr-2" />
              <span className="text-blue-500 hover:underline">{user.login}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubSearch;