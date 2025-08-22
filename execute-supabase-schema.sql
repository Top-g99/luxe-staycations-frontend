-- =====================================================
-- Luxe Staycations - Simplified PostgreSQL Schema
-- Execute this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension for better ID management
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMERATIONS
-- =====================================================

-- User roles in the system
CREATE TYPE user_role AS ENUM (
    'guest',
    'host', 
    'admin'
);

-- Property status
CREATE TYPE property_status AS ENUM (
    'active',
    'inactive'
);

-- Booking status
CREATE TYPE booking_status AS ENUM (
    'pending',
    'confirmed',
    'cancelled'
);

-- Payout status
CREATE TYPE payout_status AS ENUM (
    'pending',
    'paid'
);

-- Loyalty transaction reasons
CREATE TYPE loyalty_reason AS ENUM (
    'booking',
    'review',
    'referral'
);

-- Coupon discount types
CREATE TYPE discount_type AS ENUM (
    'percentage',
    'fixed'
);

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Users table - Core user management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profiles table - Separate from auth for flexibility
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    phone VARCHAR(20),
    
    UNIQUE(user_id)
);

-- Properties table
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    price_per_night DECIMAL(10, 2) NOT NULL,
    cleaning_fee DECIMAL(10, 2) DEFAULT 0,
    security_deposit DECIMAL(10, 2) DEFAULT 0,
    amenities TEXT[],
    image_urls TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    status property_status DEFAULT 'active',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status booking_status DEFAULT 'pending',
    stripe_payment_intent_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Host Payouts table
CREATE TABLE host_payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    status payout_status DEFAULT 'pending',
    tds_deducted DECIMAL(10, 2) DEFAULT 0,
    processed_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Loyalty Transactions table
