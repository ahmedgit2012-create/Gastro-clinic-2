const { Client } = require('pg');

async function setupVisitsTable() {
  const client = new Client({
    connectionString: "postgresql://postgres.nweomtaddpbesdgzminu:g4HKPMui8Vcl85l0@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
  });

  try {
    await client.connect();
    
    console.log("Creating patient_visits table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS patient_visits (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
        visit_date DATE NOT NULL,
        treatment TEXT,
        patient_status VARCHAR(255),
        next_visit_date DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);
    
    await client.query(`NOTIFY pgrst, 'reload schema';`);
    console.log("Database updated successfully!");

  } catch (err) {
    console.error("Error updating database:", err);
  } finally {
    await client.end();
  }
}

setupVisitsTable();
