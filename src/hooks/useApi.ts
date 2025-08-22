import { useState, useCallback, useEffect } from 'react';

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  apiCall: (...args: any[]) => Promise<{ success: boolean; data: T; message?: string; error?: string }>,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const response = await apiCall(...args);
        
        if (response.success) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
          
          if (options.onSuccess) {
            options.onSuccess(response.data);
          }
        } else {
          const errorMessage = response.error || response.message || 'An error occurred';
          setState({
            data: null,
            loading: false,
            error: errorMessage,
          });
          
          if (options.onError) {
            options.onError(errorMessage);
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        
        if (options.onError) {
          options.onError(errorMessage);
        }
      }
    },
    [apiCall, options.onSuccess, options.onError]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
    setLoading,
  };
}

// Specialized hooks for common API patterns
export function useProperties() {
  const { execute: getProperties, ...state } = useApi(async (params = {}) => {
    const { propertiesApi } = await import('@/lib/api');
    return propertiesApi.getProperties(params);
  });

  return {
    ...state,
    getProperties,
  };
}

export function usePropertySearch() {
  const { execute: searchProperties, ...state } = useApi(async (params = {}) => {
    const { propertiesApi } = await import('@/lib/api');
    return propertiesApi.searchProperties(params);
  });

  return {
    ...state,
    searchProperties,
  };
}

export function usePropertyById() {
  const { execute: getPropertyById, ...state } = useApi(async (id: string) => {
    const { propertiesApi } = await import('@/lib/api');
    return propertiesApi.getPropertyById(id);
  });

  return {
    ...state,
    getPropertyById,
  };
}

export function useBookings() {
  const { execute: getUserBookings, ...state } = useApi(async (params = {}) => {
    const { bookingsApi } = await import('@/lib/api');
    return bookingsApi.getUserBookings(params);
  });

  const { execute: createBooking, ...createState } = useApi(async (bookingData: any) => {
    const { bookingsApi } = await import('@/lib/api');
    return bookingsApi.createBooking(bookingData);
  });

  return {
    ...state,
    getUserBookings,
    createBooking,
    createState,
  };
}

export function useReviews() {
  const { execute: getPropertyReviews, ...state } = useApi(async (propertyId: string, params = {}) => {
    const { reviewsApi } = await import('@/lib/api');
    return reviewsApi.getPropertyReviews(propertyId, params);
  });

  const { execute: createReview, ...createState } = useApi(async (reviewData: any) => {
    const { reviewsApi } = await import('@/lib/api');
    return reviewsApi.createReview(reviewData);
  });

  return {
    ...state,
    getPropertyReviews,
    createReview,
    createState,
  };
}

export function useUserProfile() {
  const { execute: getProfile, ...state } = useApi(async () => {
    const { usersApi } = await import('@/lib/api');
    return usersApi.getProfile();
  });

  const { execute: updateProfile, ...updateState } = useApi(async (profileData: any) => {
    const { usersApi } = await import('@/lib/api');
    return usersApi.updateProfile(profileData);
  });

  return {
    ...state,
    getProfile,
    updateProfile,
    updateState,
  };
}

export function useCoupons() {
  const { execute: getCoupons, ...state } = useApi(async (params = {}) => {
    const { couponsApi } = await import('@/lib/api');
    return couponsApi.getCoupons(params);
  });

  const { execute: applyCoupon, ...applyState } = useApi(async (code: string, bookingId: string) => {
    const { couponsApi } = await import('@/lib/api');
    return couponsApi.applyCoupon(code, bookingId);
  });

  return {
    ...state,
    getCoupons,
    applyCoupon,
    applyState,
  };
}

export function useHealthCheck() {
  const { execute: checkHealth, ...state } = useApi(async () => {
    const { healthApi } = await import('@/lib/api');
    return healthApi.checkHealth();
  });

  return {
    ...state,
    checkHealth,
  };
}
