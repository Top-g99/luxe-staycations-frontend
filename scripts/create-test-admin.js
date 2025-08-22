const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('anypassword', 10);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'khanishaan846@gmail.com' },
      update: {
        role: 'ADMIN',
        passwordHash: hashedPassword,
      },
      create: {
        email: 'khanishaan846@gmail.com',
        name: 'Test Admin User',
        passwordHash: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Test admin user created/updated successfully:', adminUser);
    console.log('You can now login with:');
    console.log('Email: khanishaan846@gmail.com');
    console.log('Password: ANY PASSWORD (temporarily bypassed)');
  } catch (error) {
    console.error('Error creating test admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestAdminUser();
