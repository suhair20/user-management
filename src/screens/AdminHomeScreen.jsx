import React from 'react'
import { useGetUsersQuery } from '../slices/usersApiSlice'
import './AdminHomeScreen.css'

function AdminHomeScreen() {

  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
        <h1>Admin Page</h1>
        <table className="admin-table" >
            <thead>
                <tr>
                    <th>ID</th>
                    <br/>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <br/>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}

export default AdminHomeScreen
