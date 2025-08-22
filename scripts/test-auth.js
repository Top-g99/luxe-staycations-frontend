const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testAuth() {
  try {
    // Test password hashing
    const testPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    console.log('Test password hash:', hashedPassword);
    
    // Test password comparison
    const isValid = await bcrypt.compare(testPassword, hashedPassword);
    console.log('Password comparison test:', isValid);
    
    // Get admin user from database
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@luxe.com' }
    });
    
    if (adminUser) {
      console.log('Admin user found:', {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        hasPasswordHash: !!adminUser.passwordHash
      });
      
      // Test with stored password hash
      const storedHashValid = await bcrypt.compare(testPassword, adminUser.passwordHash);
      console.log('Stored hash validation:', storedHashValid);
    } else {
      console.log('Admin user not found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
