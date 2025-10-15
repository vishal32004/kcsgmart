"use client";

import { Building, Loader2, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchUserDetails, updateUserProfile } from "@/helpers/apiActions";
import { UpdateProfilePayload, RegisterData, UserData } from "@/types/Auth";
import { useEffect } from "react";

const combinedSchema = z.object({
  // Personal Info
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  
  // Address fields
  Address: z.string().min(1, "Address is required").optional(),
  City: z.string().min(1, "City is required").optional(),
  State: z.string().min(1, "State is required").optional(),
  Country: z.string().min(1, "Country is required").optional(),
  PinCode: z.string().min(1, "Pincode is required").optional(),
  Landmark: z.string().optional(),
  Shipping_Address: z.string().min(1, "Address is required").optional(),
  Shipping_City: z.string().min(1, "City is required").optional(),
  Shipping_State: z.string().min(1, "State is required").optional(),
  Shipping_Country: z.string().min(1, "Country is required").optional(),
  Shipping_PinCode: z.string().min(1, "Pincode is required").optional(),
  Shipping_Landmark: z.string().optional(),
  
  // Company fields
  company_name: z.string().optional(),
  gst_no: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST format").optional().or(z.literal("")),
  pan_no: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional().or(z.literal("")),
});

type CombinedFormData = z.infer<typeof combinedSchema>;

export default function CombinedProfileForm({ userEmail }: { userEmail: string | undefined }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["userDetails", userEmail],
    queryFn: () => fetchUserDetails(userEmail),
    enabled: !!userEmail,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch
  } = useForm<CombinedFormData>({
    resolver: zodResolver(combinedSchema),
  });

  useEffect(() => {
    if (data?.Registerdata && data?.Userdata) {
      reset({
        // Personal Info
        first_name: data.Userdata.first_name || "",
        last_name: data.Userdata.last_name || "",
        
        // Address fields
        Address: data.Registerdata.Address || "",
        City: data.Registerdata.City || "",
        State: data.Registerdata.State || "",
        Country: data.Registerdata.Country || "",
        PinCode: data.Registerdata.PinCode || "",
        Landmark: data.Registerdata.Landmark || "",
        Shipping_Address: data.Registerdata.Shipping_Address || "",
        Shipping_City: data.Registerdata.Shipping_City || "",
        Shipping_State: data.Registerdata.Shipping_State || "",
        Shipping_Country: data.Registerdata.Shipping_Country || "",
        Shipping_PinCode: data.Registerdata.Shipping_PinCode || "",
        Shipping_Landmark: data.Registerdata.Shipping_Landmark || "",
        
        // Company fields
        company_name: data.Registerdata.company_name || "",
        gst_no: data.Registerdata.gst_no || "",
        pan_no: data.Registerdata.pan_no || "",
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateUserProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userDetails", userEmail] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const onSubmit = (formData: CombinedFormData) => {
    if (!userEmail || !isDirty) return;
    
    // Get current data from API
    const currentRegisterData = data?.Registerdata || {} as RegisterData;
    const currentUserData = data?.Userdata || {} as UserData;

    // Prepare complete payload with ALL fields
    const payload: UpdateProfilePayload = {
      email: userEmail,
      
      // Personal Info (always include)
      first_name: formData.first_name,
      last_name: formData.last_name,
      
      // Address fields (include all)
      Address: formData.Address || currentRegisterData.Address || null,
      City: formData.City || currentRegisterData.City || null,
      State: formData.State || currentRegisterData.State || null,
      Country: formData.Country || currentRegisterData.Country || null,
      PinCode: formData.PinCode || currentRegisterData.PinCode || null,
      Landmark: formData.Landmark || currentRegisterData.Landmark || null,
      Shipping_Address: formData.Shipping_Address || currentRegisterData.Shipping_Address || null,
      Shipping_City: formData.Shipping_City || currentRegisterData.Shipping_City || null,
      Shipping_State: formData.Shipping_State || currentRegisterData.Shipping_State || null,
      Shipping_Country: formData.Shipping_Country || currentRegisterData.Shipping_Country || null,
      Shipping_PinCode: formData.Shipping_PinCode || currentRegisterData.Shipping_PinCode || null,
      Shipping_Landmark: formData.Shipping_Landmark || currentRegisterData.Shipping_Landmark || null,
      
      // Company fields (include all)
      company_name: formData.company_name || currentRegisterData.company_name || null,
      gst_no: formData.gst_no || currentRegisterData.gst_no || null,
      pan_no: formData.pan_no || currentRegisterData.pan_no || null,
    };

    mutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <InputField 
            label="First Name" 
            id="first_name" 
            register={register} 
            errors={errors}
            required
          />
          <InputField 
            label="Last Name" 
            id="last_name" 
            register={register} 
            errors={errors}
            required
          />
        </CardContent>
      </Card>

      {/* Address Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Billing Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <InputField label="Address" id="Address" register={register} errors={errors} required />
              <InputField label="Landmark" id="Landmark" register={register} />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <InputField label="City" id="City" register={register} errors={errors} required />
              <InputField label="State" id="State" register={register} errors={errors} required />
              <InputField label="Pin Code" id="PinCode" register={register} errors={errors} required />
            </div>
            <InputField label="Country" id="Country" register={register} errors={errors} required />
          </div>

          <div>
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <InputField label="Address" id="Shipping_Address" register={register} errors={errors} />
              <InputField label="Landmark" id="Shipping_Landmark" register={register} />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <InputField label="City" id="Shipping_City" register={register} errors={errors} />
              <InputField label="State" id="Shipping_State" register={register} errors={errors} />
              <InputField label="Pin Code" id="Shipping_PinCode" register={register} errors={errors} />
            </div>
            <InputField label="Country" id="Shipping_Country" register={register} errors={errors} />
          </div>
        </CardContent>
      </Card>

      {/* Company Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputField label="Company Name" id="company_name" register={register} />
          <div className="grid md:grid-cols-2 gap-4">
            <InputField 
              label="GST No." 
              id="gst_no" 
              register={register} 
              errors={errors}
              description="Format: 22AAAAA0000A1Z5"
            />
            <InputField 
              label="PAN No." 
              id="pan_no" 
              register={register} 
              errors={errors}
              description="Format: AAAAA0000A"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isDirty || mutation.isPending}>
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save All Changes"
          )}
        </Button>
      </div>
    </form>
  );
}

function InputField({
  label,
  id,
  register,
  errors = {},
  required = false,
  description = "",
}: {
  label: string;
  id: keyof CombinedFormData;
  register: any;
  errors?: any;
  required?: boolean;
  description?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input id={id} {...register(id)} />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {errors && errors[id] && (
        <p className="text-sm text-red-500">{errors[id]?.message}</p>
      )}
    </div>
  );
}