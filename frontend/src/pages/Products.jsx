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
const initialProducts = [
  {
    id: 1,
    name: "Nike Air Max",
    category: "Shoes",
    price: "$120",
    stock: 50,
    status: "Active",
    image: "https://via.placeholder.com/60",
  },
  {
    id: 2,
    name: "Adidas Hoodie",
    category: "Apparel",
    price: "$75",
    stock: 30,
    status: "Active",
    image: "https://via.placeholder.com/60",
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Form state
  const [formProduct, setFormProduct] = useState({
    id: null,
    name: "",
    category: "Shoes",
    price: "",
    stock: "",
    status: "Active",
    image: "",
  });

  const [mode, setMode] = useState("add"); // add/edit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // kontrol modal

  const { toast } = useToast();

  // Filter produk
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Reset form
  const resetForm = () => {
    setFormProduct({
      id: null,
      name: "",
      category: "Shoes",
      price: "",
      stock: "",
      status: "Active",
      image: "",
    });
  };

  // Tambah produk
  const handleAddProduct = () => {
    const newId = products.length + 1;
    const productToAdd = {
      ...formProduct,
      id: newId,
      price: `$${formProduct.price}`,
      stock: Number(formProduct.stock),
    };
    setProducts([...products, productToAdd]);
    resetForm();
    setIsDialogOpen(false);

    toast({
      title: "✅ Product added",
      description: `${productToAdd.name} has been added successfully.`,
    });
  };

  // Edit produk
  const handleEditProduct = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === formProduct.id
          ? {
              ...formProduct,
              price: formProduct.price.startsWith("$")
                ? formProduct.price
                : `$${formProduct.price}`,
              stock: Number(formProduct.stock),
            }
          : p
      )
    );
    resetForm();
    setIsDialogOpen(false);

    toast({
      title: "✏️ Product updated",
      description: `${formProduct.name} has been updated successfully.`,
    });
  };

  // Delete produk
  const handleDeleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast({
      title: "🗑️ Product deleted",
      description: `${deleteTarget.name} has been removed.`,
      variant: "destructive",
    });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 bg-gray-50 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        {/* Modal Add/Edit Product */}
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
              + Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Add New Product" : "Edit Product"}
              </DialogTitle>
            </DialogHeader>

            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Product Name"
                value={formProduct.name}
                onChange={(e) =>
                  setFormProduct({ ...formProduct, name: e.target.value })
                }
              />
              <Select
                value={formProduct.category}
                onValueChange={(val) =>
                  setFormProduct({ ...formProduct, category: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Price (number only)"
                value={formProduct.price.replace("$", "")}
                onChange={(e) =>
                  setFormProduct({ ...formProduct, price: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Stock"
                value={formProduct.stock}
                onChange={(e) =>
                  setFormProduct({ ...formProduct, stock: e.target.value })
                }
              />
              <Select
                value={formProduct.status}
                onValueChange={(val) =>
                  setFormProduct({ ...formProduct, status: val })
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
                placeholder="Image URL"
                value={formProduct.image}
                onChange={(e) =>
                  setFormProduct({ ...formProduct, image: e.target.value })
                }
              />
            </div>

            <DialogFooter>
              <Button
                onClick={() =>
                  mode === "add" ? handleAddProduct() : handleEditProduct()
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
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3"
        />
        <Select
          onValueChange={(val) => {
            setCategory(val);
            setPage(1);
          }}
          defaultValue="all"
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Shoes">Shoes</SelectItem>
            <SelectItem value="Apparel">Apparel</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/60?text=No+Image"
                      }
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="py-3 px-6">{product.name}</td>
                  <td className="py-3 px-6">{product.category}</td>
                  <td className="py-3 px-6">{product.price}</td>
                  <td className="py-3 px-6">{product.stock}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMode("edit");
                        setFormProduct(product);
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
                          onClick={() => setDeleteTarget(product)}
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
                            onClick={handleDeleteProduct}
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
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view (mobile) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  product.image || "https://via.placeholder.com/60?text=No+Image"
                }
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Price: {product.price}</span>
              <span>Stock: {product.stock}</span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  product.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.status}
              </span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMode("edit");
                    setFormProduct(product);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteTarget(product)}
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
