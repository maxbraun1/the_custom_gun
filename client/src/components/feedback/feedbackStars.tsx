"use client";

import FeedbackStar from "./feedbackStar";

export default function FeedbackStars({ score }: { score: number }) {
  return (
    <div className="flex gap-1">
      <FeedbackStar size={15} active={score - 1 >= 0} />
      <FeedbackStar size={15} active={score - 2 >= 0} />
      <FeedbackStar size={15} active={score - 3 >= 0} />
      <FeedbackStar size={15} active={score - 4 >= 0} />
      <FeedbackStar size={15} active={score - 5 >= 0} />
    </div>
  );
}
