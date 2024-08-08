"use client";

import { useRouter } from "next/navigation";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/global/Table";
import TableDashboard from "../TableDashboard";
import toRupiah from "@/lib/toRupiah";
import { Button } from "@/components/global/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/global/Popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/global/Dialog";
import DashboardInput from "../DashboardInput";
import { InputGroup } from "@/components/global/InputGroup";
import { Label } from "@/components/global/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/global/Select";
import useAuthStore from "@/store/authStore";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/app/loading";
import DashboardPagination from "../DashboardPagination";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/useToast";
import AddBike from "./AddBike";

export default function BikeTable({ page }) {
  const router = useRouter();
  const { toast } = useToast();

  const token = useAuthStore((state) => state.token);
  const {
    data: bikes,
    isFetching,
    pagination,
  } = useFetch(
    `/api/bikes/?${new URLSearchParams({ limit: 7, page: +page || 1 }).toString()}`,
  );
  const { data: categories } = useFetch("/api/categories/");

  if (page > pagination.total_pages) router.push("/dashboard/bike?page=1");

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/bikes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Bike Deleted",
        description: "Bike has been deleted successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error while deleting bike",
        description: "Some error occurred while deleting bike",
        variant: "destructive",
      });
    }
    router.refresh();
  };

  return (
    <TableDashboard
      title={"Bike Management"}
      pagination={<DashboardPagination pagination={pagination} />}
      addModal={<AddBike categories={categories} />}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Brand</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching ? (
          <TableRow>
            <TableCell colSpan={5}>
              <Loading className="h-[45vh]" />
            </TableCell>
          </TableRow>
        ) : (
          bikes?.map((bike) => (
            <TableRow key={bike.id}>
              <TableCell className="font-medium">{bike.brand}</TableCell>
              <TableCell>{bike.name}</TableCell>
              <TableCell>{toRupiah(bike.price)}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <i aria-hidden className="fa-solid fa-list-ul" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-28 p-0">
                    <div className="grid divide-y divide-accent">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start space-x-2 rounded-none"
                          >
                            <i aria-hidden className="fa-solid fa-pencil" />
                            <p>Edit</p>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[825px]">
                          <DialogHeader>
                            <DialogTitle>Edit Bike {bike.name}</DialogTitle>
                          </DialogHeader>
                          <form className="mt-2 grid gap-4 lg:grid-cols-2">
                            <InputGroup>
                              <Label htmlFor="brand">Brand</Label>
                              <DashboardInput
                                id="brand"
                                type="text"
                                placeholder="Brand"
                                defaultValue={bike.brand}
                                name="brand"
                              />
                            </InputGroup>
                            <InputGroup>
                              <Label htmlFor="name">Name</Label>
                              <DashboardInput
                                id="name"
                                type="text"
                                placeholder="Name"
                                defaultValue={bike.name}
                                name="name"
                              />
                            </InputGroup>
                            <InputGroup>
                              <Label htmlFor="price">Price</Label>
                              <DashboardInput
                                id="price"
                                type="number"
                                placeholder="price"
                                defaultValue={bike.price}
                                name="price"
                              />
                            </InputGroup>
                            <InputGroup>
                              <Label htmlFor="stock">Stock</Label>
                              <DashboardInput
                                id="stock"
                                type="number"
                                placeholder="stock"
                                defaultValue={bike.stock}
                                name="stock"
                              />
                            </InputGroup>
                            <InputGroup>
                              <Label htmlFor="category">Category</Label>
                              <Select
                                defaultValue={bike.category_id.toString()}
                                onValueChange={(value) => +value}
                                name="category"
                                id="category"
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories?.map((category) => (
                                      <SelectItem
                                        key={category.ID}
                                        value={category.ID.toString()}
                                      >
                                        {category.Name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </InputGroup>
                            <InputGroup>
                              <Label htmlFor="year">Year</Label>
                              <DashboardInput
                                id="year"
                                type="number"
                                placeholder="year"
                                defaultValue={bike.year}
                                name="year"
                              />
                            </InputGroup>
                            <InputGroup className={"lg:col-span-2"}>
                              <Label htmlFor="image_url">Image</Label>
                              <DashboardInput
                                id="image_url"
                                type="file"
                                placeholder="image_url"
                                name="image_url"
                              />
                            </InputGroup>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start space-x-2 rounded-none"
                          >
                            <i aria-hidden className="fa-solid fa-trash" />
                            <p>Delete</p>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>
                              Are you sure to delete {bike.name}?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            This action cannot be undone.
                          </DialogDescription>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleDelete(bike.id);
                            }}
                            className="mt-2 flex justify-end"
                          >
                            <Button type="submit" variant="destructive">
                              Delete
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableDashboard>
  );
}
