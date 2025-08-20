// supabase/functions/login-firm/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req: Request) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { auth_id } = await req.json();

    if (!auth_id) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing auth_id" }),
        { status: 400 }
      );
    }

    // 1️⃣ Find staff entry for this auth_id
    const { data: staff, error: staffError } = await supabase
      .from("staff")
      .select("firm_id")
      .eq("auth_id", auth_id)
      .single();

    if (staffError || !staff) {
      return new Response(
        JSON.stringify({ success: false, error: "Staff not found" }),
        { status: 404 }
      );
    }

    // 2️⃣ Lookup firm
    const { data: firm, error: firmError } = await supabase
      .from("firms")
      .select("id, paid")
      .eq("id", staff.firm_id)
      .single();

    if (firmError || !firm) {
      return new Response(
        JSON.stringify({ success: false, error: "Firm not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        firm_id: firm.id,
        paid: firm.paid,
      }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
});