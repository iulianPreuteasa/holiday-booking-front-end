import React from "react";
import Table from "react-bootstrap/Table";

export default function AdminView({ users, onRoleChange, onSave, message }) {
  return (
    <>
      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, i) => (
              <tr key={user.id}>
                <td>{i}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">admin</option>
                    <option value="employer">employer</option>
                    <option value="employee">employee</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      <button className="btn btn-primary container-fluide" onClick={onSave}>
        Save changes
      </button>
    </>
  );
}
