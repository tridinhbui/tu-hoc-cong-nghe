const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing keys");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function main() {
  const { data: reports, error } = await supabase
    .from('lesson_highlights')
    .select('*')
    .eq('kind', 'ai_flag');

  if (error) {
    console.error(error);
    return;
  }

  console.log("AI FLAG HIGHLIGHTS:");
  console.log(JSON.stringify(reports, null, 2));
}

main();
