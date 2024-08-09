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
import { Label } from "@/components/global/Label";
import { Button } from "@/components/global/Button";
import { InputGroup } from "@/components/global/InputGroup";
import { useToast } from "@/hooks/useToast";
import { categoryCreateSchema } from "@/validation/category";
import Spinner from "@/components/global/Spinner";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/authStore";

export default function AddCategory() {
  const { toast } = useToast();
  const router = useRouter();

  const token = useAuthStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(categoryCreateSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/api/categories", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Category Created",
        description: "Category has been created successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error while creating a category",
        description: "Some error occurred while creating a category",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-3">
          <i aria-hidden className="fa-solid fa-plus" />
          <p>Add Category</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Input theese fields and then click submit for create a new category.
        </DialogDescription>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end gap-4"
        >
          <div className="mt-2 grid w-full gap-4">
            <InputGroup error={errors.name?.message}>
              <Label htmlFor="name">Name</Label>
              <DashboardInput
                id="name"
                type="text"
                placeholder="Name..."
                {...register("name")}
              />
            </InputGroup>
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-fit">
            <Spinner show={isSubmitting} />
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
