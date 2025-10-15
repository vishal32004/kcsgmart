// "use client";

// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { MapPin, Loader2 } from "lucide-react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { fetchUserDetails, updateUserProfile } from "@/helpers/apiActions";
// import { UpdateProfilePayload } from "@/types/Auth";
// import { useEffect } from "react";

// const schema = z.object({
//   Address: z.string().optional(),
//   City: z.string().optional(),
//   State: z.string().optional(),
//   Country: z.string().optional(),
//   PinCode: z.string().optional(),
//   Landmark: z.string().optional(),
//   Shipping_Address: z.string().optional(),
//   Shipping_City: z.string().optional(),
//   Shipping_State: z.string().optional(),
//   Shipping_Country: z.string().optional(),
//   Shipping_PinCode: z.string().optional(),
//   Shipping_Landmark: z.string().optional(),
// });

// type FormData = z.infer<typeof schema>;

// export default function AddressesTab({ userEmail }: { userEmail: string | undefined }) {
//   const queryClient = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ["userDetails", userEmail],
//     queryFn: () => fetchUserDetails(userEmail),
//     enabled: !!userEmail,
//   });

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isDirty }
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   useEffect(() => {
//     if (data?.Registerdata) {
//       reset({
//         Address: data.Registerdata.Address || "",
//         City: data.Registerdata.City || "",
//         State: data.Registerdata.State || "",
//         Country: data.Registerdata.Country || "",
//         PinCode: data.Registerdata.PinCode || "",
//         Landmark: data.Registerdata.Landmark || "",
//         Shipping_Address: data.Registerdata.Shipping_Address || "",
//         Shipping_City: data.Registerdata.Shipping_City || "",
//         Shipping_State: data.Registerdata.Shipping_State || "",
//         Shipping_Country: data.Registerdata.Shipping_Country || "",
//         Shipping_PinCode: data.Registerdata.Shipping_PinCode || "",
//         Shipping_Landmark: data.Registerdata.Shipping_Landmark || "",
//       });
//     }
//   }, [data, reset]);

//   const mutation = useMutation({
//     mutationFn: (payload: UpdateProfilePayload) => updateUserProfile(payload),
//     onSuccess: () => {
//       toast.success("Address updated");
//       queryClient.invalidateQueries({ queryKey: ["userDetails", userEmail] });
//     },
//     onError: () => toast.error("Failed to update address"),
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
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <MapPin className="h-5 w-5" />
//             Address Information
//           </CardTitle>
//           <CardDescription>Billing and shipping details</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Billing Section */}
//           <div>
//             <h3 className="font-medium mb-2">Billing Address</h3>
//             <div className="grid md:grid-cols-2 gap-4">
//               <InputField label="Address" id="Address" register={register} errors={errors} />
//               <InputField label="Landmark" id="Landmark" register={register} />
//             </div>
//             <div className="grid md:grid-cols-3 gap-4">
//               <InputField label="City" id="City" register={register} errors={errors} />
//               <InputField label="State" id="State" register={register} errors={errors} />
//               <InputField label="Pin Code" id="PinCode" register={register} errors={errors} />
//             </div>
//             <InputField label="Country" id="Country" register={register} errors={errors} />
//           </div>

//           {/* Shipping Section */}
//           <div>
//             <h3 className="font-medium mb-2">Shipping Address</h3>
//             <div className="grid md:grid-cols-2 gap-4">
//               <InputField label="Address" id="Shipping_Address" register={register} />
//               <InputField label="Landmark" id="Shipping_Landmark" register={register} />
//             </div>
//             <div className="grid md:grid-cols-3 gap-4">
//               <InputField label="City" id="Shipping_City" register={register} />
//               <InputField label="State" id="Shipping_State" register={register} />
//               <InputField label="Pin Code" id="Shipping_PinCode" register={register} />
//             </div>
//             <InputField label="Country" id="Shipping_Country" register={register} />
//           </div>

//           <div className="flex justify-end">
//             <Button type="submit" disabled={!isDirty || mutation.isPending}>
//               {mutation.isPending ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </form>
//   );
// }

// function InputField({
//   label,
//   id,
//   register,
//   errors = {},
// }: {
//   label: string;
//   id: keyof FormData;
//   register: ReturnType<typeof useForm>["register"];
//   errors?: Partial<Record<keyof FormData, any>>;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={id}>{label}</Label>
//       <Input id={id} {...register(id)} />
//       {errors && errors[id] && (
//         <p className="text-sm text-red-500">{errors[id]?.message}</p>
//       )}
//     </div>
//   );
// }
