


import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const redirectToGitHubRepositories = (username) => {
  const githubUrl = `https://github.com/profile/${username}/repositories`;
  window.location.href = githubUrl;
};

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();

    return () => {
      setUserDetails(null);
    };
  }, [username]);

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      {userDetails && (
        <div>
          <h2 className="text-2xl font-bold">{userDetails.login}</h2>
          <img src={userDetails.avatar_url} alt={userDetails.login} className="w-20 h-20 rounded-full mb-4" />
          <p className="mb-4">{userDetails.bio}</p>
          <p>Followers: {userDetails.followers}</p>
          <p>Repositories: {userDetails.public_repos}</p>
          <button onClick={() => redirectToGitHubRepositories(username)} className="text-blue-500 hover:underline">
            View Repositories
          </button>
          <br />
          <Link to="/" className="text-blue-500 hover:underline">Back to Search</Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';

// const UserProfile = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const { username } = useParams();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch(`https://api.github.com/users/${username}`);
//         if (!response.ok) {
//           throw new Error('User not found');
//         }
//         const data = await response.json();
//         setUserDetails(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchUserProfile();

//     return () => {
//       setUserDetails(null);
//     };
//   }, [username]);

//   return (
//     <div className="container mx-auto p-4">
//       {error && <p className="text-red-500">{error}</p>}
//       {userDetails && (
//         <div>
//           <h2 className="text-2xl font-bold">{userDetails.login}</h2>
//           <img src={userDetails.avatar_url} alt={userDetails.login} className="w-20 h-20 rounded-full mb-4" />
//           <p className="mb-4">{userDetails.bio}</p>
//           <p>Followers: {userDetails.followers}</p>
//           <p>Repositories: {userDetails.public_repos}</p>
//           <Link to={`/profile/${username}/repositories`} className="text-blue-500 hover:underline">View Repositories</Link>
//           <br />
//           <Link to="/" className="text-blue-500 hover:underline">Back to Search</Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

