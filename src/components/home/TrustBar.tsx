import { Gift, RefreshCcw, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  { Icon: Gift, label: "Every purchase gets a FREE gift" },
  { Icon: Truck, label: "Free shipping on all orders" },
  { Icon: RefreshCcw, label: "Quick & easy returns" },
  { Icon: ShieldCheck, label: "5 years warranty" },
];

export default function TrustBar() {
  return (
    <section className="border-b border-ink/10 bg-white" aria-label="Our promises">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-5 px-4 py-6 lg:grid-cols-4 lg:px-8">
        {ITEMS.map(({ Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 px-2 text-center lg:justify-center"
          >
            <Icon className="size-7 shrink-0 text-ink" strokeWidth={1.4} aria-hidden />
            <p className="text-left text-[13px] leading-snug font-medium text-ink/80 lg:text-sm">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
