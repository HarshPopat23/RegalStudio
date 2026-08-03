import { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import WhatsAppButton from "../components/WhatsAppButton";
import { siteConfig } from "../config/siteConfig";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section className="festive-bg min-h-[75vh] px-5 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Let's create together"
        title="Tell Us About Your Celebration"
        copy="For quickest replies, message us on WhatsApp with your theme and preferred size."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-3xl bg-[#5b1729] p-8 text-white">
          <h3 className="text-2xl">Contact Regal Print</h3>

          <div className="mt-7 space-y-5 text-sm text-[#ead4ca]">
            <p>
              <b className="block text-amber-300">Phone</b>
              {siteConfig.phone}
            </p>

            <p>
              <b className="block text-amber-300">Email</b>
              {siteConfig.email}
            </p>

            <p>
              <b className="block text-amber-300">Instagram</b>
              @regalprint.gift
            </p>
          </div>

          <div className="mt-8">
            <WhatsAppButton />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#e5d3b8] bg-white p-8 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" required />
            <Field label="Phone number" type="tel" required />

            <div className="sm:col-span-2">
              <Field label="Event type" required />
            </div>
          </div>

          <label className="mt-5 block text-sm font-bold">
            Tell us what you need

            <textarea
              required
              className="admin-input mt-2 min-h-32"
              placeholder="Theme, size, colours, personalization..."
            />
          </label>

          <button
            type="submit"
            className="mt-6 rounded-full bg-[#a73524] px-7 py-3 font-bold text-white hover:bg-[#7d251b]"
          >
            Send enquiry
          </button>

          {sent && (
            <p className="mt-4 text-sm font-bold text-[#16734d]">
              Thank you! Your enquiry has been noted. For immediate assistance,
              please use WhatsApp.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, type = "text", required = false }) {
  return (
    <label className="block text-sm font-bold">
      {label}

      <input
        type={type}
        required={required}
        className="admin-input mt-2"
      />
    </label>
  );
}