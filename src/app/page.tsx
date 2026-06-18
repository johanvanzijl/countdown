"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const DEFAULT_MINUTES = 15;
const VALID_MINUTES = new Set([3, 5, 15, 30]);
const WARNING_THRESHOLD_MS = 2 * 60 * 1000 + 30 * 1000;
const TICK_INTERVAL_MS = 100;

function getMinutesFromSearchParams(searchParams: URLSearchParams) {
  const rawValue = searchParams.get("minutes") ?? searchParams.get("duration");
  const parsedValue = Number(rawValue);

  if (VALID_MINUTES.has(parsedValue)) {
    return parsedValue;
  }

  return DEFAULT_MINUTES;
}

function formatTime(remainingMs: number) {
  const totalSeconds = remainingMs <= 0 ? 0 : Math.ceil(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <TimerLayout
          displayText="00:15:00"
          onClear={() => {}}
          onStartStop={() => {}}
          startStopLabel="Start"
          disableButtons
          timerColor="#000000"
        />
      }>
      <CountdownFromSearchParams />
    </Suspense>
  );
}

function CountdownFromSearchParams() {
  const searchParams = useSearchParams();
  const durationFromUrlMs = getMinutesFromSearchParams(searchParams) * 60 * 1000;

  return <CountdownTimer initialDurationMs={durationFromUrlMs} key={durationFromUrlMs} />;
}

function CountdownTimer({ initialDurationMs }: { initialDurationMs: number }) {
  const [selectedDurationMs] = useState(() => initialDurationMs);
  const [remainingMs, setRemainingMs] = useState(() => initialDurationMs);
  const [isRunning, setIsRunning] = useState(false);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isRunning || endTime === null) {
      return;
    }

    const updateRemainingTime = () => {
      const nextRemainingMs = Math.max(0, endTime - Date.now());

      setRemainingMs(nextRemainingMs);

      if (nextRemainingMs === 0) {
        setIsRunning(false);
        setEndTime(null);
      }
    };

    updateRemainingTime();

    const intervalId = window.setInterval(updateRemainingTime, TICK_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [endTime, isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      const pausedRemainingMs = endTime === null ? remainingMs : Math.max(0, endTime - Date.now());

      setRemainingMs(pausedRemainingMs);
      setIsRunning(false);
      setEndTime(null);
      return;
    }

    if (remainingMs <= 0) {
      return;
    }

    setEndTime(Date.now() + remainingMs);
    setIsRunning(true);
  };

  const handleClear = () => {
    setIsRunning(false);
    setEndTime(null);
    setRemainingMs(selectedDurationMs);
  };

  const timerColor = remainingMs <= WARNING_THRESHOLD_MS ? "#8B0000" : "#000000";

  return (
    <TimerLayout
      displayText={formatTime(remainingMs)}
      onClear={handleClear}
      onStartStop={handleStartStop}
      startStopLabel={isRunning ? "Stop" : "Start"}
      timerColor={timerColor}
    />
  );
}

function TimerLayout({
  displayText,
  onClear,
  onStartStop,
  startStopLabel,
  timerColor,
  disableButtons = false,
}: {
  displayText: string;
  onClear: () => void;
  onStartStop: () => void;
  startStopLabel: string;
  timerColor: string;
  disableButtons?: boolean;
}) {
  return (
    <main className="min-h-screen bg-[#efe7d2] px-4 py-6 text-black sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center gap-6 sm:min-h-[calc(100vh-4rem)] sm:gap-8">
        <section className="rounded-[2rem] border-[6px] border-[#2d241a] bg-[#fbf5e8] px-4 py-8 shadow-[0_10px_0_#2d241a] sm:px-8 sm:py-12">
          <div
            aria-live="polite"
            className="select-none text-center font-mono text-[clamp(3.5rem,15vw,10rem)] leading-none tracking-[0.08em]"
            style={{
              color: timerColor,
              fontVariantNumeric: "tabular-nums",
            }}>
            {displayText}
          </div>
        </section>

        <section className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <button
            className="min-h-24 flex-1 rounded-[1.75rem] border-[5px] border-[#2d241a] bg-[#3fb34f] px-6 py-5 text-3xl font-bold text-black shadow-[0_8px_0_#2d241a] transition-transform enabled:active:translate-y-[2px] disabled:cursor-default disabled:opacity-100"
            disabled={disableButtons}
            onClick={onStartStop}
            type="button">
            {startStopLabel}
          </button>
          <button
            className="min-h-24 flex-1 rounded-[1.75rem] border-[5px] border-[#2d241a] bg-[#e34b42] px-6 py-5 text-3xl font-bold text-black shadow-[0_8px_0_#2d241a] transition-transform enabled:active:translate-y-[2px] disabled:cursor-default disabled:opacity-100"
            disabled={disableButtons}
            onClick={onClear}
            type="button">
            Clear
          </button>
        </section>
      </div>
    </main>
  );
}
