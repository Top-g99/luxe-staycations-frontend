'use client';
import React, { useState } from "react";
import Link from "next/link";

export default function VillasPage() {
  const [destination, setDestination] = useState("Thailand");
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  const villas = [
    {
      place: "Singapore",
      name: "Marina Bay Sands",
      reviews: 3260,
      description: "Marina Bay Sands Singapore's iconic villa featuring breathtaking views, premium amenities, and the famous infinity pool overlooking.",
      img: "https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop",
      slug: "marina-bay-sands"
    },
    {
      place: "Maldives",
      name: "Emerald Bay Resort",
      reviews: 2169,
      description: "Nestled along pristine shores, Emerald Bay Resort offers a serene escape with luxurious amenities, breathtaking views.",
      img: "https://images.unsplash.com/photo-1519821172141-b5d8a4d3eace?q=80&w=1200&auto=format&fit=crop",
      slug: "emerald-bay-resort"
    },
    {
      place: "Bali",
      name: "Atalaya Villas Nusa Penida",
      reviews: 1830,
      description: "Experience island luxury at Atalaya Villas Nusa Penida a serene escape featuring elegant villas, breathtaking ocean views.",
      img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
      slug: "atalaya-villas-nusa-penida"
    },
    {
      place: "Bangkok",
      name: "Royal Orchid Suites",
      reviews: 1830,
      description: "Experience modern elegance and exceptional comfort at Royal Orchid Suites your perfect retreat for both business and leisure stays.",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      slug: "royal-orchid-suites"
    },
    {
      place: "New York",
      name: "The Peninsula",
      reviews: 2209,
      description: "Experience timeless luxury at The Peninsula, where world-class service, elegant rooms, and breathtaking city views come together.",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
      slug: "the-peninsula"
    },
    {
      place: "Zurich",
      name: "The Dolder Grand",
      reviews: 2930,
      description: "Experience timeless luxury at The Dolder Grand, a five-star villa in Zurich offering breathtaking views, world-class amenities.",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
      slug: "the-dolder-grand"
    },
    {
      place: "Dubai",
      name: "Burj Al Arab",
      reviews: 2930,
      description: "Experience the pinnacle of luxury at Burj Al Arab Dubai's iconic sail-shaped villa offering world-class service, lavish suites, and breathtaking views.",
      img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
      slug: "burj-al-arab"
    },
    {
      place: "Tokyo",
      name: "The Luxe Retreat",
      reviews: 1570,
      description: "Experience unmatched comfort and elegance at The Velvet Stay where modern luxury meets warm hospitality for a truly memorable escape.",
      img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1200&auto=format&fit=crop",
      slug: "the-luxe-retreat"
    },
    {
      place: "Sydney",
      name: "The Velvet Stay",
      reviews: 1326,
      description: "Experience comfort and elegance at Moonlight Residency your perfect retreat with modern amenities and a peaceful atmosphere.",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
      slug: "the-velvet-stay"
    },
  ];

  return (
    <main className="min-h-screen bg-[#ffffff] text-[#171717]">
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden -mt-20 pt-20"
        style={{
          backgroundImage:
            "url(https://ml5vpmchq2rr.i.optimole.com/cb:CFS-.b56/w:1024/h:683/q:mauto/f:best/ig:avif/https://iconprivatecollection.com/wp-content/uploads/2020/11/party-rooftop-Villa-Clara-luxury-property-The-Heritage-Collection-Rome-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-28 md:py-36 text-left text-white">
          <div className="flex items-center gap-2 text-sm/6 tracking-wide opacity-90 mb-4">
            <a href="/" className="hover:text-white/80">Home</a>
            <span>/</span>
            <span>Villas</span>
          </div>
          <h1 className="display max-w-3xl text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight">
            Find Your Perfect Villa
          </h1>

          {/* Search Form */}
          <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-[1.6fr_1.6fr_1.2fr_auto]">
            {/* Destination */}
            <div className="h-16 rounded-xl bg-white text-[#171717] shadow-md border border-black/10 px-5 flex flex-col justify-center">
              <span className="text-xs font-medium text-black/60">Destination</span>
              <select
                className="mt-1 w-full bg-transparent outline-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option>Thailand</option>
                <option>New York</option>
                <option>Paris</option>
                <option>Dubai</option>
              </select>
            </div>

            {/* Date range */}
            <div className="h-16 rounded-xl bg-white text-[#171717] shadow-md border border-black/10 px-5 flex items-center">
              <div className="flex-1">
                <div className="text-xs font-medium text-black/60">Check In</div>
                <input type="date" className="mt-1 bg-transparent outline-none" />
              </div>
              <div className="mx-4 hidden h-8 w-px bg-black/10 md:block" />
              <div className="flex-1">
                <div className="text-xs font-medium text-black/60">Check Out</div>
                <input type="date" className="mt-1 bg-transparent outline-none" />
              </div>
            </div>

            {/* Guests */}
            <div className="h-16 rounded-xl bg-white text-[#171717] shadow-md border border-black/10 px-5 flex flex-col justify-center">
              <span className="text-xs font-medium text-black/60">Guests and Rooms</span>
              <select
                className="mt-1 w-full bg-transparent outline-none"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option>2 Guests, 1 Room</option>
                <option>4 Guests, 2 Room</option>
                <option>6 Guests, 3 Room</option>
                <option>8 Guests, 4 Room</option>
              </select>
            </div>

            {/* Button */}
            <button className="h-16 rounded-xl bg-[#5a3d35] px-8 text-white font-medium shadow-md whitespace-nowrap">
              Search Now
            </button>
          </div>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {villas.map((villa, i) => (
            <Link key={i} href={`/villas/${villa.slug}`} className="block">
              <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="h-64 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${villa.img})` }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs opacity-70">//{villa.place}</p>
                    <p className="text-xs text-black/60">{villa.reviews} Reviews</p>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{villa.name}</h3>
                  <p className="text-sm text-black/70 mb-4 leading-relaxed">{villa.description}</p>
                  <button className="w-full rounded-full bg-[#111111] px-6 py-3 text-sm text-white font-medium hover:bg-black transition">
                    Book Now
                  </button>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
