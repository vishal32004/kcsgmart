"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void
}

export default function BookingCalendar({ onDateSelect }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get the current year and month
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)

  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Create an array of day numbers for the current month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Create an array for the calendar grid, including empty cells for days from the previous month
  const calendarGrid = Array(adjustedFirstDay).fill(null).concat(days)

  // Get the month name and year for the header
  const monthName = currentDate.toLocaleString("default", { month: "long" })

  // Function to go to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Function to go to the next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Function to check if a date is a weekend (Saturday or Sunday)
  const isWeekend = (dayOfMonth: number) => {
    if (!dayOfMonth) return false
    const date = new Date(currentYear, currentMonth, dayOfMonth)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6 // 0 is Sunday, 6 is Saturday
  }

  // Function to check if a date is in the past
  const isPastDate = (dayOfMonth: number) => {
    if (!dayOfMonth) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(currentYear, currentMonth, dayOfMonth)
    return date < today
  }

  // Function to handle date selection
  const handleDateClick = (dayOfMonth: number) => {
    if (!dayOfMonth || isWeekend(dayOfMonth) || isPastDate(dayOfMonth)) return
    const selectedDate = new Date(currentYear, currentMonth, dayOfMonth)
    onDateSelect(selectedDate)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Select a Date & Time</h2>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={goToPreviousMonth} aria-label="Previous month">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h3 className="text-lg font-medium">
          {monthName} {currentYear}
        </h3>

        <Button variant="outline" size="icon" onClick={goToNextMonth} aria-label="Next month">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className="text-center py-2 text-sm font-medium">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarGrid.map((day, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square flex items-center justify-center rounded-full text-sm",
              day && !isWeekend(day) && !isPastDate(day)
                ? "cursor-pointer hover:bg-blue-100 transition-colors"
                : "opacity-50",
              day && isWeekend(day) ? "text-gray-400" : "",
              day && isPastDate(day) ? "text-gray-300" : "",
            )}
            onClick={() => day && handleDateClick(day)}
          >
            {day}
          </div>
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
