"use client";
import { Button } from "@/components/global/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/global/Dialog";

export default function DeleteCategory({ category, handleDelete }) {
  return (
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
          <DialogTitle>Are you sure to delete {category.name}?</DialogTitle>
        </DialogHeader>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete(category.ID);
          }}
          className="mt-2 flex justify-end"
        >
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
