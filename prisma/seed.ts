import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // 1. Seed Roles
    const roles = [
        { name: 'ADMIN', description: 'Has full control of the system' },
        { name: 'USER', description: 'Regular customer' },
    ];

    // Upsert roles to avoid duplicates
    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }

    console.log('Roles seeded successfully.');

    // 2. Seed Users
    const users = [
        {
            email: 'admin@example.com',
            password: '12345678', // Plain text password to be hashed
            name: 'Admin',
            roles: [ 'ADMIN'],
        },
        {
            email: 'user@example.com',
            password: '12345678', // Plain text password to be hashed
            name: 'Regular User',
            roles: ['USER'],
        }
    ];

    for (const user of users) {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const rolesToAssign = await prisma.role.findMany({
            where: { name: { in: user.roles } },
        });

        await prisma.user.upsert({
            where: { email: user.email },
            update: {
                name: user.name,
                role: {
                    set: rolesToAssign.map((role) => ({ id: role.id })), // Connect roles
                },
            },
            create: {
                email: user.email,
                password: hashedPassword, // Store hashed password
                name: user.name,
                role: {
                    connect: rolesToAssign.map((role) => ({ id: role.id })), // Connect roles
                },
            },
        });
    }

    console.log('Users seeded successfully.');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
