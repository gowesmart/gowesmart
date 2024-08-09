"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/global/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/global/Dialog";
import { useToast } from "@/hooks/useToast";
import useAuthStore from "@/store/authStore";
import axiosInstance from "@/lib/axios";

export default function DeleteCategory({ category }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Category Deleted",
        description: "Category has been deleted successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error while deleting a category",
        description: "Some error occurred while deleting a category",
        variant: "destructive",
      });
    }
  };

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
