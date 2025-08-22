'use client';
import React, { useState } from "react";

export default function MarinaBaySandsPage() {
  const [selectedRoom, setSelectedRoom] = useState("All");
  const [destination, setDestination] = useState("Singapore");
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  const amenities = [
    "Rooftop Infinity Pool",
    "Luxury Spa",
    "24-H Fitness Center",
    "Dining Restaurants",
    "Rooftop Bars",
    "Shopping Mall",
    "Airport Transfer",
    "Exclusive Club Lounge"
  ];

  const roomTypes = [
    {
      name: "Seamless Reservations",
      price: 450,
      size: "1880 sq ft",
      sleeps: 6,
      view: "City view",
      beds: "2 Bedroom",
      category: "Deluxe Room",
      images: [
        "https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      name: "Flexible Payment Options",
      price: 780,
      size: "820 sq ft",
      sleeps: 4,
      view: "City view",
      beds: "2 King Bed",
      category: "Premier Room",
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      name: "Changes & Cancellations",
      price: 780,
      size: "820 sq ft",
      sleeps: 4,
      view: "City view",
      beds: "2 King Bed",
      category: "Club Room",
      images: [
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      name: "King Bed Panorama Suite",
      price: 1100,
      size: "820 sq ft",
      sleeps: 4,
      view: "City view",
      beds: "2 King Bed",
      category: "Suites",
      images: [
        "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      name: "Presidential Meeting Suite",
      price: 1890,
      size: "820 sq ft",
      sleeps: 4,
      view: "City view",
      beds: "2 King Bed",
      category: "Presidential Suite",
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
      quote: "From the moment we checked in, the service was exceptional. The suite was stunning with panoramic views of the city skyline. The infinity pool is a must-visit – absolutely breathtaking.",
      author: "Jason Lin",
      location: "Taipei",
      rating: 5
    },
    {
      quote: "We stayed at Marina Bay Sands for our honeymoon, and it exceeded all expectations. The room beautifully decorated, and the staff surprised us with complimentary champagne!",
      author: "Emma Rachel",
      location: "New York",
      rating: 5
    },
    {
      quote: "The staff went above and beyond to make our stay comfortable. From personalized check-in to the attentive concierge, everything was top-notch. Highly recommended!",
      author: "Hugo Fischer",
      location: "Zurich",
      rating: 5
    }
  ];

  const recommendedVillas = [
    {
      place: "Maldives",
      name: "Emerald Bay Resort",
      reviews: 2169,
      description: "Nestled along pristine shores, Emerald Bay Resort offers a serene escape with luxurious amenities, breathtaking views.",
      img: "https://images.unsplash.com/photo-1519821172141-b5d8a4d3eace?q=80&w=1200&auto=format&fit=crop",
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
            "url(https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop)",
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
            <span>Marina Bay Sands</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <h1 className="display text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight">
              Marina Bay Sands
            </h1>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium">4.6</span>
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
                <option>Singapore</option>
                <option>Maldives</option>
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
              Marina Bay Sands—an Iconic Luxury Experience
            </h2>
            <p className="text-lg text-black/70 leading-relaxed mb-6">
              Discover unparalleled luxury at Marina Bay Sands, an architectural marvel in the heart of Singapore. With stunning views of the city skyline and an infinity pool like no other, this villa offers an unforgettable stay. Perfect for leisure and business travelers alike, Marina Bay Sands is a world-class destination for those seeking elegance and excitement.
            </p>
            <p className="text-lg text-black/70 leading-relaxed">
              Enjoy shopping at high-end boutiques, relax at the rejuvenating spa, and try your luck at the world-class casino. With exceptional customer service and a prime location, Marina Bay Sands offers the perfect blend of comfort and extravagance. Book now for an unforgettable stay!
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
            {["All", "Deluxe Room", "Premier Room", "Club Room", "Suites", "Presidential Suite"].map((type) => (
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
