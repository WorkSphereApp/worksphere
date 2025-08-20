// supabase/functions/register-firm/index.ts
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ✅ Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("OK", { status: 200, headers: corsHeaders });
  }

  try {
    const { email, password, firmName, founderData, emailjsConfig } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ✅ Insert firm with admin_email
    const { data: firmData, error: firmError } = await supabase
      .from("firms")
      .insert([
        {
          name: firmName,
          admin_email: email,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (firmError || !firmData) {
      return new Response(JSON.stringify({ error: firmError?.message }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const firm_id = firmData.id;

    // ✅ Insert default firm_config for EmailJS
    const { error: configError } = await supabase.from("firm_config").insert([
  {
    firm_id,
    service_id: emailjsConfig?.service_id || "default_service_id",
    template_id: emailjsConfig?.template_id || "default_template_id",
    public_key: emailjsConfig?.public_key || "default_public_key",
  },
]);

    if (configError) {
      return new Response(JSON.stringify({ error: configError.message }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // ✅ Create founder user in Supabase Auth
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        firm_id,
        role: "Founder",
      },
    });

    if (userError || !userData?.user?.id) {
      return new Response(JSON.stringify({ error: userError?.message }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const auth_id = userData.user.id;

    // ✅ Insert staff record for founder
    const { error: staffError } = await supabase.from("staff").insert([
      {
        email,
        firm_id,
        auth_id,
        name: founderData.name,
        phone: founderData.phone,
        designation: founderData.designation,
        department: founderData.department,
        role: "Founder",
      },
    ]);

    if (staffError) {
      return new Response(JSON.stringify({ error: staffError.message }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    return new Response(
  JSON.stringify({
    message: "✅ Firm + Founder created successfully.",
    firm_id,
    auth_id,
  }),
  { status: 200, headers: corsHeaders }
);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
