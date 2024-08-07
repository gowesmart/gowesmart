"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import TableDashboard from "../TableDashboard";
import toRupiah from "@/lib/toRupiah";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

export default function BikeTable({ bikes }) {
  return (
    <TableDashboard title={"Bike Management"}>
      <Table>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
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
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <h1>Hello wrold</h1>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableDashboard>
  );
}
