import React from "react";
import Link from "next/link";

export default function PartnerWithUsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
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
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 text-center text-white">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            Earn More from Your Luxury Property
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-4xl mx-auto">
            Join a curated marketplace of India's finest stays. We handle the marketing, bookings, and support—you maximize your returns.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#5a3d35] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#4a332c] transition-colors text-lg">
              Apply Now
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/30 transition-colors text-lg backdrop-blur">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Partner With Us</span>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {/* Key Benefits */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Luxe Staycations?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another booking platform. We're your partner in success, helping you maximize your villa's potential while providing exceptional guest experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💰",
                title: "Higher Revenue",
                description: "Access to premium guests willing to pay for quality. Earn up to 40% more than traditional rental methods."
              },
              {
                icon: "📱",
                title: "Seamless Management",
                description: "All-in-one dashboard for calendars, payments, and communication. Everything you need in one place."
              },
              {
                icon: "🚀",
                title: "Zero Marketing Hassle",
                description: "We promote your property across digital channels. No need to worry about advertising or promotion."
              },
              {
                icon: "👥",
                title: "Dedicated Support",
                description: "A relationship manager to assist you. Personal support for all your needs and questions."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works - Complete Journey */}
        <section className="py-16 bg-gray-50 rounded-3xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Complete Partnership Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial discovery to ongoing success, we guide you through every step of the partnership process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Application",
                description: "Submit your initial application. Our team reviews your property and contacts you within 24 hours."
              },
              {
                step: "02",
                title: "Vetting & Onboarding",
                description: "Complete detailed profile, upload photos/videos, and undergo physical verification for 'Luxe Certified' badge."
              },
              {
                step: "03",
                title: "Training & Launch",
                description: "Sign agreement, get trained on Partner Hub, and launch your property with our marketing support."
              },
              {
                step: "04",
                title: "Ongoing Success",
                description: "Manage bookings, track performance, and grow your revenue through our comprehensive dashboard."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#5a3d35] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vetting & Onboarding Process */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Vetting & Onboarding Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our rigorous quality control ensures every property meets our premium standards and earns the coveted "Luxe Certified" badge.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "1. Initial Contact & Consultation",
                description: "A sales/partner manager calls to understand your property and explain our partnership model, including commission structure and expectations.",
                icon: "📞"
              },
              {
                title: "2. Digital Submission & Profile Creation",
                description: "Complete detailed property profile including high-resolution photos (min. 20-30), video walkthrough (1-2 mins), amenities list, and policies.",
                icon: "📱"
              },
              {
                title: "3. Physical Verification (Non-Negotiable)",
                description: "Our representative visits your property to verify quality, cleanliness, safety standards, photo accuracy, and essential amenities.",
                icon: "✅"
              },
              {
                title: "4. Agreement & Training",
                description: "Sign legal agreement covering commission, payment terms, and policies. Get trained on the Partner Hub app for seamless management.",
                icon: "📋"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-start space-x-6">
                  <div className="text-4xl">{step.icon}</div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-700 text-lg">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partner Hub Features */}
        <section className="py-16 bg-gradient-to-br from-[#5a3d35] to-[#4a332c] text-white rounded-3xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Luxe Partner Hub - Your Command Center</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A comprehensive web app designed specifically for property owners to manage every aspect of their business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-8">Dashboard Overview</h3>
              <div className="space-y-6">
                <div className="bg-white/10 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-3">Summary Widgets</h4>
                  <p className="text-white/90">Today's check-ins/check-outs, upcoming bookings, monthly revenue, and occupancy rate at a glance.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-3">Performance Analytics</h4>
                  <p className="text-white/90">Track earnings over time, compare performance against market averages, and monitor guest rating trends.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-8">Key Modules</h3>
              <div className="space-y-4">
                {[
                  "📅 Calendar & Bookings Management",
                  "🏠 Property Profile & Pricing",
                  "💰 Financial Center & Payouts",
                  "📊 Performance Analytics",
                  "💬 Guest Communication",
                  "🛠️ Support & Resources"
                ].map((module, index) => (
                  <div key={index} className="bg-white/10 p-4 rounded-xl">
                    <span className="font-medium">{module}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Management Tools</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">📅 Calendar & Bookings</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Visual, color-coded calendar (Available, Booked, Blocked, Maintenance)</li>
                  <li>• Manual date blocking and availability management</li>
                  <li>• View all bookings with guest details and special requests</li>
                  <li>• Automated messaging system for guest communication</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">🏠 Property Management</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Edit listing details, photos, and descriptions</li>
                  <li>• Dynamic pricing suggestions based on seasonality and demand</li>
                  <li>• Update amenities and house rules</li>
                  <li>• Real-time availability management</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">💰 Financial Center</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Transparent transaction records and earnings breakdown</li>
                  <li>• Commission calculations and net revenue tracking</li>
                  <li>• Payout schedule and processing dates</li>
                  <li>• Download invoices and financial reports</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">🛠️ Support & Resources</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Direct access to dedicated partner manager</li>
                  <li>• Knowledge base with optimization tips</li>
                  <li>• 24/7 guest support for major issues</li>
                  <li>• Training materials and best practices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50 rounded-3xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories from Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from property owners who have transformed their villas into successful businesses with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah & Michael Chen",
                location: "Bali, Indonesia",
                story: "Our villa income increased by 300% in just 6 months. The Partner Hub dashboard makes management effortless, and the 'Luxe Certified' badge gives guests confidence.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
                badge: "Luxe Certified"
              },
              {
                name: "David Rodriguez",
                location: "Tuscany, Italy",
                story: "Luxe Staycations helped us reach international guests we never could have accessed before. Our occupancy rate is now 95% year-round with premium pricing.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
                badge: "Luxe Certified"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${testimonial.image})` }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-[#5a3d35] font-medium">{testimonial.location}</p>
                  </div>
                  <div className="bg-[#5a3d35] text-white px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.badge}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.story}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600">
                Submit your initial application and our partnership team will contact you within 24 hours to discuss your property and our partnership model.
              </p>
            </div>

            <form className="bg-gray-50 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Mumbai, Goa, Jaipur"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  >
                    <option value="">Select Property Type</option>
                    <option value="villa">Villa</option>
                    <option value="heritage-home">Heritage Home</option>
                    <option value="boutique-stay">Boutique Stay</option>
                    <option value="luxury-apartment">Luxury Apartment</option>
                    <option value="farmhouse">Farmhouse</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Properties *</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                >
                  <option value="">Select Number</option>
                  <option value="1">1 Property</option>
                  <option value="2-5">2-5 Properties</option>
                  <option value="6-10">6-10 Properties</option>
                  <option value="10+">10+ Properties</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your property *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your property, amenities, unique features, and what makes it special. Include any special services you offer (chef, concierge, etc.)."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#5a3d35] text-white px-12 py-4 rounded-xl font-medium hover:bg-[#4a332c] transition-colors text-lg"
                >
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How much does it cost to list my property?",
                answer: "Listing your property with Luxe Staycations is completely free. We only charge a commission on successful bookings, ensuring you only pay when you earn."
              },
              {
                question: "What is the 'Luxe Certified' badge and how do I get it?",
                answer: "The 'Luxe Certified' badge is our quality assurance mark. It's earned through our rigorous vetting process including physical verification of your property, ensuring guests can trust in premium quality."
              },
              {
                question: "How long does the entire onboarding process take?",
                answer: "From initial application to live listing typically takes 7-10 days. This includes consultation, profile completion, physical verification, and training on the Partner Hub."
              },
              {
                question: "What support do you provide to property owners?",
                answer: "We provide comprehensive support including a dedicated relationship manager, 24/7 guest support, marketing assistance, and ongoing training through our Partner Hub platform."
              },
              {
                question: "Can I manage my own pricing and availability?",
                answer: "Absolutely! You have full control over your pricing and availability through the Partner Hub. We provide dynamic pricing suggestions based on market data, but the final decisions are yours."
              },
              {
                question: "How do payouts work and when do I receive them?",
                answer: "Payouts are processed monthly on the 5th of each month for all completed stays. You can track all transactions and earnings in real-time through the Financial Center in your Partner Hub."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#5a3d35] to-[#4a332c] text-white rounded-3xl px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Property into a Business?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join the elite network of Luxe Certified properties and start earning premium returns on your investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#5a3d35] px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors text-lg">
              Apply Now
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/30 transition-colors text-lg backdrop-blur">
              Schedule a Consultation
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
