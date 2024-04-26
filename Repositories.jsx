import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Repositories = () => {
  const { username } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/?tab=repositories`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRepositories();

    return () => {
      setRepositories([]);
    };
  }, [username]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Repositories for {username}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id} className="mb-2">
            <Link to={`/${username}/${repo.name}`} className="text-blue-500 hover:underline">
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
      <br />
      <Link to={`/profile/${username}`} className="text-blue-500 hover:underline">Back to Profile</Link>
    </div>
  );
};

export default Repositories;