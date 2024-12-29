"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({
  targetDate = "2025-07-04",
}: {
  targetDate?: string;
}) {
  const t = useTranslations();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="text-6xl">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="flex gap-10">
          <div className="text-center">
            <div className="font-bold">{formatNumber(timeLeft.days)}</div>
            <div className="text-base uppercase font-bold"> {t("DAYS")}</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{formatNumber(timeLeft.hours)}</div>
            <div className="text-base uppercase font-bold"> {t("HOURS")}</div>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="text-center">
            <div className="font-bold">{formatNumber(timeLeft.minutes)}</div>
            <div className="text-base uppercase font-bold"> {t("MINUTES")}</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{formatNumber(timeLeft.seconds)}</div>
            <div className="text-base uppercase font-bold"> {t("SECONDS")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
