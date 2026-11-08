"use client";

import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-leaf/30 bg-leaf/5 p-6">
        <p className="flex items-center gap-2 font-semibold text-leaf">
          <Check className="size-5" strokeWidth={2} /> Message received
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Thank you for reaching out to AR Furniture. Our team typically replies
          within one business day. For urgent queries, call +91 98100 00000.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-ink/20 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-ink placeholder:text-ink/40";

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder="Your name" aria-label="Your name" className={inputCls} />
        <input
          required
          name="phone"
          type="tel"
          placeholder="Phone number"
          aria-label="Phone number"
          className={inputCls}
        />
      </div>
      <input
        required
        name="email"
        type="email"
        placeholder="Email address"
        aria-label="Email address"
        className={inputCls}
      />
      <textarea
        required
        name="message"
        rows={5}
        placeholder="How can we help? (Customisation, bulk orders, order support...)"
        aria-label="Message"
        className={inputCls}
      />
      <div>
        <button
          type="submit"
          className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
        >
          Send message
        </button>
      </div>
    </form>
  );
}
