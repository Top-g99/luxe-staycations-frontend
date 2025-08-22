# Luxe Command Center - Admin Dashboard

## Overview

The Luxe Command Center is a comprehensive admin dashboard for the Luxe Staycations luxury villa rental platform. It provides complete operational control and deep business intelligence needed to efficiently and profitably run the platform.

## Features

### 🏠 Dashboard Overview
- **Real-time Metrics**: Today's check-ins, check-outs, new bookings, and pending inquiries
- **Revenue Analytics**: Month-to-date revenue with trend analysis and average booking value
- **Occupancy Tracking**: Current platform-wide occupancy rate with trend visualization
- **Quick Actions**: Direct access to add properties, view support tickets, and generate reports
- **Activity Feed**: Live log of significant platform events

### 🏡 Property Management
- **Property Listings**: Complete property database with filtering and search
- **Verification System**: Review and verify new property submissions
- **Status Management**: Manage property status (Pending, Verified, Suspended, Rejected)
- **Luxe Certification**: Mark properties as Luxe Certified for premium positioning
- **Detailed Property Forms**: Comprehensive property editing with amenities and pricing

### 👥 User Management
- **Guest Management**: View guest profiles, booking history, and spending patterns
- **Host Management**: Monitor host performance, earnings, and payout balances
- **Administrator Management**: Manage admin users and role assignments
- **User Verification**: Verify user accounts and manage suspensions

### 📅 Booking & Reservation Management
- **Master Bookings Table**: Complete booking database with filtering
- **Booking Details**: Comprehensive view of individual bookings
- **Status Management**: Modify booking status and payment status
- **Refund Processing**: Handle cancellations and refunds
- **Guest Communication**: Direct messaging to guests

### 💰 Financial Center
- **Transaction Ledger**: Complete financial transaction history
- **Host Payouts**: Process and track host payouts
- **Revenue Reports**: Generate financial reports (PDF/CSV)
- **Commission Management**: Configure and track platform commissions
- **Payment Gateway Integration**: Manage Stripe and Razorpay settings

### 📊 Analytics & Reporting
- **Website Traffic**: Track users, sessions, pageviews, and bounce rates
- **Conversion Analytics**: Monitor booking conversion rates and funnel analysis
- **Marketing Performance**: Track UTM campaigns and marketing ROI
- **Property Performance**: Compare property performance metrics
- **Export Capabilities**: Download analytics data and reports

### 🎫 Support Management
- **Ticket System**: Manage customer support tickets
- **Priority Management**: Handle urgent, high, medium, and low priority tickets
- **Response Tracking**: Track response times and resolution rates
- **Ticket Assignment**: Assign tickets to appropriate team members
- **Status Updates**: Update ticket status and add responses

### ⚙️ Settings & Configuration
- **Global Site Settings**: Configure site title, contact information, and timezone
- **Payment Gateway Settings**: Manage Stripe and Razorpay API keys
- **Email Templates**: Create and manage transactional email templates
- **Content Management**: Manage static pages (About Us, Terms, Privacy Policy)
- **Commission Settings**: Configure platform commission percentages

## Technology Stack

- **Frontend**: React.js with Next.js 15
- **UI Framework**: Material-UI (MUI) with custom theme
- **Charts**: Recharts for data visualization
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with role-based access control
- **Payment Processing**: Stripe and Razorpay integration

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- NextAuth.js configuration
- Stripe/Razorpay API keys

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

3. **Environment Variables**
   Create a `.env.local` file with:
   ```
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret"
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   RAZORPAY_KEY_ID="rzp_test_..."
   RAZORPAY_KEY_SECRET="..."
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Access Control

### Role-Based Access
- **ADMIN**: Full access to all dashboard features
- **SUPER_ADMIN**: Additional system-level configurations
- **HOST**: Limited access to property management
- **CUSTOMER**: No admin access

### Security Features
- Session-based authentication
- Role validation on all API endpoints
- CSRF protection
- Input validation and sanitization

## API Endpoints

### Dashboard Statistics
```
GET /api/admin/dashboard
```
Returns real-time dashboard metrics and statistics.

### Properties
```
GET /api/admin/properties
POST /api/admin/properties
PUT /api/admin/properties/:id
DELETE /api/admin/properties/:id
```

### Users
```
GET /api/admin/users
POST /api/admin/users
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
```

### Bookings
```
GET /api/admin/bookings
PUT /api/admin/bookings/:id
POST /api/admin/bookings/:id/refund
```

### Finance
```
GET /api/admin/finance/transactions
GET /api/admin/finance/payouts
POST /api/admin/finance/payouts/:id/process
```

### Support
```
GET /api/admin/support/tickets
PUT /api/admin/support/tickets/:id
POST /api/admin/support/tickets/:id/reply
```

## Database Schema

The admin dashboard uses the following key models:

- **User**: Users with role-based access
- **Villa**: Property listings with status management
- **Booking**: Reservation data with payment tracking
- **Transaction**: Financial transaction records
- **SupportTicket**: Customer support tickets
- **AdminAction**: Audit trail of admin actions
- **SiteSettings**: Global configuration settings

## Customization

### Theme Customization
The dashboard uses a custom Material-UI theme defined in `AdminThemeProvider.tsx`. You can customize:
- Color palette
- Typography
- Component styling
- Layout spacing

### Adding New Features
1. Create new page components in `src/app/admin/`
2. Add API routes in `src/app/api/admin/`
3. Update database schema if needed
4. Add navigation links in the admin layout

## Performance Optimization

- **Lazy Loading**: Components load on demand
- **Pagination**: Large datasets are paginated
- **Caching**: API responses are cached where appropriate
- **Optimized Queries**: Database queries are optimized for performance

## Monitoring & Analytics

### Built-in Analytics
- User activity tracking
- Performance metrics
- Error monitoring
- Usage statistics

### Integration Options
- Google Analytics
- Sentry for error tracking
- Custom analytics platforms

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Considerations
- Use production database
- Configure proper CORS settings
- Set up SSL certificates
- Configure CDN for static assets

## Support & Maintenance

### Regular Maintenance
- Database backups
- Security updates
- Performance monitoring
- User feedback collection

### Troubleshooting
- Check server logs for errors
- Verify database connectivity
- Test API endpoints
- Monitor authentication flow

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for Luxe Staycations.

---

For technical support or questions, please contact the development team.
