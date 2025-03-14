import React from 'react';

function DeactivatedUsers({ deactivatedUsers, handleActivate }) {
  return (
    <div className="w-64 bg-white shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Deactivated Accounts</h2>
      {deactivatedUsers.length === 0 ? (
        <p className="text-gray-500">No deactivated users</p>
      ) : (
        <ul className="space-y-2">
          {deactivatedUsers.map((user) => (
            <li
              key={user.username}
              className="p-2 rounded bg-gray-100 flex justify-between items-center"
            >
              <span>{user.username}</span>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                onClick={() => handleActivate(user)}
              >
                Activate
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeactivatedUsers;
