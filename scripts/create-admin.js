const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const adminUser = await prisma.user.upsert({
            where: { email: 'admin@luxe.com' },
            update: {
                role: 'ADMIN',
                passwordHash: hashedPassword,
            },
            create: {
                email: 'admin@luxe.com',
                name: 'Admin User',
                passwordHash: hashedPassword,
                role: 'ADMIN',
            },
        });

        console.log('Admin user created/updated successfully:', adminUser);
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();