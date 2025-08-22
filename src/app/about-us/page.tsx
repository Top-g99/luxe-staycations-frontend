'use client';
import React from "react";

export default function AboutUsPage() {
  const values = [
    { number: "2,984,630", label: "Happy Traveler" },
    { number: "5,984,600", label: "Destinations Covered" },
    { number: "2,984,685", label: "Villas Listed" },
    { number: "99.8", label: "Customer Satisfaction" },
  ];

  const features = [
    {
      number: "01",
      title: "Seamless Reservations",
      description: "Booking your perfect stay has never been easier! Enjoy a smooth and hassle-free process: instant confirmations, flexible payment options.",
    },
    {
      number: "02",
      title: "Instant Confirmation",
      description: "The moment your reservation is made. No waiting, no uncertainty just peace of mind knowing your stay is secured. Whether you're booking.",
    },
    {
      number: "03",
      title: "Flexible Payment Options",
      description: "We offer a variety of flexible payment methods to make your booking experience as smooth possible. Choose from credit cards, debit cards.",
    },
    {
      number: "04",
      title: "Simple Booking Changes",
      description: "Enjoy peace of mind knowing that your changes are just a few clicks away. Our flexible designed to fit your travel needs without any added stress.",
    },
  ];

  const testimonials = [
    {
      quote: "I booked my trip to Singapore through Luxe Staycations and was amazed at how smooth everything went. The booking process was fast and hassle-free, and I received instant confirmation. The villa exceeded expectations – clean and beautiful views.",
      author: "Jason Lin",
      location: "Taipei",
    },
    {
      quote: "Luxe Staycations made my trip to Bangkok so easy to plan. I loved the variety of villa options and the honest reviews. Everything was transparent and well-organized. Highly recommended for anyone looking for trustworthy villa deals.",
      author: "Emma Rachel",
      location: "New York",
    },
    {
      quote: "I was worried about last-minute booking for my Dubai trip, but Luxe Staycations came through with great offers and instant booking. The customer support was also excellent, answering all my queries patiently. Five stars from me!",
      author: "Priya Mehta",
      location: "Mumbai",
    },
    {
      quote: "Our family trip to Sydney was a success, thanks to Luxe Staycations. The villa options were child-friendly, affordable, and in the best locations. Booking took less than five minutes, and everything confirmed right away.",
      author: "David Anderson",
      location: "New York",
    },
    {
      quote: "I love that Luxe Staycations shares genuine reviews. It really helped me make the right decision for my stay in Rome. The villa matched exactly what was shown – no hidden surprises. Clean, quiet, and absolutely perfect for solo travel.",
      author: "Hugo Fischer",
      location: "Zurich",
    },
    {
      quote: "I've used Luxe Staycations three times now – London, Bangkok, and Dubai – and each time has been fantastic. The platform is reliable, visually clean, and always offers something new. I feel confident booking with them every time.",
      author: "Amara Johnson",
      location: "Cape Town",
    },
  ];

  const faqs = [
    {
      question: "How Do I Book a Villa on Luxe Staycations?",
      answer: "Booking is simple! Choose your destination, dates, and guests, then browse available villas. Click 'Book Now' and complete your payment to receive instant confirmation.",
    },
    {
      question: "Can I Cancel or Modify My Booking?",
      answer: "Yes! Cancellation and modification policies vary by villa. Check the villa's terms before booking, or contact our support team for assistance.",
    },
    {
      question: "Do I Need to Create an Account to Book a Villa?",
      answer: "No, you can book as a guest. However, creating an account allows you to manage bookings, save preferences, and access exclusive deals.",
    },
    {
      question: "What Payment Methods Do You Accept?",
      answer: "We accept all major credit cards, debit cards, and digital wallets. All payments are secure and encrypted for your safety.",
    },
    {
      question: "Are There Any Hidden Fees?",
      answer: "No hidden fees! The price you see is the price you pay. We're transparent about all costs upfront.",
    },
    {
      question: "How Do I Find the Best Villa Deals?",
      answer: "Use our search filters, check our special offers page, and sign up for our newsletter to receive exclusive deals and discounts.",
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
            <span>About Us</span>
          </div>
          <h1 className="display max-w-3xl text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight">
            Who We Are
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-4xl">
            Whether You're Planning a Luxurious Getaway, a Business Trip, or a Budget-friendly Adventure, We Connect You With the Best Villas at Unbeatable Prices.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm opacity-70">//Our Values</p>
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {values.map((value, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#5a3d35] mb-2">
                {value.number}
              </div>
              <div className="text-sm text-black/70">{value.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#fafafa] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm opacity-70">//Why Choose Luxe Staycations?</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">Your Stay, Our Priority</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#5a3d35] text-white flex items-center justify-center text-lg font-bold">
                    {feature.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-black/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm opacity-70">//Testimonials</p>
        <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">Trusted by Travelers Worldwide</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <blockquote key={i} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-black/80 mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5a3d35] flex items-center justify-center text-white font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-black/60">{testimonial.location}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fafafa] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm opacity-70">//FAQ</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              {faqs.slice(0, 3).map((faq, i) => (
                <div key={i} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-sm text-black/70">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {faqs.slice(3).map((faq, i) => (
                <div key={i} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-sm text-black/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
