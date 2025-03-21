import { createClient } from "@supabase/supabase-js";

// Initialize Supabase using Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false }
});

// Generic interface for dynamic objects
export interface DynamicObject {
  [key: string]: string | number | boolean | object | null | Date;
}

// Helper: Infer SQL type from a sample value
function inferSQLType(value: string | number | boolean | object | Date | null): string {
  if (typeof value === "string") return "TEXT";
  if (typeof value === "number") return "NUMERIC";
  if (typeof value === "boolean") return "BOOLEAN";
  if (value instanceof Date) return "TIMESTAMPTZ";
  if (typeof value === "object") return "JSONB";
  return "TEXT";
}

// Helper: Run raw SQL via the "run_sql" RPC (ensure this function exists in Supabase)
async function runSQL(sql: string): Promise<void> {
  const { error } = await supabase.rpc("run_sql", { sql });
  if (error) throw new Error(error.message);
}

// ---------------- Data Operations ----------------

// Create a record; returned record includes an "id" field.
export const createRecord = async <T extends DynamicObject>(
  table: string,
  data: T
): Promise<T & { id: number }> => {
  const { data: result, error } = await supabase.from(table).insert([data]).select().single();
  if (error) throw new Error(`Create record error: ${error.message}`);
  return result;
};

// Create many records; each record now includes an "id" field.
export const createRecords = async <T extends DynamicObject>(
  table: string,
  records: T[]
): Promise<Array<T & { id: number }>> => {
  const { data, error } = await supabase.from(table).insert(records).select();
  if (error) throw new Error(`Create records error: ${error.message}`);
  return data;
};

// Get a record by id; returned record includes an "id" field.
export const getRecord = async <T extends DynamicObject>(
  table: string,
  id: number
): Promise<T & { id: number }> => {
  const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
  if (error) throw new Error(`Get record error: ${error.message}`);
  return data;
};

// Get all records (with optional filters)
export const getAllRecords = async <T extends DynamicObject>(
  table: string,
  filters?: Partial<T>
): Promise<Array<T & { id: number }>> => {
  let query = supabase.from(table).select("*");
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }
  const { data, error } = await query;
  if (error) throw new Error(`Get all records error: ${error.message}`);
  return data;
};

// Get many records by IDs
export const getRecordsByIds = async <T extends DynamicObject>(
  table: string,
  ids: number[]
): Promise<Array<T & { id: number }>> => {
  const { data, error } = await supabase.from(table).select("*").in("id", ids);
  if (error) throw new Error(`Get records by IDs error: ${error.message}`);
  return data;
};

// Update a record by id; returned record includes an "id" field.
export const updateRecord = async <T extends DynamicObject>(
  table: string,
  id: number,
  data: Partial<T>
): Promise<T & { id: number }> => {
  const { data: updated, error } = await supabase.from(table).update(data).eq("id", id).select().single();
  if (error) throw new Error(`Update record error: ${error.message}`);
  return updated;
};

// Update many records; each update contains an id and partial data.
// Each returned record now includes an "id" field.
export const updateRecords = async <T extends DynamicObject>(
  table: string,
  updates: { id: number; data: Partial<T> }[]
): Promise<Array<T & { id: number }>> => {
  const results: Array<T & { id: number }> = [];
  for (const { id, data } of updates) {
    const updated = await updateRecord(table, id, data);
    results.push(updated);
  }
  return results;
};

// Delete a record by id
export const deleteRecord = async (table: string, id: number): Promise<boolean> => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(`Delete record error: ${error.message}`);
  return true;
};

// Delete many records by IDs
export const deleteRecords = async (table: string, ids: number[]): Promise<boolean> => {
  const { error } = await supabase.from(table).delete().in("id", ids);
  if (error) throw new Error(`Delete records error: ${error.message}`);
  return true;
};

// ---------------- Table Operations ----------------

// Create a new table with a given structure; always includes an "id" primary key.
export const createTable = async (table: string, structure: DynamicObject): Promise<void> => {
  const columns = Object.entries(structure)
    .map(([col, sample]) => `"${col}" ${inferSQLType(sample)}`)
    .join(", ");
  const sql = `
    CREATE TABLE IF NOT EXISTS "${table}" (
      id SERIAL PRIMARY KEY,
      ${columns},
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `;
  await runSQL(sql);
};

// Delete an existing table
export const deleteTable = async (table: string): Promise<void> => {
  const sql = `DROP TABLE IF EXISTS "${table}";`;
  await runSQL(sql);
};

// Update a table schema; command is an SQL clause (e.g., "ADD COLUMN email TEXT")
export const updateTable = async (table: string, command: string): Promise<void> => {
  const sql = `ALTER TABLE "${table}" ${command};`;
  await runSQL(sql);
};

// ---------------- Auth Operations ----------------

// Register a new user (email & password)
export const registerUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(`Registration error: ${error.message}`);
  return data;
};

// Log in an existing user
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`Login error: ${error.message}`);
  return data;
};

// Log out the current user
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Logout error: ${error.message}`);
  return "User logged out successfully";
};

// Get the currently logged-in user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(`Get user error: ${error.message}`);
  return data.user;
};

// Send a password reset email
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(`Reset password error: ${error.message}`);
  return "Password reset email sent";
};

// Verify if a user is logged in (session check)
export const verifySession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(`Session check error: ${error.message}`);
  return data.session;
};
