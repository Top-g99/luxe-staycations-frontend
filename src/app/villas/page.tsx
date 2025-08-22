'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePropertySearch } from '@/hooks/useApi';
import { Property, PropertySearchParams } from '@/lib/api';

export default function VillasPage() {
  const [searchParams, setSearchParams] = useState<PropertySearchParams>({
    page: 1,
    limit: 12,
  });
  
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    amenities: [] as string[],
    verified: false,
    sortBy: 'created_at' as 'price' | 'rating' | 'created_at',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  const { 
    data: propertiesResponse, 
    loading, 
    error, 
    execute: searchProperties 
  } = usePropertySearch();

  // Fetch properties when search params change
  useEffect(() => {
    const params = { ...searchParams, ...filters };
    // Remove empty values
    Object.keys(params).forEach(key => {
      if (params[key as keyof typeof params] === '' || 
          (Array.isArray(params[key as keyof typeof params]) && params[key as keyof typeof params].length === 0)) {
        delete params[key as keyof typeof params];
      }
    });
    searchProperties(params);
  }, [searchParams, filters, searchProperties]);

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSearchParams(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => ({ ...prev, page: 1 }));
  };

  const properties = propertiesResponse?.data || [];
  const pagination = propertiesResponse?.pagination;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Discover Amazing Villas</h1>
          <p className="mt-2 text-lg text-gray-600">
            Find your perfect getaway from our curated collection of luxury villas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              <form onSubmit={handleSearch} className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    {['WiFi', 'Pool', 'Kitchen', 'Parking', 'Air Conditioning', 'Garden'].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange('amenities', [...filters.amenities, amenity]);
                            } else {
                              handleFilterChange('amenities', filters.amenities.filter(a => a !== amenity));
                            }
                          }}
                          className="h-4 w-4 text-[#5a3d35] focus:ring-[#5a3d35] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Verified Only */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.verified}
                      onChange={(e) => handleFilterChange('verified', e.target.checked)}
                      className="h-4 w-4 text-[#5a3d35] focus:ring-[#5a3d35] border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Verified Properties Only</span>
                  </label>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  >
                    <option value="created_at">Newest First</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a3d35] focus:border-transparent"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full bg-[#5a3d35] text-white py-2 px-4 rounded-md hover:bg-[#4a332c] transition-colors"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {loading ? 'Loading...' : `${properties.length} Properties Found`}
                </h2>
                {filters.location && (
                  <p className="text-gray-600">in {filters.location}</p>
                )}
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">Error loading properties: {error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Properties Grid */}
            {!loading && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property: Property) => (
                  <Link key={property.id} href={`/villas/${property.id}`} className="block">
                    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
                      {/* Property Image */}
                      <div className="relative">
                        <div
                          className="h-48 w-full bg-cover bg-center"
                          style={{ 
                            backgroundImage: property.image_urls && property.image_urls.length > 0 
                              ? `url(${property.image_urls[0]})` 
                              : 'url(https://images.unsplash.com/photo-1501117716987-c8e2a3a67a3e?q=80&w=1200&auto=format&fit=crop)'
                          }}
                        />
                        {property.is_verified && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            Verified
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                          ${property.price_per_night}/night
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 line-clamp-2">
                            {property.title}
                          </h3>
                          {property.averageRating && (
                            <div className="flex items-center gap-1 text-sm">
                              <span className="text-yellow-500">★</span>
                              <span>{property.averageRating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {property.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>{property.location}</span>
                          <span>{property.max_guests} guests</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{property.bedrooms} bedrooms</span>
                          <span>{property.bathrooms} bathrooms</span>
                        </div>

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {property.amenities.slice(0, 3).map((amenity, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                              >
                                {amenity}
                              </span>
                            ))}
                            {property.amenities.length > 3 && (
                              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                +{property.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && properties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          page === pagination.page
                            ? 'bg-[#5a3d35] text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
