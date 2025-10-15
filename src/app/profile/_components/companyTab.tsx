// "use client";

// import { Building, Loader2 } from "lucide-react";
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { fetchUserDetails, updateUserProfile } from "@/helpers/apiActions";
// import { UpdateProfilePayload } from "@/types/Auth";
// import { useEffect } from "react";

// const schema = z.object({
//   company_name: z.string().optional(),
//   gst_no: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).optional().or(z.literal("")),
//   pan_no: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).optional().or(z.literal("")),
// });

// type FormData = z.infer<typeof schema>;

// export default function CompanyTab({ userEmail }: { userEmail: string | undefined }) {
//   const queryClient = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ["userDetails", userEmail],
//     queryFn: () => fetchUserDetails(userEmail),
//     enabled: !!userEmail,
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isDirty },
//     reset,
//   } = useForm<FormData>({ resolver: zodResolver(schema) });

//   useEffect(() => {
//     if (data?.Registerdata) {
//       const { company_name, gst_no, pan_no } = data.Registerdata;
//       reset({
//         company_name: company_name || "",
//         gst_no: gst_no || "",
//         pan_no: pan_no || "",
//       });
//     }
//   }, [data, reset]);

//   const mutation = useMutation({
//     mutationFn: (payload: UpdateProfilePayload) => updateUserProfile(payload),
//     onSuccess: () => {
//       toast.success("Company info updated");
//       queryClient.invalidateQueries({ queryKey: ["userDetails", userEmail] });
//     },
//     onError: () => toast.error("Failed to update company info"),
//   });

//   const onSubmit = (formData: FormData) => {
//     if (!userEmail || !isDirty) return;
//     mutation.mutate({ email: userEmail, ...formData });
//   };

//   if (isLoading) {
//     return (
//       <div className="p-4 flex items-center justify-center">
//         <Loader2 className="h-5 w-5 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Building className="h-5 w-5" />
//             Company Information
//           </CardTitle>
//           <CardDescription>Update your company billing information</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label htmlFor="company_name">Company Name</Label>
//             <Input id="company_name" {...register("company_name")} />
//           </div>
//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="gst_no">GST No.</Label>
//               <Input id="gst_no" {...register("gst_no")} />
//               {errors.gst_no && <p className="text-sm text-red-500">{errors.gst_no.message}</p>}
//             </div>
//             <div>
//               <Label htmlFor="pan_no">PAN No.</Label>
//               <Input id="pan_no" {...register("pan_no")} />
//               {errors.pan_no && <p className="text-sm text-red-500">{errors.pan_no.message}</p>}
//             </div>
//           </div>
//           <Button type="submit" disabled={!isDirty || mutation.isPending}>
//             {mutation.isPending ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               "Save"
//             )}
//           </Button>
//         </CardContent>
//       </Card>
//     </form>
//   );
// }
