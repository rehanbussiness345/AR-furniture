"use client";

import { Package, PackageCheck, Sofa, Truck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  { Icon: PackageCheck, label: "Order confirmed", desc: "We've received your order and payment." },
  { Icon: Sofa, label: "In production", desc: "Your piece is being crafted and quality-checked." },
  { Icon: Truck, label: "Shipped", desc: "Handed to our white-glove delivery partner." },
  { Icon: Package, label: "Delivered", desc: "Installed in your room of choice — packaging taken away." },
];

export default function TrackOrder() {
  const [value, setValue] = useState("");
  const [searched, setSearched] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().length >= 4) setSearched(true);
  };

  return (
    <div className="mt-8">
      <form onSubmit={submit} className="flex max-w-md gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter order ID (e.g. AR1042)"
          aria-label="Order ID"
          className="w-full border border-ink/20 bg-white px-4 py-3 text-sm outline-none focus:border-ink"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-ink-soft"
        >
          Track
        </button>
      </form>

      {searched && (
        <div className="mt-8 max-w-lg border border-ink/12 p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Order {value.trim().toUpperCase()}</p>
            <span className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-bold tracking-wide text-ink uppercase">
              In production
            </span>
          </div>
          <ol className="mt-6 space-y-0">
            {STEPS.map((s, i) => {
              const done = i <= 1;
              return (
                <li key={s.label} className="relative flex gap-4 pb-7 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span
                      className={cn(
                        "absolute top-9 left-[17px] h-[calc(100%-24px)] w-px",
                        done ? "bg-leaf" : "bg-ink/15",
                      )}
                      aria-hidden
                    />
                  )}
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full border",
                      done
                        ? "border-leaf bg-leaf text-white"
                        : "border-ink/15 bg-white text-ink/40",
                    )}
                  >
                    <s.Icon className="size-4" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className={cn("text-sm font-semibold", !done && "text-ink/45")}>{s.label}</p>
                    <p className="mt-0.5 text-[13px] text-ink/55">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 border-t border-ink/10 pt-4 text-[12.5px] text-ink/55">
            Demo tracking — statuses shown here are sample data. For real-time
            updates, WhatsApp your order ID to +91 98100 00000.
          </p>
        </div>
      )}
    </div>
  );
}
