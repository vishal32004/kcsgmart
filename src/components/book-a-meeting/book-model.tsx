// components/BookingModal.tsx
"use client";
import React from "react";
import BookingPage from "./book-meeting";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
        <BookingPage />
      </div>
    </div>
  );
}
