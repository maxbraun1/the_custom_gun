"use client";

import { feedback } from "@/lib/types/feedback";
import FeedbackStars from "./feedbackStars";
import Link from "next/link";

export default function FeedbackItem({ feedback }: { feedback: feedback }) {
  return (
    <div className="border rounded w-full p-3">
      <FeedbackStars score={feedback.score} />
      <Link
        className="text-blue-700"
        href={"/users/" + feedback.buyer.username}
      >
        {feedback.buyer.username}
      </Link>
      <span className="text-gray-500 text-xs ml-1">
        {new Date(feedback.date).toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        })}
      </span>
      <p>{feedback.message}</p>
    </div>
  );
}
