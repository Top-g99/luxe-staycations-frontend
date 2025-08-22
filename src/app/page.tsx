'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BookingProcess from "@/components/BookingProcess";
import { useProperties, usePropertySearch } from "@/hooks/useApi";
import { Property } from "@/lib/api";

export default function Home() {
  const [destination, setDestination] = useState("Thailand");
  const [guests, setGuests] = useState("2 Guests, 1 Room");
  
  // API hooks for fetching data
  const { 
    data: featuredProperties, 
    loading: propertiesLoading, 
    error: propertiesError,
    execute: getFeaturedProperties 
  } = useProperties();
  
  const { 
    data: searchResults, 
    loading: searchLoading, 
    error: searchError,
    execute: searchProperties 
  } = usePropertySearch();

  // Fetch featured properties on component mount
  useEffect(() => {
    getFeaturedProperties({ 
      limit: 4, 
      verified: true,
      sortBy: 'rating',
      sortOrder: 'desc'
    });
  }, [getFeaturedProperties]);

  // Handle search form submission
  const handleSearch = async () => {
    if (destination && destination !== "Thailand") {
      await searchProperties({
        location: destination,
        limit: 10,
        verified: true
      });
    }
  };

  // Get properties to display (either featured or search results)
  const displayProperties = searchResults?.data || featuredProperties?.data || [];
  const isLoading = propertiesLoading || searchLoading;

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
        <div className="relative z-10 w-full pl-2 pr-6 sm:pl-4 md:pl-6 lg:pl-8 py-24 sm:py-28 md:py-36 text-left text-white max-w-6xl">
          <h1 className="display max-w-3xl text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight">
            Welcome to Your Peace
            <br />
            Welcome to Your Joy
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-4xl">
            Step into a world where every detail is curated with intention. Here, time slows down, connections deepen, and moments become memories you'll carry long after you leave. Your extraordinary escape is more than a stay—it's a feeling waiting to be discovered.
          </p>

          {/* Panel with subheading and form */}
          <div className="mt-10 rounded-2xl bg-black/70 p-6 shadow-2xl backdrop-blur max-w-4xl">
            <h3 className="display text-2xl sm:text-3xl text-white">Ready to Find a Great Villa Deal?</h3>
            <p className="mt-2 text-white/85">Save up to 25% on your next villa stay</p>

            {/* Quick Search - single row layout */}
            <div className="mt-6 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-[1.6fr_1.6fr_1.2fr_auto]">
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

              {/* Date range (Check in / Check out) */}
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
              <button 
                className="h-16 rounded-xl bg-[#5a3d35] px-8 text-white font-medium shadow-md whitespace-nowrap hover:bg-[#4a332c] transition-colors"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm opacity-70">//Our Features</p>
        <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">Powerful Tools for Effortless Travel</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Effortless Villa Booking",
              desc:
                "Easily find and reserve your ideal stay with our user-friendly platform—no stress, no hassle.",
            },
            {
              title: "Best Price Guarantee",
              desc:
                "If you find a better price elsewhere, we'll match it to ensure you always get the best deal.",
            },
            {
              title: "Reviews & Ratings",
              desc:
                "Hear what our guests have to say—read honest reviews and real ratings from travelers.",
            },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-black/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Top Villas */}
      <section className="bg-[#fafafa] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            {searchResults?.data ? `Search Results for ${destination}` : 'Explore Top Villas'}
          </h2>
          
          {/* Error Display */}
          {propertiesError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Error loading properties: {propertiesError}</p>
            </div>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-44 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}
          
          {/* Properties Grid */}
          {!isLoading && displayProperties.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayProperties.map((property: Property) => (
                <Link key={property.id} href={`/villas/${property.id}`} className="block">
                  <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div
                      className="h-44 w-full bg-cover bg-center"
                      style={{ 
                        backgroundImage: property.image_urls && property.image_urls.length > 0 
                          ? `url(${property.image_urls[0]})` 
                          : 'url(https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop)'
                      }}
                    />
                    <div className="p-4">
                      <p className="text-xs opacity-70">//{property.location}</p>
                      <h3 className="mt-1 font-semibold">{property.title}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-[#5a3d35]">
                          ${property.price_per_night}/night
                        </span>
                        {property.averageRating && (
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{property.averageRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <button className="mt-3 rounded-full bg-[#111111] px-4 py-2 text-xs text-white hover:bg-[#333333] transition-colors">
                        Booking Now
                      </button>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
          
          {/* No Results */}
          {!isLoading && displayProperties.length === 0 && searchResults?.data && (
            <div className="mt-10 text-center py-12">
              <p className="text-gray-500 text-lg">No properties found for "{destination}"</p>
              <p className="text-gray-400 text-sm mt-2">Try a different destination or check back later</p>
            </div>
          )}
          
          {/* Show All Properties Link */}
          {!searchResults?.data && (
            <div className="mt-8 text-center">
              <Link 
                href="/villas" 
                className="inline-flex items-center gap-2 text-[#5a3d35] hover:text-[#4a332c] transition-colors underline"
              >
                View All Villas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Pick a Destination */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="display text-3xl sm:text-4xl md:text-5xl">Pick a Destination</h2>
            <Link href="#" className="flex items-center gap-2 text-[#5a3d35] hover:text-[#4a332c] transition-colors underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Show nearby locations
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
            {[
              {
                name: "Lonavala",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              },
              {
                name: "Karjat",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#4a332c] to-[#2d1f1a]"
              },
              {
                name: "Kasauli",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              },
              {
                name: "Ooty",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#4a332c] to-[#2d1f1a]"
              },
              {
                name: "Mussoorie",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              },
              {
                name: "Panchgani",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#4a332c] to-[#2d1f1a]"
              },
              {
                name: "Udaipur",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              },
              {
                name: "Nainital",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#4a332c] to-[#2d1f1a]"
              },
              {
                name: "Goa",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              },
              {
                name: "Alibaug",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#4a332c] to-[#2d1f1a]"
              },
              {
                name: "Manali",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              },
              {
                name: "Coorg",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#4a332c] to-[#2d1f1a]"
              },
              {
                name: "Nashik",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              },
              {
                name: "Jaipur",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              },
              {
                name: "Alleppey",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#4a332c] to-[#2d1f1a]"
              },
              {
                name: "Wayanad",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d35?q=80&w=1200&auto=format&fit=crop",
                bgColor: "from-[#5a3d35] to-[#4a332c]"
              }
            ].map((destination, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-200">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#5a3d35] transition-colors">
                  {destination.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-32 h-1 bg-gray-200 rounded-full">
                <div className="w-16 h-1 bg-[#5a3d35] rounded-full"></div>
              </div>
              <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About + CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm opacity-70">//About Us</p>
        <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">Your Journey Starts With Luxe Staycations</h2>
        <div className="mt-4 max-w-3xl text-black/75">
          We are dedicated to making villa and villa booking seamless, reliable, and tailored to your needs.
        </div>
        <div className="mt-8 rounded-2xl bg-[#111111] px-6 py-8 text-white">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-semibold">Flash Sale! Book Now Before It's Gone!</h3>
            <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#111111] hover:bg-gray-100 transition-colors">
              Grab This Deal
            </button>
          </div>
        </div>
      </section>

      {/* Booking Process (animated cards) */}
      <div className="py-16">
        <BookingProcess />
      </div>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm opacity-70">//Testimonials</p>
        <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">What Our Satisfied Clients Say</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Booking with Luxe Staycations was the best decision—super easy and the best prices!",
              author: "Methew John, New York",
            },
            {
              quote:
                "Fast, reliable, and always great stays. I find options that fit my trips every time.",
              author: "John Doe, Florida",
            },
            {
              quote:
                "From filters to instant confirmation, everything was incredibly smooth.",
              author: "Jhonathon Adam, Canada",
            },
          ].map((t, i) => (
            <blockquote key={i} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-black/80">"{t.quote}"</p>
              <footer className="mt-4 text-sm font-medium">{t.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Contact / Talk to Expert */}
      <section className="bg-[#fafafa] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">Talk to a Travel Expert</h2>
          <form className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input placeholder="Name" className="h-11 rounded-lg border border-black/10 bg-white px-3 outline-none" />
            <input placeholder="Email" className="h-11 rounded-lg border border-black/10 bg-white px-3 outline-none" />
            <select className="h-11 rounded-lg border border-black/10 bg-white px-3 outline-none">
              <option>Dubai</option>
              <option>Maldives</option>
              <option>Singapore</option>
            </select>
            <div className="flex items-center gap-2">
              <input id="agree" type="checkbox" className="h-4 w-4" />
              <label htmlFor="agree" className="text-sm">I agree to the privacy policy</label>
            </div>
            <button className="h-11 rounded-lg bg-[#111111] text-white font-medium sm:col-span-2 hover:bg-[#333333] transition-colors">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm opacity-70">//Our Blog</p>
        <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">The Ultimate Stay Guide</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Best Budget-Friendly Villas in Top Destinations",
              img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
            },
            {
              title: "Guide to Booking the Perfect Villa Online",
              img: "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1200&auto=format&fit=crop",
            },
            {
              title: "Solo Travel? Pick the Safest & Best Villas",
              img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
            },
          ].map((b, i) => (
            <article key={i} className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              <div className="h-44 w-full bg-cover bg-center" style={{ backgroundImage: `url(${b.img})` }} />
              <div className="p-4">
                <h3 className="font-semibold">{b.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-[#fafafa] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Escape, Handled with Heart</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* For the Guest */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">For the Guest</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Homes Chosen with Care</h4>
                  <p className="text-gray-700">Every villa is personally experienced by us—loved before it is shared. We host you only in homes that move us, so you can fall in love too.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Your Wishlist, Realized</h4>
                  <p className="text-gray-700">From candlelit dinners under the stars to a surprise celebration, we delight in bringing your dreams to life.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Always Within Reach</h4>
                  <p className="text-gray-700">Day or night, we're just a call away. Your peace of mind is at the heart of everything we do.</p>
                </div>
              </div>
            </div>

            {/* For the Property Owner */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">For the Property Owner</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">A Stage for Your Story</h4>
                  <p className="text-gray-700">We see your property's unique character and share it with guests who will cherish it as much as you do.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">We Handle the Details</h4>
                  <p className="text-gray-700">Secure bookings, calendar sync, seamless operations—you focus on welcoming, we manage the rest.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Turning Passion into Prosperity</h4>
                  <p className="text-gray-700">With insights and support, we help you transform your space into not just a home, but a thriving business.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="py-20 bg-gradient-to-br from-[#5a3d35] to-[#4a332c] text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Own a Villa? Partner With Us!</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Turn your villa into a thriving business. Join thousands of successful property owners who trust Luxe Staycations to maximize their rental income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/partner-with-us" 
              className="bg-white text-[#5a3d35] px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors text-lg"
            >
              List Your Villa
            </Link>
            <Link 
              href="/partner-with-us" 
              className="bg-white/20 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/30 transition-colors text-lg backdrop-blur"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (dark, large heading, 4-column layout) */}
      <footer className="bg-[#0d0d0d] text-white">
        <div className="mx-auto max-w-6xl px-6 pt-16 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="font-medium">Luxe</span>
          </div>
          <h2 className="display text-4xl sm:text-6xl md:text-7xl leading-tight">Experience comfort<br/>worldwide</h2>

          <div className="mt-6 flex items-center justify-center gap-3">
            {["f","d","p","x"].map((k, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 rounded-full border border-white/20 text-white/90 flex items-center justify-center hover:bg-white/10"
                aria-label="social"
              >
                {k}
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-6">
          <div className="h-px w-full bg-white/10" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-10 text-white/80 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg text-white">Address</h3>
              <p className="mt-4 text-sm leading-6">123 Main Street New York, NY<br/>10001</p>
            </div>
            <div>
              <h3 className="text-lg text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Villas</a></li>
                <li><a href="#" className="hover:text-white">Destinations</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-white">Contact</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="mailto:luxe@info.com" className="hover:text-white">luxe@info.com</a></li>
                <li><a href="tel:+1-212-456-7890" className="hover:text-white">+1-212-456-7890</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-white">Utility Pages</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Password Protected</a></li>
                <li><a href="#" className="hover:text-white">404 Not Found</a></li>
                <li><a href="#" className="hover:text-white">Style Guide</a></li>
                <li><a href="#" className="hover:text-white">Changelog</a></li>
                <li><a href="#" className="hover:text-white">Licenses</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 py-6 text-center text-xs text-white/60">
            Copyright © {new Date().getFullYear()} Luxe Staycations
          </div>
        </div>
      </footer>
    </main>
  );
}
