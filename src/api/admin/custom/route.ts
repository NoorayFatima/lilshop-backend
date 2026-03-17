import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    // Optional: just a test query to verify connection
    const { data, error } = await supabase.from("test_table").select("*");
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Admin route working!", data });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}