"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";

export default function UpdateUserForm({
  user,
}: {
  user: { name: string; email: string };
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating user info:", { name, email });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="pl-10"
              />
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="pl-10"
              />
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
              />
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-black hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
