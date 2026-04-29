const { Client } = require('pg');

async function updateDb() {
  const client = new Client({
    connectionString: "postgresql://postgres.nweomtaddpbesdgzminu:g4HKPMui8Vcl85l0@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
  });

  try {
    await client.connect();
    
    console.log("Adding vital signs to patients table...");
    await client.query(`
      ALTER TABLE patients 
      ADD COLUMN IF NOT EXISTS weight DECIMAL(5,2),
      ADD COLUMN IF NOT EXISTS height DECIMAL(5,2),
      ADD COLUMN IF NOT EXISTS bmi DECIMAL(5,2),
      ADD COLUMN IF NOT EXISTS blood_group VARCHAR(5);
    `);
    
    await client.query(`NOTIFY pgrst, 'reload schema';`);
    console.log("Database updated successfully!");

  } catch (err) {
    console.error("Error updating database:", err);
  } finally {
    await client.end();
  }
}

updateDb();
