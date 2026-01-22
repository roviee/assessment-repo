"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/api";
import { User } from "@/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [fullName, setFullName] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const isValidFullName = (name: string) => /^[A-Za-z\s]+$/.test(name.trim());

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    if (!fullName.trim()) return;
    if (!isValidFullName(fullName)) {
      alert("Full name must contain letters only (no numbers).");
      return;
    }

    await createUser(fullName);
    setFullName("");
    setShowForm(false);
    fetchUsers();
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    if (!isValidFullName(fullName)) {
      alert("Full name must contain letters only (no numbers).");
      return;
    }

    await updateUser(editingUser.id, fullName);
    setEditingUser(null);
    setFullName("");
    setShowForm(false);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFullName(user.full_name);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return;

    await deleteUser(id);
    fetchUsers();
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFullName("");
    setShowForm(false);
  };

  const isInvalidName = fullName.length > 0 && !isValidFullName(fullName);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Full Name Calculator Management
          </h1>
          <p className="mt-2 text-gray-600">
            Create, update, and delete users with calculated results
          </p>
        </div>

        {/* Add Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
          >
            + Add New User
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full border rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {isInvalidName && (
                  <p className="text-red-500 text-sm mt-1">
                    Letters and spaces only. No numbers allowed.
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={editingUser ? handleUpdate : handleCreate}
                  disabled={isInvalidName}
                  className={`px-5 py-2 rounded-lg text-white transition
                    ${
                      isInvalidName
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }
                  `}
                >
                  {editingUser ? "Update" : "Calculate"}
                </button>

                <button
                  onClick={handleCancel}
                  className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">
                      Result
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-black">{user.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-black">{user.full_name}</td>
                      <td className="px-6 py-4 text-sm text-black">{user.result}</td>
                      <td className="px-6 py-4 text-sm font-medium text-black">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
      </div>
    </div>
  );
}
