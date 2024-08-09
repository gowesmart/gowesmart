"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/global/Dialog";
import DashboardInput from "../DashboardInput";
import { Button } from "@/components/global/Button";
import { InputGroup } from "@/components/global/InputGroup";
import { Label } from "@/components/global/Label";
import { useToast } from "@/hooks/useToast";
import Spinner from "@/components/global/Spinner";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/authStore";
import { categoryUpdateSchema } from "@/validation/category";

export default function DetailCategory({ category }) {
  const { toast } = useToast();
  const router = useRouter();

  const token = useAuthStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(categoryUpdateSchema),
  });

  const handleUpdate = async (data) => {
    try {
      await axiosInstance.patch(`/api/categories/${category.ID}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Category Updated",
        description: "Category has been updated successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error while updating a category",
        description: "Some error occurred while updating a category",
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
          <i aria-hidden className="fa-solid fa-circle-info" />
          <p>Detail</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Category {category.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          You can easily update by change the value here and click edit button,
          or just click outside for quit.
        </DialogDescription>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col items-end gap-4"
        >
          <div className="mt-2 grid w-full gap-4">
            <InputGroup error={errors.name?.message}>
              <Label htmlFor="name">Name</Label>
              <DashboardInput
                id="name"
                type="text"
                placeholder="Name..."
                defaultValue={category.Name}
                {...register("name")}
              />
            </InputGroup>
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-fit">
            <Spinner show={isSubmitting} />
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
