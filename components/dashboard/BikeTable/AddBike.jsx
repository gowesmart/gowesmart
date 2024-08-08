"use client";
import { Button } from "@/components/global/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/global/Dialog";
import { InputGroup } from "@/components/global/InputGroup";
import { Label } from "@/components/global/Label";
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
import { Controller, useForm } from "react-hook-form";
import { bikeCreateSchema } from "@/validation/bike";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/global/Spinner";
import { useState } from "react";
import { uploadImage, deleteImage } from "@/utils/firebase/uploadImage";

export default function AddBike({ categories }) {
  const [imageUrl, setImageUrl] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(bikeCreateSchema),
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image_url[0]; 
      const imageName = `${Date.now()}-${imageFile.name}`;
      
      await uploadImage(imageFile, imageName);
      data.image_url = imageName; 
      console.log("Bike Data:", data);
      throw new Error()
    } catch (error) {
      if (imageUrl) {
        await deleteImage(imageUrl); 
      }
      console.error("Failed to upload image or submit bike data:", error);
      setError("image_url", { message: "Failed to upload image" });
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
