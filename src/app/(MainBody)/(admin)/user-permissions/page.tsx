"use client";
import { getAllUsers, updateRole } from "@/server/users";
import React, { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader, Table } from "reactstrap";

const Page = () => {
  const [users, setUsers] = useState([]);
  const roleOptions = ["student", "mentor", "admin"];

  const getAllUserFunc = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRole(userId, newRole);
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    getAllUserFunc();
  }, []);

  return (
    <div>
      <Card className="mt-2">
        <CardHeader>Users</CardHeader>
        <Table striped responsive>
          <thead className="p-2">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user: any, index) => (
                <tr key={user?._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <CardFooter className="text-center">
          {users.length} users found
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
