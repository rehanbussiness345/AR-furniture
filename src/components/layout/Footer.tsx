"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";

const SHOP_LINKS = [
  { label: "Beds", href: "/collections/bed" },
  { label: "Sofas", href: "/collections/sofa" },
  { label: "King Size Beds", href: "/collections/bed?type=King%20Size%20Beds" },
  { label: "Storage Beds", href: "/collections/bed?type=Storage%20Beds" },
  { label: "L-Shaped Sofas", href: "/collections/sofa?type=L-Shaped%20Sofas" },
  { label: "Designer Sofas", href: "/collections/sofa?type=Designer%20Sofas" },
  { label: "Shop All", href: "/collections/all" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/pages/about" },
  { label: "Our Reviews", href: "/#reviews" },
  { label: "FAQs", href: "/pages/faq" },
  { label: "Contact Us", href: "/pages/contact" },
];

const SUPPORT_LINKS = [
  { label: "Track Your Order", href: "/pages/track-your-order" },
  { label: "Shipping Policy", href: "/pages/shipping-policy" },
  { label: "Return & Refund", href: "/pages/return-and-refund" },
  { label: "Privacy & Cookie Policy", href: "/pages/privacy-cookie-policy" },
  { label: "Terms & Conditions", href: "/pages/terms-and-condition" },
];

function NewsletterForm() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };
  return (
    <form onSubmit={submit} className="mt-5">
      {done ? (
        <p className="text-sm text-white/80">
          Thank you for subscribing. Welcome to the AR Furniture family.
        </p>
      ) : (
        <div className="flex max-w-sm items-center border-b border-white/25 pb-2">
          <Mail className="mr-3 size-4 shrink-0 text-white/50" strokeWidth={1.7} />
          <input
            type="email"
            required
            placeholder="Enter your email address"
            aria-label="Email address"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform hover:scale-105"
          >
            <ArrowRight className="size-4" strokeWidth={1.7} />
          </button>
        </div>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-4 pt-16 pb-8 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-baseline gap-1.5">
              <span className="font-display text-[30px] font-extrabold tracking-tight">AR</span>
              <span className="font-accent text-[28px] italic">furniture</span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
              We make things that work better and last longer. Our products solve
              real problems with clean design and honest materials.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.7} />
                First Floor, 127, Udyog Vihar Phase 4 Rd, Phase IV, Udyog Vihar,
                Sector 19, Gurugram, Haryana 122015
              </p>
              <p className="flex items-center gap-3">
                <Phone className="size-4 shrink-0" strokeWidth={1.7} />
                +91 98100 00000
              </p>
              <p className="flex items-center gap-3">
                <Mail className="size-4 shrink-0" strokeWidth={1.7} />
                care@arfurniture.in
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com" },
                { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com" },
                { Icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com" },
                { Icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com" },
                { Icon: XIcon, label: "X", href: "https://x.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "Shop", links: SHOP_LINKS },
            { title: "Company", links: COMPANY_LINKS },
            { title: "Support", links: SUPPORT_LINKS },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[15px] text-white/80 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-white/15 pt-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h3 className="font-accent text-2xl italic">Stay inspired.</h3>
              <p className="mt-1 text-sm text-white/60">
                New bed & sofa collections, design notes and member-only offers.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/15 pt-7 md:flex-row">
          <p className="text-[13px] text-white/50">
            © {new Date().getFullYear()} AR Furniture. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "RuPay", "UPI", "EMI"].map((p) => (
              <span
                key={p}
                className="rounded border border-white/20 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/70 uppercase"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
