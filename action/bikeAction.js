"use server";

import fetchInstance from "@/lib/fetch";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBike(formData) {
  try {
    const id = formData.get("id");
    const token = formData.get("token");

    console.log(id, token);

    await fetchInstance(`/api/bikes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
  }
  revalidateTag("bikes");
  redirect("/dashboard/bike?status=success");
}
