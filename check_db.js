const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.nweomtaddpbesdgzminu:g4HKPMui8Vcl85l0@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
});
client.connect()
  .then(() => client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'appointments';"))
  .then(res => {
    console.log(res.rows);
    return client.query(`NOTIFY pgrst, 'reload schema'`);
  })
  .then(() => {
    console.log("Forced reload again.");
    client.end();
  })
  .catch(err => {
    console.error(err);
    client.end();
  });