CREATE TABLE loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    jewels_earned INTEGER DEFAULT 0,
    jewels_redeemed INTEGER DEFAULT 0,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    reason loyalty_reason NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Coupons table
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type discount_type NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Profiles indexes
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Properties indexes
CREATE INDEX idx_properties_host_id ON properties(host_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_is_verified ON properties(is_verified);
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_price_per_night ON properties(price_per_night);
CREATE INDEX idx_properties_coordinates ON properties(latitude, longitude);

-- Bookings indexes
CREATE INDEX idx_bookings_property_id ON bookings(property_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_property_dates ON bookings(property_id, check_in_date);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_bookings_stripe_payment_intent ON bookings(stripe_payment_intent_id);

-- Reviews indexes
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- Host Payouts indexes
CREATE INDEX idx_host_payouts_host_id ON host_payouts(host_id);
CREATE INDEX idx_host_payouts_booking_id ON host_payouts(booking_id);
CREATE INDEX idx_host_payouts_status ON host_payouts(status);
CREATE INDEX idx_host_payouts_created_at ON host_payouts(created_at);

-- Loyalty Transactions indexes
CREATE INDEX idx_loyalty_transactions_user_id ON loyalty_transactions(user_id);
CREATE INDEX idx_loyalty_transactions_booking_id ON loyalty_transactions(booking_id);
CREATE INDEX idx_loyalty_transactions_reason ON loyalty_transactions(reason);
CREATE INDEX idx_loyalty_transactions_created_at ON loyalty_transactions(created_at);

-- Coupons indexes
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_valid_dates ON coupons(valid_from, valid_until);
CREATE INDEX idx_coupons_discount_type ON coupons(discount_type);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_host_payouts_updated_at BEFORE UPDATE ON host_payouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- Property summary view with host information
CREATE VIEW property_summary AS
SELECT 
    p.id,
    p.title,
    p.location,
    p.price_per_night,
    p.cleaning_fee,
    p.security_deposit,
    p.is_verified,
    p.status,
    p.amenities,
    p.image_urls,
    u.email as host_email,
    pr.first_name as host_first_name,
    pr.last_name as host_last_name
FROM properties p
JOIN users u ON p.host_id = u.id
LEFT JOIN profiles pr ON u.id = pr.user_id;

-- Booking summary view with property and user details
CREATE VIEW booking_summary AS
SELECT 
    b.id,
    b.check_in_date,
    b.check_out_date,
    b.total_price,
    b.status,
    b.stripe_payment_intent_id,
    b.created_at,
    p.title as property_title,
    p.location as property_location,
    g.email as guest_email,
    gp.first_name as guest_first_name,
    gp.last_name as guest_last_name,
    h.email as host_email,
    hp.first_name as host_first_name,
    hp.last_name as host_last_name
FROM bookings b
JOIN properties p ON b.property_id = p.id
JOIN users g ON b.guest_id = g.id
JOIN users h ON p.host_id = h.id
LEFT JOIN profiles gp ON g.id = gp.user_id
LEFT JOIN profiles hp ON h.id = hp.user_id;

-- =====================================================
-- SAMPLE DATA INSERTS
-- =====================================================

-- Insert sample users
INSERT INTO users (email, role) VALUES
('admin@luxestaycations.com', 'admin'),
('host1@example.com', 'host'),
('host2@example.com', 'host'),
('guest1@example.com', 'guest'),
('guest2@example.com', 'guest');

-- Insert sample profiles
INSERT INTO profiles (user_id, first_name, last_name, phone) VALUES
((SELECT id FROM users WHERE email = 'host1@example.com'), 'John', 'Smith', '+91-9876543210'),
((SELECT id FROM users WHERE email = 'host2@example.com'), 'Sarah', 'Johnson', '+91-9876543211'),
((SELECT id FROM users WHERE email = 'guest1@example.com'), 'Mike', 'Brown', '+91-9876543212'),
((SELECT id FROM users WHERE email = 'guest2@example.com'), 'Lisa', 'Davis', '+91-9876543213');

-- Insert sample properties
INSERT INTO properties (host_id, title, description, location, latitude, longitude, price_per_night, cleaning_fee, security_deposit, amenities, image_urls) VALUES
((SELECT id FROM users WHERE email = 'host1@example.com'), 'Luxury Beach Villa', 'Beautiful beachfront villa with ocean views', 'Goa, India', 15.2993, 74.1240, 15000.00, 2000.00, 5000.00, ARRAY['WiFi', 'Pool', 'Kitchen', 'AC'], ARRAY['https://example.com/image1.jpg', 'https://example.com/image2.jpg']),
((SELECT id FROM users WHERE email = 'host2@example.com'), 'Mountain Retreat', 'Peaceful mountain villa with scenic views', 'Manali, India', 32.2432, 77.1892, 12000.00, 1500.00, 3000.00, ARRAY['WiFi', 'Fireplace', 'Kitchen', 'Parking'], ARRAY['https://example.com/image3.jpg', 'https://example.com/image4.jpg']);

-- Insert sample bookings
INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date, total_price, status) VALUES
((SELECT id FROM properties WHERE title = 'Luxury Beach Villa'), (SELECT id FROM users WHERE email = 'guest1@example.com'), '2024-01-15', '2024-01-18', 45000.00, 'confirmed'),
((SELECT id FROM properties WHERE title = 'Mountain Retreat'), (SELECT id FROM users WHERE email = 'guest2@example.com'), '2024-02-01', '2024-02-05', 48000.00, 'pending');

-- Insert sample reviews
INSERT INTO reviews (booking_id, rating, comment) VALUES
((SELECT id FROM bookings WHERE total_price = 45000.00), 5, 'Amazing villa with beautiful ocean views!'),
((SELECT id FROM bookings WHERE total_price = 48000.00), 4, 'Great mountain retreat, very peaceful.');

-- Insert sample coupons
INSERT INTO coupons (code, discount_type, discount_value, valid_from, valid_until) VALUES
('WELCOME10', 'percentage', 10.00, '2024-01-01 00:00:00', '2024-12-31 23:59:59'),
('SAVE500', 'fixed', 500.00, '2024-01-01 00:00:00', '2024-06-30 23:59:59');

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE users IS 'Core user table with authentication and role management';
COMMENT ON TABLE profiles IS 'User profile information separate from authentication';
COMMENT ON TABLE properties IS 'Luxury villa properties available for booking';
COMMENT ON TABLE bookings IS 'Reservation records for villa stays';
COMMENT ON TABLE reviews IS 'Guest reviews and ratings for properties';
COMMENT ON TABLE host_payouts IS 'Host payout tracking and management';
COMMENT ON TABLE loyalty_transactions IS 'Loyalty program point transactions';
COMMENT ON TABLE coupons IS 'Discount coupon system for marketing';

-- =====================================================
-- SCHEMA COMPLETION
-- =====================================================

-- Schema creation complete
SELECT 'Luxe Staycations simplified PostgreSQL schema created successfully!' as status;
