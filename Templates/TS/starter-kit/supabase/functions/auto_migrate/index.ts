import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

function addCorsHeaders(headers = new Headers()) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, apikey");
  return headers;
}

function inferSQLType(value): string {
  if (typeof value === "string") return "TEXT";
  if (typeof value === "number") return "NUMERIC";
  if (typeof value === "boolean") return "BOOLEAN";
  if (value instanceof Date) return "TIMESTAMPTZ";
  if (typeof value === "object") return "JSONB";
  return "TEXT"; // fallback
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: addCorsHeaders() });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Only POST requests are allowed." }),
      { status: 405, headers: addCorsHeaders() }
    );
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;
    const body = await req.json();

    const table = body.table;
    if (!table || typeof table !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'table' name." }),
        { status: 400, headers: addCorsHeaders() }
      );
    }

    // CREATE TABLE -------------------------------------
    if (path === "/create") {
      const structure = body.structure;
      if (!structure || typeof structure !== "object") {
        return new Response(
          JSON.stringify({ error: "Missing or invalid 'structure' object." }),
          { status: 400, headers: addCorsHeaders() }
        );
      }

      const columnDefs = Object.entries(structure)
        .map(([key, value]) => `"${key}" ${inferSQLType(value)}`)
        .join(", ");

      const sql = `
        CREATE TABLE IF NOT EXISTS "${table}" (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          ${columnDefs},
          created_at TIMESTAMPTZ DEFAULT now()
        );
      `;

      const { error } = await supabase.rpc("run_sql", { sql });
      if (error) {
        return new Response(
          JSON.stringify({ error: "Table creation failed", details: error.message }),
          { status: 500, headers: addCorsHeaders() }
        );
      }

      return new Response(
        JSON.stringify({ message: `Table '${table}' created.` }),
        { status: 200, headers: addCorsHeaders() }
      );
    }

    // DELETE TABLE -------------------------------------
    if (path === "/delete") {
      const sql = `DROP TABLE IF EXISTS "${table}";`;

      const { error } = await supabase.rpc("run_sql", { sql });
      if (error) {
        return new Response(
          JSON.stringify({ error: "Table deletion failed", details: error.message }),
          { status: 500, headers: addCorsHeaders() }
        );
      }

      return new Response(
        JSON.stringify({ message: `Table '${table}' deleted.` }),
        { status: 200, headers: addCorsHeaders() }
      );
    }

    // UPDATE TABLE -------------------------------------
    if (path === "/update") {
      const setClause = body.setClause;
      if (!setClause || typeof setClause !== "string") {
        return new Response(
          JSON.stringify({ error: "Missing or invalid 'setClause'." }),
          { status: 400, headers: addCorsHeaders() }
        );
      }

      // Optionally, allow a condition for updating specific rows; default is to update all rows
      const condition =
        body.condition && typeof body.condition === "string" ? body.condition : "1=1";
      const sql = `UPDATE "${table}" SET ${setClause} WHERE ${condition};`;

      const { error } = await supabase.rpc("run_sql", { sql });
      if (error) {
        return new Response(
          JSON.stringify({ error: "Table update failed", details: error.message }),
          { status: 500, headers: addCorsHeaders() }
        );
      }

      return new Response(
        JSON.stringify({ message: `Table '${table}' updated.` }),
        { status: 200, headers: addCorsHeaders() }
      );
    }

    // Invalid path
    return new Response(
      JSON.stringify({ error: "Invalid endpoint path." }),
      { status: 404, headers: addCorsHeaders() }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: addCorsHeaders() }
    );
  }
});
