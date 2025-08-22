'use client';
import React, { useState } from "react";

export default function EmeraldBayResortPage() {
  const [selectedRoom, setSelectedRoom] = useState("All");
  const [destination, setDestination] = useState("Maldives");
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  const amenities = [
    "Private Beach Access",
    "Overwater Villas",
    "Infinity Pool",
    "Spa & Wellness Center",
    "Water Sports Center",
    "Fine Dining Restaurants",
    "Sunset Bar",
    "Kids Club"
  ];

  const roomTypes = [
    {
      name: "Beach Villa – Ocean View",
      price: 650,
      size: "1200 sq ft",
      sleeps: 4,
      view: "Ocean view",
      beds: "1 King Bed",
      category: "Beach Villa",
      images: [
        "https://images.unsplash.com/photo-1519821172141-b5d8a4d3eace?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      name: "Overwater Villa – Premium",
      price: 950,
      size: "1500 sq ft",
      sleeps: 4,
      view: "Panoramic ocean view",
      beds: "1 King Bed + 1 Twin",
      category: "Overwater Villa",
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      name: "Presidential Overwater Suite",
      price: 1800,
      size: "2200 sq ft",
      sleeps: 6,
      view: "360° ocean view",
      beds: "2 King Beds",
      category: "Presidential Suite",
      images: [
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      name: "Garden Villa – Private Pool",
      price: 750,
      size: "1400 sq ft",
      sleeps: 4,
      view: "Garden view",
      beds: "1 King Bed",
      category: "Garden Villa",
      images: [
        "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      name: "Family Beach Villa",
      price: 1200,
      size: "1800 sq ft",
      sleeps: 8,
      view: "Beach front",
      beds: "3 Bedrooms",
      category: "Family Villa",
      images: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop"
      ]
    }
  ];

  // Filter rooms based on selected category
  const filteredRooms = selectedRoom === "All" 
    ? roomTypes 
    : roomTypes.filter(room => room.category === selectedRoom);

  const testimonials = [
    {
      quote: "The overwater villa was absolutely magical! Waking up to the sound of waves and watching the sunset from our private deck was unforgettable. The staff was incredibly attentive and made our honeymoon perfect.",
      author: "Sarah Johnson",
      location: "London",
      rating: 5
    },
    {
      quote: "Emerald Bay Resort exceeded all our expectations. The private beach access, water sports, and spa treatments were world-class. Our kids loved the kids club while we enjoyed some peaceful time.",
      author: "Michael Chen",
      location: "Sydney",
      rating: 5
    },
    {
      quote: "This is paradise on earth! The overwater villas are stunning, the food is exceptional, and the service is impeccable. We've already booked our next stay here.",
      author: "Isabella Rodriguez",
      location: "Barcelona",
      rating: 5
    }
  ];

  const recommendedVillas = [
    {
      place: "Singapore",
      name: "Marina Bay Sands",
      reviews: 3260,
      description: "Marina Bay Sands Singapore's iconic villa featuring breathtaking views, premium amenities, and the famous infinity pool overlooking.",
      img: "https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      place: "Bali",
      name: "Atalaya Villas Nusa Penida",
      reviews: 1830,
      description: "Experience island luxury at Atalaya Villas Nusa Penida a serene escape featuring elegant villas, breathtaking ocean views.",
      img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
    },
    {
      place: "Bangkok",
      name: "Royal Orchid Suites",
      reviews: 1830,
      description: "Experience modern elegance and exceptional comfort at Royal Orchid Suites your perfect retreat for both business and leisure stays.",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    }
  ];

  return (
    <main className="min-h-screen bg-[#ffffff] text-[#171717]">
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden -mt-20 pt-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1519821172141-b5d8a4d3eace?q=80&w=1200&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-28 md:py-36 text-left text-white">
          <div className="flex items-center gap-2 text-sm/6 tracking-wide opacity-90 mb-4">
            <a href="/" className="hover:text-white/80">Home</a>
            <span>/</span>
            <a href="/villas" className="hover:text-white/80">Villas</a>
            <span>/</span>
            <span>Emerald Bay Resort</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <h1 className="display text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight">
              Emerald Bay Resort
            </h1>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>

          {/* Search Form */}
          <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-[1.6fr_1.6fr_1.2fr_auto]">
            <div className="h-16 rounded-xl bg-white text-[#171717] shadow-md border border-black/10 px-5 flex flex-col justify-center">
              <span className="text-xs font-medium text-black/60">Destination</span>
              <select
                className="mt-1 w-full bg-transparent outline-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option>Maldives</option>
                <option>Singapore</option>
                <option>Bali</option>
              </select>
            </div>

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
              </select>
            </div>

            <button className="h-16 rounded-xl bg-[#5a3d35] px-8 text-white font-medium shadow-md whitespace-nowrap">
              Search Now
            </button>
          </div>
        </div>
      </section>

      {/* Villa Description */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="display text-3xl sm:text-4xl md:text-5xl mb-6">
              Paradise Found in the Maldives
            </h2>
            <p className="text-lg text-black/70 leading-relaxed mb-6">
              Nestled along pristine shores, Emerald Bay Resort offers a serene escape with luxurious amenities and breathtaking views. Experience the ultimate in tropical luxury with our overwater villas, private beach access, and world-class service that makes every moment unforgettable.
            </p>
            <p className="text-lg text-black/70 leading-relaxed">
              From romantic honeymoons to family adventures, our resort caters to every type of traveler. Enjoy water sports, spa treatments, fine dining, and sunset cocktails while surrounded by the crystal-clear waters of the Indian Ocean. Your perfect island getaway awaits at Emerald Bay Resort.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="space-y-3">
              {amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#5a3d35] rounded-full"></div>
                  <span className="text-black/70">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="bg-[#fafafa] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="display text-3xl sm:text-4xl md:text-5xl mb-8">Room Types & Features</h2>
          
          {/* Room Type Filter */}
          <div className="flex flex-wrap gap-4 mb-8">
            {["All", "Beach Villa", "Overwater Villa", "Garden Villa", "Presidential Suite", "Family Villa"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedRoom(type)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  selectedRoom === type
                    ? "bg-[#5a3d35] text-white"
                    : "bg-white text-black/70 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRooms.map((room, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${room.images[0]})` }} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{room.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-[#5a3d35]">${room.price}</div>
                    <span className="text-sm text-black/60">Per Night. Included vat & tax</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-black/70">
                    <div>Free self parking</div>
                    <div>{room.size}</div>
                    <div>Sleeps {room.sleeps}</div>
                    <div>{room.view}</div>
                    <div>{room.beds}</div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#5a3d35] text-white py-3 rounded-lg font-medium hover:bg-[#4a2d25] transition">
                      More Details
                    </button>
                    <button className="flex-1 bg-[#111111] text-white py-3 rounded-lg font-medium hover:bg-black transition">
                      Reserve Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="display text-3xl sm:text-4xl md:text-5xl mb-12">Guest Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-black/80 mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5a3d35] flex items-center justify-center text-white font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-black/60">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Villas */}
      <section className="bg-[#fafafa] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm opacity-70">//Top Villas</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl mb-8">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedVillas.map((villa, i) => (
              <article key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${villa.img})` }} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs opacity-70">//{villa.place}</p>
                    <p className="text-xs text-black/60">{villa.reviews} Reviews</p>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{villa.name}</h3>
                  <p className="text-sm text-black/70 mb-4 leading-relaxed">{villa.description}</p>
                  <button className="w-full bg-[#111111] text-white py-3 rounded-lg font-medium hover:bg-black transition">
                    Book Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
