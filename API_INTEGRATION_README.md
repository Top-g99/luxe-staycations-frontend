# 🚀 Frontend-Backend API Integration Guide

## 📋 Overview

Your Luxe Staycations React frontend is now fully connected to the Node.js/Express backend API! This guide explains how the integration works and how to use it.

## 🔗 API Connection

### Base URL Configuration
The frontend connects to your backend API through the `NEXT_PUBLIC_API_URL` environment variable:

```bash
# In your .env.local file
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**For different environments:**
- **Development**: `http://localhost:3001/api`
- **Production**: `https://your-backend.railway.app/api`
- **Staging**: `https://your-backend-staging.railway.app/api`

## 🏗️ Architecture

### 1. **API Service Layer** (`src/lib/api.ts`)
- **Centralized API communication**
- **Type-safe interfaces** for all data models
- **Error handling** and response formatting
- **Authentication headers** management

### 2. **Custom Hooks** (`src/hooks/useApi.ts`)
- **State management** for API calls
- **Loading states** and error handling
- **Specialized hooks** for different API endpoints
- **Automatic re-fetching** and caching

### 3. **React Components**
- **Real-time data** from backend
- **Interactive forms** with API submission
- **Dynamic content** based on API responses

## 📡 Available API Endpoints

### Properties
```typescript
// Get all properties with filtering
const { data, loading, error, execute: getProperties } = useProperties();
await getProperties({ limit: 10, verified: true });

// Search properties
const { data, loading, error, execute: searchProperties } = usePropertySearch();
await searchProperties({ location: 'Thailand', minPrice: 100 });

// Get single property
const { data, loading, error, execute: getPropertyById } = usePropertyById();
await getPropertyById('property-id-here');
```

### Bookings
```typescript
// Get user bookings
const { data, loading, error, execute: getUserBookings } = useBookings();
await getUserBookings({ status: 'confirmed' });

// Create booking
const { execute: createBooking, loading: createLoading } = useBookings();
await createBooking({
  propertyId: 'property-id',
  checkInDate: '2024-01-15',
  checkOutDate: '2024-01-20',
  guestCount: 2
});
```

### Reviews
```typescript
// Get property reviews
const { data, loading, error, execute: getPropertyReviews } = useReviews();
await getPropertyReviews('property-id');

// Create review
const { execute: createReview, loading: createLoading } = useReviews();
await createReview({
  bookingId: 'booking-id',
  rating: 5,
  comment: 'Amazing stay!'
});
```

### Users
```typescript
// Get user profile
const { data, loading, error, execute: getProfile } = useUserProfile();
await getProfile();

// Update profile
const { execute: updateProfile, loading: updateLoading } = useUserProfile();
await updateProfile({ first_name: 'John', last_name: 'Doe' });
```

### Coupons
```typescript
// Get available coupons
const { data, loading, error, execute: getCoupons } = useCoupons();
await getCoupons();

// Apply coupon
const { execute: applyCoupon, loading: applyLoading } = useCoupons();
await applyCoupon('SAVE20', 'booking-id');
```

## 🎯 How to Use

### 1. **Import the Hook**
```typescript
import { useProperties, usePropertySearch } from '@/hooks/useApi';
```

### 2. **Use in Component**
```typescript
function MyComponent() {
  const { 
    data: properties, 
    loading, 
    error, 
    execute: getProperties 
  } = useProperties();

  useEffect(() => {
    getProperties({ limit: 10 });
  }, [getProperties]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {properties?.data?.map(property => (
        <div key={property.id}>{property.title}</div>
      ))}
    </div>
  );
}
```

### 3. **Handle Form Submissions**
```typescript
function BookingForm() {
  const { execute: createBooking, loading } = useBookings();
  
  const handleSubmit = async (formData) => {
    try {
      const result = await createBooking(formData);
      if (result.success) {
        // Handle success
        console.log('Booking created:', result.data);
      }
    } catch (error) {
      // Handle error
      console.error('Booking failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Book Now'}
      </button>
    </form>
  );
}
```

## 🔐 Authentication

### JWT Token Management
The API service automatically handles authentication headers:

```typescript
// Token is stored in localStorage
localStorage.setItem('authToken', 'your-jwt-token');

// API service automatically includes it in requests
const headers = getAuthHeaders();
// Returns: { 'Authorization': 'Bearer your-jwt-token', 'Content-Type': 'application/json' }
```

### Protected Routes
For protected endpoints, ensure the user is authenticated:

```typescript
// Check if user is logged in
const token = localStorage.getItem('authToken');
if (!token) {
  // Redirect to login or show auth required message
  return <div>Please log in to continue</div>;
}
```

## 📱 Updated Pages

### 1. **Home Page** (`src/app/page.tsx`)
- ✅ **Real-time property data** from API
- ✅ **Search functionality** with backend integration
- ✅ **Loading states** and error handling
- ✅ **Dynamic content** based on API responses

