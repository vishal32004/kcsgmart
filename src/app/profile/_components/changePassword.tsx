import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { changePassword } from "@/helpers/apiActions"; // adjust as needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner"; // or your toast lib
import { useMutation } from "@tanstack/react-query";

const formSchema = z
  .object({
    email: z.string().email(),
    old_password: z.string().min(8),
    new_password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

interface userEmailProps {
  userEmail: string | undefined;
}

export default function ChangePasswordForm({ userEmail }: userEmailProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userEmail,
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const mutation = useMutation({
  mutationFn: changePassword,
  onSuccess: (res) => {
    if (res?.success) {
      toast.success(res.message || "Password updated successfully");
      form.reset();
    } else {
      toast.error(res?.message || "Failed to update password");
    }
  },
  onError: (error: any) => {
    console.error("Change password failed:", error);
    toast.error("Something went wrong. Please try again.");
  },
});

const onSubmit = (values: z.infer<typeof formSchema>) => {
  const { confirm_password, ...payload } = values;
  mutation.mutate(payload);
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              {...register("old_password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.old_password && <p className="text-red-500 text-sm">{errors.old_password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("new_password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirm_password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
        </div>

        <div className="text-sm text-muted-foreground">
          Password must be at least 8 characters and include upper/lowercase, numbers, and symbols.
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
    </form>
  );
}
