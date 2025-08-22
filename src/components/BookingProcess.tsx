"use client";

import React from "react";

type Feature = {
  title: string;
  description: string;
  step: number;
};

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="w-full rounded-2xl bg-[#5a3d35]/95 text-white shadow-2xl">
      <div className="px-6 py-4 border-b border-white/20 text-xl font-semibold flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
          {feature.step}
        </span>
        {feature.title}
      </div>
      <p className="px-6 py-4 text-sm/6 text-white/90">{feature.description}</p>
    </div>
  );
}

export default function BookingProcess() {
  const features: Feature[] = [
    {
      title: "Seamless Reservations",
      description:
        "Booking your perfect stay has never been easier! Enjoy a smooth and hassle-free process: instant confirmations, flexible payment options.",
      step: 1,
    },
    {
      title: "Flexible Payment Options",
      description:
        "Choose from a variety of payment methods for a smooth experience, including credit cards and debit cards.",
      step: 2,
    },
    {
      title: "Changes & Cancellations",
      description:
        "Enjoy peace of mind knowing your changes are just a few clicks away. Our flexible policy fits your travel needs without added stress.",
      step: 3,
    },
  ];

  return (
    <section className="relative">
      {/* Background container */}
      <div className="relative min-h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/564x/3d/4a/de/3d4adec0dd46a256d464e14e49a56641.jpg)",
            filter: "blur(2px)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-16">
          <p className="text-white/85 text-sm">//Booking Process</p>
          <h2 className="display text-white text-4xl sm:text-5xl md:text-6xl max-w-xl leading-tight mb-12">
            Effortless Booking for Every Trip
          </h2>

          {/* Step-up pattern cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`transform ${i === 1 ? 'md:-translate-y-4' : i === 2 ? 'md:-translate-y-8' : ''}`}>
                <FeatureCard feature={f} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


