"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
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
import { Button } from "@/components/global/Button";
import { InputGroup } from "@/components/global/InputGroup";
import { Label } from "@/components/global/Label";
import { bikeUpdateSchema } from "@/validation/bike";
import { useToast } from "@/hooks/useToast";
import Spinner from "@/components/global/Spinner";
import uploadImage from "@/utils/firebase/uploadImage";
import deleteImage from "@/utils/firebase/deleteImage";
import getImageURL from "@/utils/firebase/getImageUrl";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/authStore";
import Image from "next/image";

export default function DetailBike({ bike, categories }) {
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
    resolver: zodResolver(bikeUpdateSchema),
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
          <DialogTitle>Detail Bike {bike.name}</DialogTitle>
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
                defaultValue={bike.brand}
                {...register("brand")}
              />
            </InputGroup>
            <InputGroup error={errors.name?.message}>
              <Label htmlFor="name">Name</Label>
              <DashboardInput
                id="name"
                type="text"
                placeholder="Name..."
                defaultValue={bike.name}
                {...register("name")}
              />
            </InputGroup>
            <InputGroup error={errors.price?.message}>
              <Label htmlFor="price">Price</Label>
              <DashboardInput
                id="price"
                type="number"
                placeholder="Price..."
                defaultValue={+bike.price}
                {...register("price", { valueAsNumber: true })}
              />
            </InputGroup>
            <InputGroup error={errors.stock?.message}>
              <Label htmlFor="stock">Stock</Label>
              <DashboardInput
                id="stock"
                type="number"
                placeholder="Stock..."
                defaultValue={+bike.stock}
                {...register("stock", { valueAsNumber: true })}
              />
            </InputGroup>
            <InputGroup error={errors.category?.message}>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={bike.category_id.toString()}
                    onValueChange={(value) => field.onChange(+value)}
                  >
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
                defaultValue={+bike.year}
                {...register("year", { valueAsNumber: true })}
              />
            </InputGroup>
            <InputGroup error={errors.description?.message}>
              <Label htmlFor="description">Description</Label>
              <DashboardInput
                id="description"
                type="text"
                placeholder="Description..."
                defaultValue={bike.description}
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
            {bike.image_url && (
              <Image
                draggable={false}
                src={bike.image_url}
                width={600}
                height={400}
                className="col-span-2 mt-2 h-[400px] w-full rounded-md object-cover object-center"
              />
            )}
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
