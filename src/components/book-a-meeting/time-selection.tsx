"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TimeSelectionProps {
  selectedDate: Date
  onTimeSelect: (time: string) => void
  onBack: () => void
}

export default function TimeSelection({ selectedDate, onTimeSelect, onBack }: TimeSelectionProps) {
  // Available time slots
  const timeSlots = [
    "9:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "1:30pm",
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
  ]

  // Format the selected date
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8" aria-label="Go back">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Select a Date & Time</h2>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{formattedDate}</h3>
      </div>

      <div className="grid gap-2 max-h-[400px] overflow-y-auto pr-2">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant="outline"
            className="justify-center text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-200"
            onClick={() => onTimeSelect(time)}
          >
            {time}
          </Button>
        ))}
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <div className="flex items-center justify-center gap-2">
          <span>Time zone</span>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-globe mr-1"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" x2="22" y1="12" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>India Standard Time (12:58pm)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
