"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import BookingCalendar from "@/components/book-a-meeting/booking-calender"
import TimeSelection from "@/components/book-a-meeting/time-selection"
import UserDetailsForm from "@/components/book-a-meeting/user-details-form"
import ConfirmationPage from "@/components/book-a-meeting/confirmation-page"

// Define the booking steps
type BookingStep = "calendar" | "time" | "details" | "confirmation"

// Define the booking data structure
export type BookingData = {
  date: Date | null
  time: string | null
  name: string
  email: string
  guests: string[]
  notes: string
}

export default function BookingPage() {
  // State for tracking the current step in the booking process
  const [currentStep, setCurrentStep] = useState<BookingStep>("calendar")

  // State for storing booking data across steps
  const [bookingData, setBookingData] = useState<BookingData>({
    date: null,
    time: null,
    name: "",
    email: "",
    guests: [],
    notes: "",
  })

  // Handle date selection and move to time selection
  const handleDateSelect = (date: Date) => {
    setBookingData({ ...bookingData, date })
    setCurrentStep("time")
  }

  // Handle time selection and move to details form
  const handleTimeSelect = (time: string) => {
    setBookingData({ ...bookingData, time })
    setCurrentStep("details")
  }

  // Handle form submission and move to confirmation
  const handleDetailsSubmit = (details: Omit<BookingData, "date" | "time">) => {
    setBookingData({ ...bookingData, ...details })
    setCurrentStep("confirmation")
  }

  // Handle back button navigation
  const handleBack = () => {
    switch (currentStep) {
      case "time":
        setCurrentStep("calendar")
        break
      case "details":
        setCurrentStep("time")
        break
      case "confirmation":
        setCurrentStep("details")
        break
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Branded Gifts PROCTER</h1>
          <h2 className="text-3xl font-bold text-navy-800">Explore Unique Corporate Gifting Solutions</h2>

          <div className="flex items-center gap-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>30 min</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-video"
            >
              <path d="M22 8.5V15.5C22 16.3 21.3 17 20.5 17H3.5C2.7 17 2 16.3 2 15.5V8.5C2 7.7 2.7 7 3.5 7H20.5C21.3 7 22 7.7 22 8.5Z" />
              <path d="M2 11.5H22" />
            </svg>
            <span>Web conferencing details provided upon confirmation&#39;.</span>
          </div>

          {bookingData.date && bookingData.time && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>
                {bookingData.time},{" "}
                {bookingData.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          <p className="text-gray-700 mt-4">
            As experts in festive gifting and swag merchandise kits for new employee on-boarding, we&apos;re thrilled to
            enhance your corporate gifting experiences. Let&apos;s schedule a meeting to explore your requirements and create
            delightful gifting solutions tailored just for you.
          </p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6">
            {currentStep === "calendar" && <BookingCalendar onDateSelect={handleDateSelect} />}

            {currentStep === "time" && (
              <TimeSelection selectedDate={bookingData.date!} onTimeSelect={handleTimeSelect} onBack={handleBack} />
            )}

            {currentStep === "details" && <UserDetailsForm onSubmit={handleDetailsSubmit} onBack={handleBack} />}

            {currentStep === "confirmation" && <ConfirmationPage bookingData={bookingData} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
