const { Client } = require('pg');

async function updateDb() {
  const client = new Client({
    connectionString: "postgresql://postgres.nweomtaddpbesdgzminu:g4HKPMui8Vcl85l0@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
  });

  try {
    await client.connect();
    console.log("Connected to database successfully.");

    await client.query(`
      ALTER TABLE patients 
      ADD COLUMN IF NOT EXISTS file_number VARCHAR(255),
      ADD COLUMN IF NOT EXISTS registration_date DATE,
      ADD COLUMN IF NOT EXISTS address VARCHAR(255),
      ADD COLUMN IF NOT EXISTS marital_status VARCHAR(50);
    `);
    console.log("Added new fields to patients.");

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
