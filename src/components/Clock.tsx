"use client";

import { useEffect, useState } from "react";

export default function Clock({ dark = false }: { dark?: boolean }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Kyiv",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`tabular-nums text-sm ${
        dark ? "text-cream/60" : "text-muted"
      }`}
      title="Kyiv time (Europe/Kyiv)"
    >
      {time || "--:--"}
    </span>
  );
}