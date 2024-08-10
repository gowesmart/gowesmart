"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/global/Dialog";
import { Button } from "@/components/global/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/global/Table";
import toRupiah from "@/lib/toRupiah";
import { formatDate } from "@/lib/date";

export default function DetailTransaction({ transaction }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start space-x-2 rounded-none"
        >
          <i aria-hidden className="fa-solid fa-circle-info" />
          <p>Detail</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Detail transaction {transaction.id}</DialogTitle>
        </DialogHeader>
        <DialogDescription>This is the transaction details.</DialogDescription>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead className="w-[200px]">Bike</TableHead>
              <TableHead className="w-[300px]">Quantity</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction.orders.map((order, id) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{++id}</TableCell>
                <TableCell>{order?.bike?.name}</TableCell>
                <TableCell>{order?.quantity}</TableCell>
                <TableCell>{toRupiah(order?.total_price)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter className={"mr-auto"}>
          {formatDate(transaction.upodated_at)}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
