import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/pages/ContactForm";
import TrackOrder from "@/components/pages/TrackOrder";

export const dynamic = "force-dynamic";

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "In-stock beds and sofas ship free within 1–2 business days and typically arrive in 5–10 business days across India. Made-to-order and customised pieces take 2–4 weeks.",
  },
  {
    q: "Do beds include hydraulic storage?",
    a: "Many of our beds ship with standard box storage. Hydraulic storage can be added to most designs at additional cost — mention it at checkout or contact our team and we'll customise it for you.",
  },
  {
    q: "Can I customise fabric, colour or size?",
    a: "Yes. Most sofas can be made in your choice of fabric and colour, and beds can be adjusted to Queen, King or King Pro sizes. You can even send us your own fabric. Visit our Gurugram Experience Centre or write to care@arfurniture.in.",
  },
  {
    q: "What does the 5-year warranty cover?",
    a: "It covers the structural frame, joints and reclining/lift mechanisms against manufacturing defects. Fabric wear from daily use is covered under our 60-day moneyback guarantee instead.",
  },
  {
    q: "Is installation included?",
    a: "Yes. Our delivery partners install your bed or sofa in your room of choice and take away all packaging — free of charge.",
  },
  {
    q: "What payment options are available on this demo store?",
    a: "This storefront is a design demonstration; checkout and payment processing are intentionally disabled. To purchase, call us or visit the Experience Centre.",
  },
];

interface PageDef {
  title: string;
  kicker: string;
  render: () => React.ReactNode;
}

