import { useState, useCallback } from 'react';
import { Property, PropertySearchParams, PropertySearchResponse, Booking, Review, User, Coupon } from '@/lib/api';

// Base API state interface
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Properties hooks
export function useProperties() {
  const [state, setState] = useState<ApiState<PropertySearchResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  const getProperties = useCallback(async (params: PropertySearchParams = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { propertiesApi } = await import('@/lib/api');
      const response = await propertiesApi.getProperties(params);
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch properties';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    getProperties,
    reset,
  };
}

export function usePropertySearch() {
  const [state, setState] = useState<ApiState<PropertySearchResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  const searchProperties = useCallback(async (params: PropertySearchParams = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { propertiesApi } = await import('@/lib/api');
      const response = await propertiesApi.searchProperties(params);
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search properties';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    searchProperties,
    reset,
  };
}

export function usePropertyById() {
  const [state, setState] = useState<ApiState<Property>>({
    data: null,
    loading: false,
    error: null,
  });

  const getPropertyById = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { propertiesApi } = await import('@/lib/api');
      const response = await propertiesApi.getPropertyById(id);
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch property';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    getPropertyById,
    reset,
  };
}

// Bookings hooks
export function useBookings() {
  const [state, setState] = useState<ApiState<Booking[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const getUserBookings = useCallback(async (params: { page?: number; limit?: number; status?: string } = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { bookingsApi } = await import('@/lib/api');
      const response = await bookingsApi.getUserBookings(params);
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch bookings';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    getUserBookings,
    reset,
  };
}

// Reviews hooks
export function useReviews() {
  const [state, setState] = useState<ApiState<Review[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const getPropertyReviews = useCallback(async (propertyId: string, params: { page?: number; limit?: number } = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { reviewsApi } = await import('@/lib/api');
      const response = await reviewsApi.getPropertyReviews(propertyId, params);
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch reviews';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    getPropertyReviews,
    reset,
  };
}

// User profile hooks
export function useUserProfile() {
  const [state, setState] = useState<ApiState<User>>({
    data: null,
    loading: false,
    error: null,
  });

  const getProfile = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { usersApi } = await import('@/lib/api');
      const response = await usersApi.getProfile();
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    getProfile,
    reset,
  };
}

// Coupons hooks
export function useCoupons() {
  const [state, setState] = useState<ApiState<Coupon[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const getCoupons = useCallback(async (params: { page?: number; limit?: number } = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { couponsApi } = await import('@/lib/api');
      const response = await couponsApi.getCoupons(params);
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch coupons';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    getCoupons,
    reset,
  };
}
