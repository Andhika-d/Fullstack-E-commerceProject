"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

// Dummy data awal
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    avatar:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    avatar:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const [formUser, setFormUser] = useState({
    id: null,
    name: "",
    email: "",
    role: "User",
    status: "Active",
    avatar: "",
  });

  const [mode, setMode] = useState("add");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  // Filter
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = role === "all" || u.role === role;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const resetForm = () => {
    setFormUser({
      id: null,
      name: "",
      email: "",
      role: "User",
      status: "Active",
      avatar: "",
    });
  };

  const handleAddUser = () => {
    const newId = users.length + 1;
    const userToAdd = { ...formUser, id: newId };
    setUsers([...users, userToAdd]);
    resetForm();
    setIsDialogOpen(false);
    toast({
      title: "✅ User added",
      description: `${userToAdd.name} has been added successfully.`,
    });
  };

  const handleEditUser = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === formUser.id ? formUser : u))
    );
    resetForm();
    setIsDialogOpen(false);
    toast({
      title: "✏️ User updated",
      description: `${formUser.name} has been updated successfully.`,
    });
  };

  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    toast({
      title: "🗑️ User deleted",
      description: `${deleteTarget.name} has been removed.`,
      variant: "destructive",
    });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 bg-gray-50 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>

        {/* Modal Add/Edit */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                setMode("add");
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              + Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Add New User" : "Edit User"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-3">
              <Input
                placeholder="Full Name"
                value={formUser.name}
                onChange={(e) =>
                  setFormUser({ ...formUser, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                type="email"
                value={formUser.email}
                onChange={(e) =>
                  setFormUser({ ...formUser, email: e.target.value })
                }
              />
              <Select
                value={formUser.role}
                onValueChange={(val) =>
                  setFormUser({ ...formUser, role: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={formUser.status}
                onValueChange={(val) =>
                  setFormUser({ ...formUser, status: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Avatar URL"
                value={formUser.avatar}
                onChange={(e) =>
                  setFormUser({ ...formUser, avatar: e.target.value })
                }
              />
            </div>

            <DialogFooter>
              <Button
                onClick={() =>
                  mode === "add" ? handleAddUser() : handleEditUser()
                }
                className="bg-blue-600"
              >
                {mode === "add" ? "Save" : "Update"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3"
        />
        <Select
          onValueChange={(val) => {
            setRole(val);
            setPage(1);
          }}
          defaultValue="all"
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Avatar</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <img
                      src={
                        user.avatar ||
                        "https://via.placeholder.com/60?text=No+Avatar"
                      }
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMode("edit");
                        setFormUser(user);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteTarget(user)}
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete{" "}
                            <span className="font-bold">
                              {deleteTarget?.name}
                            </span>
                            ?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteUser}
                            className="bg-red-600 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card (mobile) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {paginatedUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  user.avatar ||
                  "https://via.placeholder.com/60?text=No+Avatar"
                }
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Role: {user.role}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.status}
              </span>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMode("edit");
                  setFormUser(user);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteTarget(user)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
