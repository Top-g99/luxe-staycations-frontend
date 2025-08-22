'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePropertyById, useReviews } from '@/hooks/useApi';
import { Property, Review } from '@/lib/api';

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guestCount: 1,
    specialRequests: ''
  });

  // Fetch property details
  const { 
    data: propertyResponse, 
    loading: propertyLoading, 
    error: propertyError,
    execute: getProperty 
  } = usePropertyById();

  // Fetch property reviews
  const { 
    data: reviewsResponse, 
    loading: reviewsLoading, 
    error: reviewsError,
    execute: getReviews 
  } = useReviews();

  // Fetch data on component mount
  useEffect(() => {
    if (propertyId) {
      getProperty(propertyId);
      getReviews(propertyId);
    }
  }, [propertyId, getProperty, getReviews]);

  const property = propertyResponse?.data;
  const reviews = reviewsResponse?.data || [];

  // Calculate total price for booking
  const calculateTotalPrice = () => {
    if (!property || !bookingData.checkInDate || !bookingData.checkOutDate) return 0;
    
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return (property.price_per_night * nights) + property.cleaning_fee;
  };

  // Handle booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking logic
    console.log('Booking submitted:', { propertyId, ...bookingData, totalPrice: calculateTotalPrice() });
  };

  if (propertyLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#5a3d35] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (propertyError || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <p className="text-gray-600">
            {propertyError || 'The property you are looking for does not exist.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-lg text-gray-600 mt-1">{property.location}</p>
              {property.averageRating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(property.averageRating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {property.averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#5a3d35]">
                ${property.price_per_night}
              </div>
              <div className="text-gray-600">per night</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <img
                  src={property.image_urls && property.image_urls.length > 0 
                    ? property.image_urls[selectedImage] 
                    : 'https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop'
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.is_verified && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Verified Property
                  </div>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {property.image_urls && property.image_urls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {property.image_urls.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === selectedImage ? 'border-[#5a3d35]' : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-700 mb-6">{property.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5a3d35]">{property.bedrooms}</div>
                  <div className="text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5a3d35]">{property.bathrooms}</div>
                  <div className="text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5a3d35]">{property.max_guests}</div>
                  <div className="text-gray-600">Guests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5a3d35]">{property.category}</div>
                  <div className="text-gray-600">Type</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#5a3d35] rounded-full"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
              
              {reviewsLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5a3d35] mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading reviews...</p>
                </div>
              )}
              
              {reviewsError && (
                <div className="text-center py-8">
                  <p className="text-red-600">Error loading reviews: {reviewsError}</p>
                </div>
              )}
              
              {!reviewsLoading && reviews.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review this property!</p>
                </div>
              )}
              
              {!reviewsLoading && reviews.length > 0 && (
                <div className="space-y-6">
                  {reviews.map((review: Review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {review.bookings?.profiles?.first_name} {review.bookings?.profiles?.last_name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book this property</h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingData.checkInDate}
                    onChange={(e) => setBookingData(prev => ({ ...prev, checkInDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingData.checkOutDate}
                    onChange={(e) => setBookingData(prev => ({ ...prev, checkOutDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={bookingData.guestCount}
                    onChange={(e) => setBookingData(prev => ({ ...prev, guestCount: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  >
                    {[...Array(property.max_guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    rows={3}
                    placeholder="Any special requirements..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>

                {/* Price Breakdown */}
                {bookingData.checkInDate && bookingData.checkOutDate && (
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Price per night</span>
                      <span>${property.price_per_night}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cleaning fee</span>
                      <span>${property.cleaning_fee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Security deposit</span>
                      <span>${property.security_deposit}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${calculateTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <button
                  type="submit"
                  disabled={!bookingData.checkInDate || !bookingData.checkOutDate}
                  className="w-full bg-[#5a3d35] text-white py-3 px-4 rounded-md font-medium hover:bg-[#4a332c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Now
                </button>
              </form>

              {/* Property Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Property ID:</span>
                    <span className="font-mono">{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Host ID:</span>
                    <span className="font-mono">{property.host_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`capitalize ${
                      property.status === 'active' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Listed:</span>
                    <span>{new Date(property.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
