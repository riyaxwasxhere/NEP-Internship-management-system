import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://umhgoaasjpekjrefeaqw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtaGdvYWFzanBla2pyZWZlYXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MzUwNzcsImV4cCI6MjA3NTUxMTA3N30.90Rv3XJu-EAksumag9-RQDXdeUuPjLDzvRym2lDieYI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
