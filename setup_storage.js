const { Client } = require('pg');

async function updateDb() {
  const client = new Client({
    connectionString: "postgresql://postgres.nweomtaddpbesdgzminu:g4HKPMui8Vcl85l0@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
  });

  try {
    await client.connect();
    
    console.log("Adding column to patients table...");
    await client.query(`
      ALTER TABLE patients 
      ADD COLUMN IF NOT EXISTS endoscopy_image_url TEXT;
    `);
    
    console.log("Setting up storage bucket...");
    // Try to create the bucket (fails gracefully if exists due to ON CONFLICT or we catch it)
    try {
      await client.query(`
        INSERT INTO storage.buckets (id, name, public) 
        VALUES ('medical_records', 'medical_records', true)
        ON CONFLICT (id) DO NOTHING;
      `);
    } catch (e) {
      console.log("Bucket might already exist or error: " + e.message);
    }

    console.log("Setting up storage policies...");
    // Create permissive policies for now so the app can upload without complex auth.
    // In production, you'd restrict this based on user roles.
    await client.query(`
      DROP POLICY IF EXISTS "Public Access" ON storage.objects;
      DROP POLICY IF EXISTS "Allow Uploads" ON storage.objects;
      DROP POLICY IF EXISTS "Allow Updates" ON storage.objects;
      DROP POLICY IF EXISTS "Allow Deletes" ON storage.objects;
      
      CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'medical_records');
      CREATE POLICY "Allow Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'medical_records');
      CREATE POLICY "Allow Updates" ON storage.objects FOR UPDATE USING (bucket_id = 'medical_records');
      CREATE POLICY "Allow Deletes" ON storage.objects FOR DELETE USING (bucket_id = 'medical_records');
    `);

    await client.query(`NOTIFY pgrst, 'reload schema';`);
    console.log("Database & Storage updated successfully!");

  } catch (err) {
    console.error("Error updating database:", err);
  } finally {
    await client.end();
  }
}

updateDb();
