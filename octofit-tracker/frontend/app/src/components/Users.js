import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users API endpoint:', apiUrl);
        console.log('Fetched users data:', data);
        setUsers(data.results || data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mb-4">
      <h2 className="card-title mb-4 text-primary">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              {users.length > 0 && Object.keys(users[0]).map((key) => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                {Object.values(user).map((val, i) => (
                  <td key={i}>{Array.isArray(val) ? val.join(', ') : val?.toString()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="alert alert-info">No users found.</div>}
      </div>
    </div>
  );
};

export default Users;
