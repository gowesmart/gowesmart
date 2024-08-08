"use client";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/global/Dialog";
import DashboardInput from "../DashboardInput";
import { InputGroup } from "@/components/global/InputGroup";
import { Label } from "@/components/global/Label";

export default function BikeTable({ bikes, pagination }) {
  return (
    <TableDashboard title={"Bike Management"} pagination={pagination}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Brand</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bikes?.map((bike) => (
          <TableRow key={bike.id}>
            <TableCell className="font-medium">{bike.brand}</TableCell>
            <TableCell>{bike.name}</TableCell>
            <TableCell>{toRupiah(bike.price)}</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <i className="fa-solid fa-list-ul" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-28 p-0">
                  <div className="grid divide-y">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start space-x-2 rounded-none"
                        >
                          <i className="fa-solid fa-pencil" />
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
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableDashboard>
  );
}
