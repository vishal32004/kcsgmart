"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, User, Clock, MapPin } from "lucide-react"
import { BookingData } from "./book-meeting"

interface ConfirmationPageProps {
  bookingData: BookingData
}

export default function ConfirmationPage({ bookingData }: ConfirmationPageProps) {
  const { date, time, name } = bookingData

  // Format the date for display
  const formattedDate = date?.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-green-700">You are scheduled</h2>
      <p className="text-gray-600">A calendar invitation has been sent to your email address.</p>

      <Button variant="outline" className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Open Invitation
      </Button>

      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <h3 className="font-semibold text-lg mb-4">Explore Unique Corporate Gifting Solutions</h3>

        <div className="space-y-3 text-left">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="h-5 w-5 text-gray-500" />
            <span>Branded Gifts PROCTER</span>
          </div>

          {/* <div className="flex items-center gap-2 text-gray-700">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>
              {time} -{" "}
              {time !== null && time.startsWith("1")
                ? (Number.parseInt(time) + 0.5).toString() + time.slice(-2)
                : (Number.parseInt(time) + 0.5).toString() + time?.slice(-2)}
              , {formattedDate}
            </span>
          </div> */}
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>
              {time} -{" "}
              {time !== null && time.startsWith("1")
                ? (Number.parseInt(time) + 0.5).toString() + time.slice(-2)
                : time !== null && (Number.parseInt(time) + 0.5).toString() + time.slice(-2)}
              , {formattedDate}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span>India Standard Time</span>
          </div>

          <div className="flex items-start gap-2 text-gray-700">
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
              className="lucide lucide-video text-gray-500 mt-0.5"
            >
              <path d="M22 8.5V15.5C22 16.3 21.3 17 20.5 17H3.5C2.7 17 2 16.3 2 15.5V8.5C2 7.7 2.7 7 3.5 7H20.5C21.3 7 22 7.7 22 8.5Z" />
              <path d="M2 11.5H22" />
            </svg>
            <span>Web conferencing details to follow.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
