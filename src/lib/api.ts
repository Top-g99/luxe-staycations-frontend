// API service layer for Luxe Staycations
// This service handles all communication with the backend API

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  cleaning_fee: number;
  security_deposit: number;
  amenities: string[];
  image_urls: string[];
  category: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  is_verified: boolean;
  status: 'active' | 'inactive';
  host_id: string;
  created_at: string;
  updated_at: string;
  averageRating?: number;
  reviewCount?: number;
}

export interface PropertySearchParams {
  page?: number;
  limit?: number;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  verified?: boolean;
  sortBy?: 'price' | 'rating' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export interface PropertySearchResponse {
  success: boolean;
  data: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  search?: {
    query?: string;
    filters: Record<string, unknown>;
    sortBy?: string;
    sortOrder?: string;
  };
}

export interface Booking {
  id: string;
  property_id: string;
  guest_id: string;
  check_in_date: string;
  check_out_date: string;
  guest_count: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  special_requests?: string;
  created_at: string;
  updated_at: string;
  properties?: Property;
}

export interface CreateBookingRequest {
  propertyId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  specialRequests?: string;
}

export interface Review {
  id: string;
  booking_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  bookings?: {
    properties?: {
      id: string;
      title: string;
      location: string;
    };
    profiles?: {
      first_name: string;
      last_name: string;
      avatar_url?: string;
    };
  };
}

export interface CreateReviewRequest {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface User {
  id: string;
  email: string;
  role: 'guest' | 'host' | 'admin';
  isVerified: boolean;
  isSuspended: boolean;
  createdAt: string;
  profiles?: {
    first_name: string;
    last_name: string;
    phone?: string;
    avatar_url?: string;
  };
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  couponType: 'percentage' | 'fixed';
  discountValue: number;
  scope: string;
  validFrom: string;
  validUntil: string;
  maxUses?: number;
  maxUsesPerUser: number;
  minBookingValue?: number;
  applicableVillas?: string[];
  isActive: boolean;
  totalUses: number;
  totalDiscount: number;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  details?: Record<string, unknown>;
}

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://luxe-staycations-api.onrender.com';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Helper function to make API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);
    return await handleResponse<T>(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  // In a real app, you'd get this from your auth context
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  if (token) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  
  return {
    'Content-Type': 'application/json',
  };
}

// Properties API
export const propertiesApi = {
  // Get all properties with optional filtering
  async getProperties(params: PropertySearchParams = {}): Promise<ApiResponse<PropertySearchResponse>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/properties?${queryString}` : '/properties';
    
    return apiRequest<PropertySearchResponse>(endpoint);
  },

  // Search properties with advanced filters
  async searchProperties(params: PropertySearchParams = {}): Promise<ApiResponse<PropertySearchResponse>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/properties/search?${queryString}` : '/properties/search';
    
    return apiRequest<PropertySearchResponse>(endpoint);
  },

  // Get a single property by ID
  async getPropertyById(id: string): Promise<ApiResponse<Property>> {
    return apiRequest<Property>(`/properties/${id}`);
  },

  // Get available amenities
  async getAmenities(): Promise<ApiResponse<string[]>> {
    return apiRequest<string[]>('/properties/search/amenities');
  },

  // Get available locations
  async getLocations(): Promise<ApiResponse<string[]>> {
    return apiRequest<string[]>('/properties/search/locations');
  },

