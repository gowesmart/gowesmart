"use client";

import { Controller, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/global/Select";
import { Label } from "@/components/global/Label";
import { Button } from "@/components/global/Button";
import { InputGroup } from "@/components/global/InputGroup";
import { bikeCreateSchema } from "@/validation/bike";
import { useToast } from "@/hooks/useToast";
import Spinner from "@/components/global/Spinner";
import uploadImage from "@/utils/firebase/uploadImage";
import deleteImage from "@/utils/firebase/deleteImage";
import getImageURL from "@/utils/firebase/getImageUrl";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/authStore";

export default function AddBike({ categories }) {
  const { toast } = useToast();
  const router = useRouter();

  const token = useAuthStore((state) => state.token);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(bikeCreateSchema),
  });

  const onSubmit = async (data) => {
    const imageName = `${Date.now()}-${data.image_url[0].name}`;
    try {
      await uploadImage(data.image_url[0], imageName);
      data.image_url = await getImageURL(imageName);
      await axiosInstance.post("/api/bikes", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Success", description: "Bike created successfully" });
      router.refresh();
    } catch (error) {
      await deleteImage(imageName);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed create bike",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-3">
          <i aria-hidden className="fa-solid fa-plus" />
          <p>Add bike</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Create Bike</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Input theese fields and then click submit for create a new bike.
        </DialogDescription>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end gap-4"
        >
          <div className="mt-2 grid w-full gap-4 lg:grid-cols-2">
            <InputGroup error={errors.brand?.message}>
              <Label htmlFor="brand">Brand</Label>
              <DashboardInput
                id="brand"
                type="text"
                placeholder="Brand..."
                {...register("brand")}
              />
            </InputGroup>
            <InputGroup error={errors.name?.message}>
              <Label htmlFor="name">Name</Label>
              <DashboardInput
                id="name"
                type="text"
                placeholder="Name..."
                {...register("name")}
              />
            </InputGroup>
            <InputGroup error={errors.price?.message}>
              <Label htmlFor="price">Price</Label>
              <DashboardInput
                id="price"
                type="number"
                placeholder="Price..."
                {...register("price", { valueAsNumber: true })}
              />
            </InputGroup>
            <InputGroup error={errors.stock?.message}>
              <Label htmlFor="stock">Stock</Label>
              <DashboardInput
                id="stock"
                type="number"
                placeholder="Stock..."
                {...register("stock", { valueAsNumber: true })}
              />
            </InputGroup>
            <InputGroup error={errors.category?.message}>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(+value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
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
                )}
              />
            </InputGroup>
            <InputGroup error={errors.year?.message}>
              <Label htmlFor="year">Year</Label>
              <DashboardInput
                id="year"
                type="number"
                placeholder="Year..."
                {...register("year", { valueAsNumber: true })}
              />
            </InputGroup>
            <InputGroup error={errors.description?.message}>
              <Label htmlFor="description">Description</Label>
              <DashboardInput
                id="description"
                type="text"
                placeholder="Description..."
                {...register("description")}
              />
            </InputGroup>
            <InputGroup error={errors.image_url?.message}>
              <Label htmlFor="image_url">Image</Label>
              <DashboardInput
                id="image_url"
                type="file"
                placeholder="Image URL"
                {...register("image_url")}
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
