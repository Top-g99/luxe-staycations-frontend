import React from "react";
import Link from "next/link";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Smart Tips for Booking Villas Online Safely",
      author: "James Mitchell",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      category: "Travel Tips",
      featured: true
    },
    {
      id: 2,
      title: "Best Budget-Friendly Villas in Top Tourist Destinations",
      author: "Emily Carter",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      category: "Budget Travel"
    },
    {
      id: 3,
      title: "Guide to Booking the Perfect Villa Online",
      author: "James Mitchell",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      category: "Booking Guide"
    },
    {
      id: 4,
      title: "Solo Travel? Here's How to Pick the Safest & Best Villas",
      author: "Rachel Sara",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
      category: "Solo Travel"
    },
    {
      id: 5,
      title: "The Best Beach Destinations for a Relaxing Getaway",
      author: "Rachel Sara",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      category: "Beach Destinations"
    },
    {
      id: 6,
      title: "The Ultimate Packing Guide for a Stress-Free Stay",
      author: "James Mitchell",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
      category: "Packing Guide"
    },
    {
      id: 7,
      title: "How to Find the Best Villas for Safety & Comfort",
      author: "Emily Carter",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200&auto=format&fit=crop",
      category: "Safety & Comfort"
    },
    {
      id: 8,
      title: "Last-Minute Villa Booking Tips to Save Money",
      author: "Rachel Sara",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop",
      category: "Money Saving"
    },
    {
      id: 9,
      title: "Best Villas with Private Pools & Stunning Views",
      author: "James Mitchell",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      category: "Luxury Villas"
    },
    {
      id: 10,
      title: "The Best Villas for Adventure Seekers & Thrill Lovers",
      author: "James Mitchell",
      date: "11/5/2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
      category: "Adventure Travel"
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
            The Luxe Blog
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-3xl mx-auto">
            Discover travel insights, villa booking tips, and destination guides to make your next stay extraordinary.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Blog</span>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {/* Feature Blog */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Feature Blog</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-2xl">
                <div
                  className="h-80 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${featuredPost.image})` }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                  <span>By {featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Discover essential tips and strategies for booking villas safely online. Learn how to avoid scams, find the best deals, and ensure a secure booking experience for your next vacation.
                </p>
                <button className="bg-[#5a3d35] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4a332c] transition-colors self-start">
                  Read More
                </button>
              </div>
            </div>
          </section>
        )}

        {/* All Blog Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <div
                    className="h-48 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    Discover essential insights and practical tips for your next villa stay. From booking strategies to travel preparation, we've got you covered.
                  </p>
                  <button className="text-[#5a3d35] font-medium hover:text-[#4a332c] transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Travel Insights
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest villa booking tips, destination guides, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
            />
            <button className="bg-[#5a3d35] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4a332c] transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

