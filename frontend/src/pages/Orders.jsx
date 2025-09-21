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
const initialOrders = [
  {
    id: 1,
    customer: "John Doe",
    product: "Nike Air Max",
    amount: "$120",
    status: "Pending",
    date: "2025-09-15",
  },
  {
    id: 2,
    customer: "Jane Smith",
    product: "Adidas Hoodie",
    amount: "$75",
    status: "Completed",
    date: "2025-09-16",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const [formOrder, setFormOrder] = useState({
    id: null,
    customer: "",
    product: "",
    amount: "",
    status: "Pending",
    date: "",
  });

  const [mode, setMode] = useState("add");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  // Filter
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || o.status === status;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / perPage);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const resetForm = () => {
    setFormOrder({
      id: null,
      customer: "",
      product: "",
      amount: "",
      status: "Pending",
      date: "",
    });
  };

  const handleAddOrder = () => {
    const newId = orders.length + 1;
    const orderToAdd = {
      ...formOrder,
      id: newId,
      amount: formOrder.amount.startsWith("$")
        ? formOrder.amount
        : `$${formOrder.amount}`,
    };
    setOrders([...orders, orderToAdd]);
    resetForm();
    setIsDialogOpen(false);
    toast({
      title: "✅ Order added",
      description: `Order for ${orderToAdd.customer} has been added successfully.`,
    });
  };

  const handleEditOrder = () => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === formOrder.id
          ? {
              ...formOrder,
              amount: formOrder.amount.startsWith("$")
                ? formOrder.amount
                : `$${formOrder.amount}`,
            }
          : o
      )
    );
    resetForm();
    setIsDialogOpen(false);
    toast({
      title: "✏️ Order updated",
      description: `Order for ${formOrder.customer} has been updated successfully.`,
    });
  };

  const handleDeleteOrder = () => {
    setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
    toast({
      title: "🗑️ Order deleted",
      description: `Order for ${deleteTarget.customer} has been removed.`,
      variant: "destructive",
    });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 bg-gray-50 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>

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
              + Add Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Add New Order" : "Edit Order"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-3">
              <Input
                placeholder="Customer Name"
                value={formOrder.customer}
                onChange={(e) =>
                  setFormOrder({ ...formOrder, customer: e.target.value })
                }
              />
              <Input
                placeholder="Product"
                value={formOrder.product}
                onChange={(e) =>
                  setFormOrder({ ...formOrder, product: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Amount (number only)"
                value={formOrder.amount.replace("$", "")}
                onChange={(e) =>
                  setFormOrder({ ...formOrder, amount: e.target.value })
                }
              />
              <Select
                value={formOrder.status}
                onValueChange={(val) =>
                  setFormOrder({ ...formOrder, status: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                placeholder="Date"
                value={formOrder.date}
                onChange={(e) =>
                  setFormOrder({ ...formOrder, date: e.target.value })
                }
              />
            </div>

            <DialogFooter>
              <Button
                onClick={() =>
                  mode === "add" ? handleAddOrder() : handleEditOrder()
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
          placeholder="Search orders..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3"
        />
        <Select
          onValueChange={(val) => {
            setStatus(val);
            setPage(1);
          }}
          defaultValue="all"
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{order.customer}</td>
                  <td className="py-3 px-6">{order.product}</td>
                  <td className="py-3 px-6">{order.amount}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">{order.date}</td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMode("edit");
                        setFormOrder(order);
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
                          onClick={() => setDeleteTarget(order)}
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete order for{" "}
                            <span className="font-bold">
                              {deleteTarget?.customer}
                            </span>
                            ?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteOrder}
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
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card (mobile) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <div>
              <h3 className="font-semibold text-gray-800">
                {order.customer}
              </h3>
              <p className="text-sm text-gray-500">{order.product}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{order.amount}</span>
              <span>{order.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMode("edit");
                    setFormOrder(order);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteTarget(order)}
                >
                  Delete
                </Button>
              </div>
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