  // Get available categories
  async getCategories(): Promise<ApiResponse<string[]>> {
    return apiRequest<string[]>('/properties/search/categories');
  },
};

// Bookings API
export const bookingsApi = {
  // Get user's bookings
  async getUserBookings(params: { page?: number; limit?: number; status?: string } = {}): Promise<ApiResponse<Booking[]>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/bookings?${queryString}` : '/bookings';
    
    return apiRequest<Booking[]>(endpoint, {
      headers: getAuthHeaders(),
    });
  },

  // Create a new booking
  async createBooking(bookingData: CreateBookingRequest): Promise<ApiResponse<Booking>> {
    return apiRequest<Booking>('/bookings', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });
  },

  // Update booking status
  async updateBookingStatus(bookingId: string, status: string): Promise<ApiResponse<Booking>> {
    return apiRequest<Booking>(`/bookings/${bookingId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
  },
};

// Reviews API
export const reviewsApi = {
  // Get reviews for a property
  async getPropertyReviews(propertyId: string, params: { page?: number; limit?: number } = {}): Promise<ApiResponse<Review[]>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/reviews/property/${propertyId}?${queryString}` : `/reviews/property/${propertyId}`;
    
    return apiRequest<Review[]>(endpoint);
  },

  // Create a new review
  async createReview(reviewData: CreateReviewRequest): Promise<ApiResponse<Review>> {
    return apiRequest<Review>('/reviews', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
  },

  // Update a review
  async updateReview(reviewId: string, data: Partial<CreateReviewRequest>): Promise<ApiResponse<Review>> {
    return apiRequest<Review>(`/reviews/${reviewId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },

  // Delete a review
  async deleteReview(reviewId: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest<{ message: string }>(`/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },

  // Get review statistics
  async getReviewStats(): Promise<ApiResponse<{
    totalReviews: number;
    averageRating: number;
    ratingDistribution: Record<string, number>;
  }>> {
    return apiRequest('/reviews/stats');
  },
};

// Users API
export const usersApi = {
  // Get current user's profile
  async getProfile(): Promise<ApiResponse<User>> {
    return apiRequest<User>('/users/profile', {
      headers: getAuthHeaders(),
    });
  },

  // Update user profile
  async updateProfile(data: Partial<User['profiles']>): Promise<ApiResponse<User>> {
    return apiRequest<User>('/users/profile', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },

  // Get user's bookings
  async getUserBookings(params: { page?: number; limit?: number } = {}): Promise<ApiResponse<Booking[]>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/users/bookings?${queryString}` : '/users/bookings';
    
    return apiRequest<Booking[]>(endpoint, {
      headers: getAuthHeaders(),
    });
  },

  // Get user's loyalty information
  async getLoyaltyInfo(): Promise<ApiResponse<{
    totalJewels: number;
    recentTransactions: any[];
    loyaltyTier: string;
  }>> {
    return apiRequest('/users/loyalty', {
      headers: getAuthHeaders(),
    });
  },

  // Get user's reviews
  async getUserReviews(params: { page?: number; limit?: number } = {}): Promise<ApiResponse<Review[]>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/users/reviews?${queryString}` : '/users/reviews';
    
    return apiRequest<Review[]>(endpoint, {
      headers: getAuthHeaders(),
    });
  },
};

// Coupons API
export const couponsApi = {
  // Get all active coupons
  async getCoupons(params: { page?: number; limit?: number } = {}): Promise<ApiResponse<Coupon[]>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/coupons?${queryString}` : '/coupons';
    
    return apiRequest<Coupon[]>(endpoint);
  },

  // Get coupon by code
  async getCouponByCode(code: string): Promise<ApiResponse<Coupon>> {
    return apiRequest<Coupon>(`/coupons/${code}`);
  },

  // Apply coupon to booking
  async applyCoupon(code: string, bookingId: string): Promise<ApiResponse<{
    coupon: Partial<Coupon>;
    discountApplied: number;
    newTotal: number;
    savings: string;
  }>> {
    return apiRequest('/coupons/apply', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ code, bookingId }),
    });
  },
};

// Health check API
export const healthApi = {
  // Check API health
  async checkHealth(): Promise<ApiResponse<{
    status: string;
    timestamp: string;
    service: string;
    version: string;
  }>> {
    return apiRequest('/health');
  },
};

// Export all APIs
export const api = {
  properties: propertiesApi,
  bookings: bookingsApi,
  reviews: reviewsApi,
  users: usersApi,
  coupons: couponsApi,
  health: healthApi,
};

export default api;
