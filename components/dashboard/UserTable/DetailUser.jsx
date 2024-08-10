"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { userUpdateRoleSchema } from "@/validation/user";
import Spinner from "@/components/global/Spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/global/Select";

export default function DetailUser({ user, handleUpdate }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(userUpdateRoleSchema),
  });

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
          <DialogTitle>Edit Role User {user.username}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          You can easily update role by change the value here and click edit
          button, or just click outside for quit.
        </DialogDescription>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col items-end gap-4"
        >
          <div className="mt-2 grid w-full gap-4">
            <DashboardInput
              id="id"
              type="hidden"
              value={user.id}
              {...register("id")}
            />
            <InputGroup error={errors.role?.message}>
              <Label htmlFor="role">Role</Label>
              <Controller
                name="role"
                control={control}
                defaultValue={user.role}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={"Select a role"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="USER">USER</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
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
