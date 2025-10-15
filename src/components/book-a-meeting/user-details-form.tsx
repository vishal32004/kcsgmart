"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookingData } from "./book-meeting"

interface UserDetailsFormProps {
  onSubmit: (details: Omit<BookingData, "date" | "time">) => void
  onBack: () => void
}

export default function UserDetailsForm({ onSubmit, onBack }: UserDetailsFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [guests, setGuests] = useState<string[]>([])
  const [newGuest, setNewGuest] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Add a guest email
  const addGuest = () => {
    if (!newGuest) return

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newGuest)) {
      setErrors({ ...errors, newGuest: "Please enter a valid email address" })
      return
    }

    // Check if we've reached the maximum of 10 guests
    if (guests.length >= 10) {
      setErrors({ ...errors, newGuest: "Maximum of 10 guests allowed" })
      return
    }

    // Check if the email is already in the list
    if (guests.includes(newGuest)) {
      setErrors({ ...errors, newGuest: "This email is already added" })
      return
    }

    setGuests([...guests, newGuest])
    setNewGuest("")
    setErrors({ ...errors, newGuest: "" })
  }

  // Remove a guest email
  const removeGuest = (index: number) => {
    const updatedGuests = [...guests]
    updatedGuests.splice(index, 1)
    setGuests(updatedGuests)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    setErrors(newErrors)

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        name,
        email,
        guests,
        notes,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8" aria-label="Go back">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Enter Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests" className="text-sm font-medium">
            Guests ({guests.length}/10)
          </Label>
          <div className="flex gap-2">
            <Input
              id="guests"
              value={newGuest}
              onChange={(e) => setNewGuest(e.target.value)}
              placeholder="guest@example.com"
            />
            <Button type="button" onClick={addGuest} variant="outline" className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          {errors.newGuest && <p className="text-sm text-red-500">{errors.newGuest}</p>}

          {guests.length > 0 && (
            <div className="mt-2 space-y-2">
              {guests.map((guest, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm truncate">{guest}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGuest(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">
            Please share anything that will help prepare for our meeting.
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any specific requirements or questions..."
            rows={4}
          />
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full">
            Schedule Meeting
          </Button>
        </div>
      </form>
    </div>
  )
}
