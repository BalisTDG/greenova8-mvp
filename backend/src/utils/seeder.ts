import prisma from './prisma';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create admin user
    const adminHashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@greenova8.com' },
      update: {},
      create: {
        email: 'admin@greenova8.com',
        password: adminHashedPassword,
        solanaWalletAddress: null,
      },
    });

    console.log('✅ Created admin user:', adminUser.email);
    
    // Create sample user
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const sampleUser = await prisma.user.upsert({
      where: { email: 'test@greenova8.com' },
      update: {},
      create: {
        email: 'test@greenova8.com',
        password: hashedPassword,
        solanaWalletAddress: null,
      },
    });

    console.log('✅ Created sample user:', sampleUser.email);

    // Create sample projects
    const project1 = await prisma.project.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Solar Farm Lahore',
        description: 'A comprehensive 50MW solar farm project located in Lahore, Punjab. This state-of-the-art facility will utilize advanced photovoltaic technology to provide clean, renewable energy to thousands of homes and businesses in the region. The project includes 200,000 solar panels across 500 acres and is expected to generate 75 GWh annually.',
        targetAmount: 500000,
        raisedAmount: 125000,
        status: 'active',
      },
    });

    const project2 = await prisma.project.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Wind Power Karachi',
        description: 'Coastal wind turbines generating 30MW of clean energy for Karachi metropolitan area. These modern wind turbines will harness the coastal winds to provide sustainable energy. The project features 15 state-of-the-art wind turbines, each with a capacity of 2MW, positioned along the coast to maximize wind capture efficiency.',
        targetAmount: 750000,
        raisedAmount: 45000,
        status: 'active',
      },
    });

    const project3 = await prisma.project.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Hydro Power Chitral',
        description: 'Small-scale hydroelectric power plant in northern Pakistan utilizing river flow for sustainable electricity generation. This 15MW facility will provide clean energy to remote mountain communities while preserving the natural environment.',
        targetAmount: 350000,
        raisedAmount: 75000,
        status: 'active',
      },
    });

    console.log('✅ Created sample projects:');
    console.log('  -', project1.name);
    console.log('  -', project2.name);  
    console.log('  -', project3.name);

    // Create some sample investments
    const investment1 = await prisma.investment.create({
      data: {
        userId: sampleUser.id,
        projectId: project1.id,
        amount: 1000,
        solanaTxSignature: 'sample_transaction_signature_1',
      },
    });

    const investment2 = await prisma.investment.create({
      data: {
        userId: sampleUser.id,
        projectId: project2.id,
        amount: 500,
        solanaTxSignature: 'sample_transaction_signature_2',
      },
    });

    console.log('✅ Created sample investments');

    console.log('🎉 Database seeding completed successfully!');
    
    console.log('\n📋 Summary:');
    console.log('  - Users: 2');
    console.log('  - Projects: 3');
    console.log('  - Investments: 2');
    console.log('\n🔐 Admin credentials:');
    console.log('  Email: admin@greenova8.com');
    console.log('  Password: admin123');
    console.log('\n🔐 Test credentials:');
    console.log('  Email: test@greenova8.com');
    console.log('  Password: password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeder if called directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default seed;