const PAGES: Record<string, PageDef> = {
  about: {
    title: "Our Story",
    kicker: "About AR Furniture",
    render: () => (
      <>
        <div className="relative mb-10 aspect-[16/8] w-full overflow-hidden bg-mist">
          <Image
            src="/images/experience.jpg"
            alt="Inside the AR Furniture studio"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="prose-block">
          <p>
            AR Furniture began with a simple frustration: why was it so hard to find a
            genuinely well-made bed or sofa in India without paying designer-showroom
            prices? We studied the craftsmanship and design philosophy behind iconic
            furniture — then built a workshop that could deliver it honestly.
          </p>
          <p>
            Today we focus on exactly two things: <strong>beds and sofas</strong>. The
            two pieces of furniture your body spends the most time with. Seasoned
            timber frames, fabrics tested to 40,000+ rubs, cushion foams graded for a
            decade of daily use — and a 67-point inspection before anything leaves our
            floor.
          </p>
          <p>
            We make things that work better and last longer. Our products solve real
            problems with clean design and honest materials. That&apos;s the whole
            philosophy; everything else is detail.
          </p>
        </div>
      </>
    ),
  },
  contact: {
    title: "Contact Us",
    kicker: "We're here to help",
    render: () => (
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <p className="text-[15px] leading-relaxed text-ink/65">
            Questions about a bed or sofa, customisation, an existing order, or a
            bulk/project enquiry — reach us any way you like.
          </p>
          <div className="space-y-4 text-[14.5px]">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0" strokeWidth={1.6} />
              <span>
                <strong>AR Furniture Experience Centre</strong>
                <br />
                First Floor, 127, Udyog Vihar Phase 4 Rd, Phase IV, Udyog Vihar,
                Sector 19, Gurugram, Haryana 122015
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="size-5 shrink-0" strokeWidth={1.6} /> +91 98100 00000
            </p>
            <p className="flex items-center gap-3">
              <Mail className="size-5 shrink-0" strokeWidth={1.6} /> care@arfurniture.in
            </p>
          </div>
          <div className="border-t border-ink/10 pt-6 text-[14px] text-ink/60">
            <p className="font-semibold text-ink">Experience Centre hours</p>
            <p className="mt-1.5">Monday – Sunday · 10:30 AM – 8:00 PM</p>
          </div>
        </div>
        <ContactForm />
      </div>
    ),
  },
  faq: {
    title: "Frequently Asked Questions",
    kicker: "Good to know",
    render: () => (
      <div className="max-w-3xl">
        {FAQS.map((f) => (
          <details key={f.q} className="group border-b border-ink/10">
            <summary className="flex cursor-pointer items-center justify-between py-5 text-[15.5px] font-semibold">
              {f.q}
              <ChevronDown className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-180" strokeWidth={1.7} />
            </summary>
            <p className="pb-6 text-[14.5px] leading-relaxed text-ink/65">{f.a}</p>
          </details>
        ))}
      </div>
    ),
  },
  "track-your-order": {
    title: "Track Your Order",
    kicker: "Order status",
    render: () => (
      <>
        <p className="max-w-xl text-[15px] leading-relaxed text-ink/65">
          Enter the order ID from your confirmation email or WhatsApp message to see
          where your furniture is right now.
        </p>
        <TrackOrder />
      </>
    ),
  },
  "shipping-policy": {
    title: "Shipping Policy",
    kicker: "Delivery, done properly",
    render: () => (
      <div className="prose-block">
        <p>
          Every AR Furniture order ships <strong>free, anywhere in India</strong> —
          no hidden charges, no surprise handling fees at checkout.
        </p>
        <p>
          In-stock pieces are dispatched within 1–2 business days and typically arrive
          in 5–10 business days. Customised and made-to-order pieces ship in 2–4 weeks.
          Bulky furniture travels with specialist white-glove partners who install your
          bed or sofa in the room of your choice and remove all packaging.
        </p>
        <p>
          You'll receive tracking details by email and WhatsApp the moment your order
          leaves our facility. If anything arrives damaged, photograph it within 48
          hours and we'll repair or replace it — that's the promise.
        </p>
      </div>
    ),
  },
  "return-and-refund": {
    title: "Return & Refund Policy",
    kicker: "Buy with confidence",
    render: () => (
      <div className="prose-block">
        <p>
          Every piece includes a <strong>60-day moneyback guarantee</strong>. If the
          furniture isn't right for your home, contact us within 60 days of delivery
          and we'll arrange a pickup and refund.
        </p>
        <p>
          Items must be in original condition. Customised pieces (client-selected
          fabrics, altered dimensions) are eligible for repair or exchange rather than
          refund, as they're built specifically for you.
        </p>
        <p>
          Approved refunds are processed to the original payment method within 5–7
          business days of pickup. Manufacturing defects are always covered
          separately under our 5-year warranty — no questions asked.
        </p>
      </div>
    ),
  },
  "privacy-cookie-policy": {
    title: "Privacy & Cookie Policy",
    kicker: "Your data, respected",
    render: () => (
      <div className="prose-block">
        <p>
          We collect only the information needed to fulfil your order and improve your
          experience: contact details, delivery address and browsing preferences on
          this site. We never sell your data to third parties.
        </p>
        <p>
          This store uses a local browser storage cookie to remember your cart and
          wishlist between visits. No advertising trackers are installed.
        </p>
        <p>
          You may request a copy or deletion of your personal data at any time by
          writing to care@arfurniture.in.
        </p>
      </div>
    ),
  },
  "terms-and-condition": {
    title: "Terms & Conditions",
    kicker: "The fine print, kept short",
    render: () => (
      <div className="prose-block">
        <p>
          AR Furniture sells beds and sofas directly to customers across India. All
          prices are listed in Indian Rupees and include applicable taxes.
        </p>
        <p>
          Product images are representative; natural materials like solid wood and
          bouclé vary slightly in grain and tone — that variation is part of their
          character, not a defect.
        </p>
        <p>
          Warranty, returns and delivery are governed by our Shipping and Return &
          Refund policies. By placing an order you confirm that delivery access
          (lifts/staircases) can accommodate furniture of the ordered dimensions.
        </p>
      </div>
    ),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: PAGES[slug]?.title ?? "Page" };
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8 lg:py-16">
      <div className="max-w-4xl">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-ink/50 uppercase">
          {page.kicker}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {page.title}
        </h1>
        <div className="mt-8">{page.render()}</div>
      </div>
    </div>
  );
}