### 2. **Properties Listing** (`src/app/villas/page.tsx`)
- ✅ **Advanced filtering** with backend search
- ✅ **Pagination** support
- ✅ **Real-time results** from API
- ✅ **Sorting options** (price, rating, date)

### 3. **Property Detail** (`src/app/villas/[id]/page.tsx`)
- ✅ **Property information** from API
- ✅ **Reviews and ratings** integration
- ✅ **Booking form** with price calculation
- ✅ **Image gallery** with property photos

## 🚀 Getting Started

### 1. **Set Environment Variables**
```bash
# Copy the example file
cp env.example .env.local

# Edit with your API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. **Start Your Backend**
```bash
cd luxe-api
./deployment/scripts/deploy.sh -t docker -e development
```

### 3. **Start Your Frontend**
```bash
cd luxe
npm run dev
```

### 4. **Test the Integration**
- Visit `http://localhost:3000`
- Check the browser console for API calls
- Verify properties are loading from your backend
- Test search and filtering functionality

## 🔍 Debugging

### Check API Calls
Open browser DevTools → Network tab to see:
- API requests being made
- Response status codes
- Response data structure

### Console Logging
The API service logs all requests and errors:
```typescript
// Check browser console for:
// "API request failed:" messages
// Request/response details
```

### Environment Variables
Verify your API URL is correct:
```typescript
// In browser console
console.log(process.env.NEXT_PUBLIC_API_URL);
// Should show your backend URL
```

## 🎨 Customization

### Add New API Endpoints
1. **Extend the API service** in `src/lib/api.ts`
2. **Create new hooks** in `src/hooks/useApi.ts`
3. **Use in components** with the same pattern

### Modify Data Models
Update interfaces in `src/lib/api.ts` to match your backend schema:
```typescript
export interface Property {
  // Add new fields here
  newField?: string;
}
```

### Custom Error Handling
Override error handling in your components:
```typescript
const { execute, error } = useProperties({
  onError: (error) => {
    // Custom error handling
    showNotification(error, 'error');
  }
});
```

## 📊 Performance Features

### Automatic Caching
- **API responses** are cached in component state
- **Re-fetching** only when parameters change
- **Loading states** prevent duplicate requests

### Optimized Requests
- **Debounced search** to reduce API calls
- **Pagination** for large datasets
- **Lazy loading** for images and content

### Error Recovery
- **Automatic retries** for failed requests
- **Fallback content** when API is unavailable
- **User-friendly error messages**

## 🔒 Security Features

### Input Validation
- **Zod schemas** validate all API inputs
- **Type safety** prevents invalid data
- **Sanitization** of user inputs

### Authentication
- **JWT tokens** for secure API access
- **Automatic token refresh** (when implemented)
- **Protected route handling**

## 🚨 Troubleshooting

### Common Issues

#### 1. **API Not Responding**
```bash
# Check if backend is running
curl http://localhost:3001/health

# Verify environment variable
echo $NEXT_PUBLIC_API_URL
```

#### 2. **CORS Errors**
Ensure your backend allows requests from your frontend domain:
```typescript
// In backend CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com']
}));
```

#### 3. **Authentication Errors**
Check if JWT token is valid and not expired:
```typescript
// In browser console
console.log(localStorage.getItem('authToken'));
```

#### 4. **Data Not Loading**
Verify API endpoint is correct and returning expected data:
```typescript
// Test API directly
fetch('http://localhost:3001/api/properties')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Debug Commands
```bash
# Check backend status
cd luxe-api
./deployment/scripts/deploy.sh -t docker -e development

# Check frontend environment
cd luxe
cat .env.local

# Test API connectivity
curl -X GET "http://localhost:3001/api/health"
```

## 📚 Next Steps

### 1. **Implement User Authentication**
- Add login/signup forms
- Integrate with NextAuth.js
- Handle protected routes

### 2. **Add Real-time Features**
- WebSocket integration for live updates
- Push notifications for bookings
- Real-time chat support

### 3. **Enhance User Experience**
- Add loading skeletons
- Implement infinite scroll
- Add search suggestions

### 4. **Performance Optimization**
- Implement React Query for caching
- Add service worker for offline support
- Optimize image loading

## 🎉 Success!

Your frontend is now fully connected to your backend API! You can:

- ✅ **Browse properties** with real data
- ✅ **Search and filter** using backend capabilities
- ✅ **View property details** with dynamic content
- ✅ **Handle bookings** through API integration
- ✅ **Manage user interactions** with backend validation

The integration provides a solid foundation for building a production-ready villa booking platform. All the hard work of connecting frontend and backend is done - now you can focus on adding features and improving the user experience!

---

**Need help?** Check the backend API documentation or create an issue on GitHub.
