// "use client";
//
// import { Controller, useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
//
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/global/Dialog";
// import { Button } from "@/components/global/Button";
// import Spinner from "@/components/global/Spinner";
// import useAuthStore from "@/store/authStore";
// import { reviewFetchSchema } from "@/validation/review"; // Assuming there is a Zod schema for fetching reviews
//
// export default function DetailReview({ reviewId, handleUpdate }) {
//   const token = useAuthStore((state) => state.token);
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     mode: "onChange",
//     resolver: zodResolver(reviewFetchSchema),
//   });
//
//   const fetchReview = async () => {
//     try {
//       const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         // Populate form fields with fetched data
//         setValue("title", data.title);
//         setValue("content", data.content);
//       } else {
//         console.error("Failed to fetch review:", data.message);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };
//
//   useEffect(() => {
//     fetchReview();
//   }, [reviewId]);
//
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="ghost" className="w-full justify-start space-x-2 rounded-none">
//           <i aria-hidden className="fa-solid fa-circle-info" />
//           <p>Review Details</p>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Review Details</DialogTitle>
//         </DialogHeader>
//         <DialogDescription>
//           You can view and update the review details here. Click "Edit" to save changes or click outside to cancel.
//         </DialogDescription>
//         <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col items-end gap-4">
//           <div className="mt-2 grid w-full gap-4">
//             <input id="id" type="hidden" value={reviewId} {...register("id")} />
//             <div>
//               <Label htmlFor="title">Title</Label>
//               <input
//                 id="title"
//                 type="text"
//                 {...register("title")}
//                 className={`input ${errors.title ? 'input-error' : ''}`}
//                 placeholder="Title"
//               />
//               {errors.title && <p className="text-error">{errors.title.message}</p>}
//             </div>
//             <div>
//               <Label htmlFor="content">Content</Label>
//               <textarea
//                 id="content"
//                 {...register("content")}
//                 className={`textarea ${errors.content ? 'textarea-error' : ''}`}
//                 placeholder="Content"
//               />
//               {errors.content && <p className="text-error">{errors.content.message}</p>}
//             </div>
//           </div>
//           <Button disabled={isSubmitting} type="submit" className="w-fit">
//             <Spinner show={isSubmitting} />
//             Edit
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useFetch } from "@/hooks/useFetch"; // Custom hook for data fetching
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/global/Dialog";
import { Button } from "@/components/global/Button";
import Spinner from "@/components/global/Spinner";

export default function DetailReview({ reviewID }) {
  const { data: review, isFetching } = useFetch(`/api/reviews/${reviewID}`);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="space-x-2 rounded-none">
          <i aria-hidden className="fa-solid fa-circle-info" />
          <p>Review Details</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>
        {isFetching ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <div className="mt-2 grid gap-4">
            <p><strong>Comment:</strong> {review?.comment || "N/A"}</p>
            <p><strong>Rating:</strong> {review?.rating || "N/A"}</p>
            <p><strong>User:</strong> {review?.user?.username || "N/A"}</p> {/* Display username */}
            <p><strong>Bike ID:</strong> {review?.bike_id || "N/A"}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

