const { Client } = require('pg');

async function updateDb() {
  const client = new Client({
    connectionString: "postgresql://postgres.nweomtaddpbesdgzminu:g4HKPMui8Vcl85l0@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
  });

  try {
    await client.connect();
    console.log("Connected to database successfully.");

    await client.query(`
      ALTER TABLE appointments 
      ADD COLUMN IF NOT EXISTS appointment_type VARCHAR(50) DEFAULT 'clinic';
    `);
    console.log("Added appointment_type to appointments.");

    await client.query(`NOTIFY pgrst, 'reload schema';`);
    console.log("Reloaded schema cache.");

    console.log("Database updated successfully!");
  } catch (err) {
    console.error("Error updating database:", err);
  } finally {
    await client.end();
  }
}

updateDb();
