// supabase/functions/login-firm/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Content-Type": "application/json",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { auth_id } = await req.json();

    if (!auth_id) {
      return new Response(JSON.stringify({ success: false, error: "Missing auth_id" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { data: staff, error: staffError } = await supabase
      .from("staff")
      .select("firm_id")
      .eq("auth_id", auth_id)
      .single();

    if (staffError || !staff) {
      return new Response(JSON.stringify({ success: false, error: "Staff not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    const { data: firm, error: firmError } = await supabase
      .from("firms")
      .select("id, paid")
      .eq("id", staff.firm_id)
      .single();

    if (firmError || !firm) {
      return new Response(JSON.stringify({ success: false, error: "Firm not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new Response(
      JSON.stringify({ success: true, firm_id: firm.id, paid: firm.paid }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});