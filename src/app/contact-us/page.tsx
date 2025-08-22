import React from "react";
import Link from "next/link";

export default function ContactUsPage() {
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
            Get in Touch With Us
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-3xl mx-auto">
            Have questions about our villas or need assistance with your booking? We're here to help you plan your perfect stay.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Contact Us</span>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Fill the Form Below</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                >
                  <option value="">Select a destination</option>
                  <option value="dubai">Dubai</option>
                  <option value="maldives">Maldives</option>
                  <option value="singapore">Singapore</option>
                  <option value="bali">Bali</option>
                  <option value="thailand">Thailand</option>
                  <option value="goa">Goa</option>
                  <option value="manali">Manali</option>
                  <option value="udaipur">Udaipur</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  placeholder="Tell us about your inquiry, travel plans, or any questions you have..."
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  id="privacy-policy"
                  type="checkbox"
                  required
                  className="h-4 w-4 mt-1 text-[#5a3d35] focus:ring-[#5a3d35] border-gray-300 rounded"
                />
                <label htmlFor="privacy-policy" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link href="#" className="text-[#5a3d35] hover:text-[#4a332c] underline">
                    privacy policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5a3d35] text-white py-4 rounded-xl font-medium hover:bg-[#4a332c] transition-colors text-lg"
              >
                Send Message
              </button>
            </form>

            {/* Success/Error Messages */}
            <div className="mt-6 space-y-3">
              <div className="hidden bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                Thank you! Your submission has been received!
              </div>
              <div className="hidden bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                Oops! Something went wrong while submitting the form.
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                Reach out to us through any of these channels. Our team is here to assist you with all your villa booking needs and travel inquiries.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#5a3d35] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h4>
                  <p className="text-gray-700">
                    20/B, Central House Tower<br />
                    New York, United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#5a3d35] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone Number</h4>
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <a href="tel:+1-212-456-7890" className="hover:text-[#5a3d35] transition-colors">
                        +1-212-456-7890
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <a href="tel:+1-212-456-5010" className="hover:text-[#5a3d35] transition-colors">
                        +1-212-456-5010
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#5a3d35] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Address</h4>
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <a href="mailto:luxe@info.com" className="hover:text-[#5a3d35] transition-colors">
                        luxe@info.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <a href="mailto:example@luxe.com" className="hover:text-[#5a3d35] transition-colors">
                        example@luxe.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Hours</h4>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p><span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM</p>
                <p><span className="font-medium">Sunday:</span> Closed</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                For urgent inquiries outside business hours, please email us and we'll respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

