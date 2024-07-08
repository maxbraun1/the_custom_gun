"use client";
import { calcTimeLeft } from "@/lib/util/timeLeft.js";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function secondsToMinSec(seconds: number) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return { mins, secs };
}

function countDown(seconds: number) {
  let timeLeftMinSec = secondsToMinSec(seconds);
  let timeLeft =
    timeLeftMinSec.mins + " Minutes " + timeLeftMinSec.secs + " Seconds";
  return timeLeft;
}

export default function TimeLeft({
  end_date,
  className,
}: {
  end_date: Date;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const [countDownSeconds, setCountDownSeconds] = useState(-1);

  useEffect(() => {
    const timeLeftCheck = calcTimeLeft(end_date);

    if (typeof timeLeftCheck === "object") {
      setCountDownSeconds(timeLeftCheck.seconds);

      let interval = setInterval(() => {
        setCountDownSeconds((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeLeft(timeLeftCheck);
    }
  }, []);

  useEffect(() => {
    if (countDownSeconds > 0) {
      setTimeLeft(countDown(countDownSeconds));
    } else if (countDownSeconds == 0) {
      window.location.reload();
    }
  }, [countDownSeconds]);

  return <span className={cn("", className)}>{timeLeft}</span>;
}
