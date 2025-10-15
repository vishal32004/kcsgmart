"use client";

import { useState } from "react";
import {
  Building2,
  CreditCard,
  Eye,
  EyeOff,
  MapPin,
  Package,
  Settings,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/store";
import ChangePasswordForm from "./_components/changePassword";
import { fetchUserDetails } from "@/helpers/apiActions";
import { useQuery } from "@tanstack/react-query";
import CombinedProfileForm from "./_components/CombinedProfileForm";

export default function Profile() {
  const { user } = useStore();

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, security, and business information
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Orders
          </TabsTrigger>
          {/* <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Addresses
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Company
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <p className="text-gray-800">{user?.first_name}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <p className="text-gray-800">{user?.last_name}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <p className="text-gray-800">{user?.email}</p>
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <p className="text-gray-800">{user?.email}</p>
              </div>
              <CombinedProfileForm userEmail={user?.email} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ChangePasswordForm userEmail={user?.email} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                View your recent purchase history and order status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#ORD-2024-001</TableCell>
                    <TableCell>Jan 15, 2024</TableCell>
                    <TableCell>Office Supplies (12 items)</TableCell>
                    <TableCell>$1,247.50</TableCell>
                    <TableCell>
                      <Badge variant="default">Delivered</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#ORD-2024-002</TableCell>
                    <TableCell>Jan 22, 2024</TableCell>
                    <TableCell>IT Equipment (3 items)</TableCell>
                    <TableCell>$3,899.99</TableCell>
                    <TableCell>
                      <Badge variant="secondary">In Transit</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#ORD-2024-003</TableCell>
                    <TableCell>Feb 5, 2024</TableCell>
                    <TableCell>Furniture (5 items)</TableCell>
                    <TableCell>$2,156.75</TableCell>
                    <TableCell>
                      <Badge variant="outline">Processing</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AddressesTab
                userEmail={user?.email}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Manage your organization&apos;s details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CompanyTab userEmail={user?.email} />
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
