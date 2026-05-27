import express from "express";
import path from "path";
import dns from "dns";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json());

// Setup Supabase (Required for production)
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
const hasSupabase = SUPABASE_URL !== "" && SUPABASE_ANON_KEY !== "";

let supabase: any = null;
if (hasSupabase) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase system initialized successfully.");
  } catch (e: any) {
    console.error("Failed to initialize Supabase client:", e.message);
  }
} else {
  console.warn("WARNING: Supabase credentials not configured. API endpoints will fail until configured.");
}

// Security Configuration
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production";

// ------------------------------------
// ADMIN AUTHENTICATION
// ------------------------------------
const verifyAdmin = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Unauthorized. Admin token required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired admin token." });
  }
};

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: "Server configuration error: ADMIN_PASSWORD is not set." });
  }

  if (password === adminPassword) {
    // Generate a secure JWT that expires in 24 hours
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: "Invalid administrative credentials." });
  }
});

// ------------------------------------
// API ROUTES (Supabase Only)
// ------------------------------------

// GET information state
app.get("/api/status", (req, res) => {
  res.json({
    supabaseConfigured: hasSupabase,
    fallbackMode: false,
    environmentTime: new Date().toISOString()
  });
});

// GET all projects
app.get("/api/projects", async (req, res) => {
  if (!supabase) return res.status(503).json({ error: "Database not configured." });
  try {
    const { data, error } = await supabase.from("projects").select("*").order("id");
    if (error) throw error;
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// GET single project
app.get("/api/projects/:id", async (req, res) => {
  if (!supabase) return res.status(503).json({ error: "Database not configured." });
  const projectId = parseInt(req.params.id, 10);
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (e: any) {
    res.status(404).json({ error: "Project not found or error fetching" });
  }
});

// POST to create project (Admin Only)
app.post("/api/projects", verifyAdmin, async (req, res) => {
  if (!supabase) return res.status(503).json({ error: "Database not configured." });
  const newProjData = req.body;
  try {
    const { data, error } = await supabase.from("projects").insert([newProjData]).select();
    if (error) throw error;
    res.status(201).json({ success: true, data: data[0] });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE a project (Admin Only)
app.delete("/api/projects/:id", verifyAdmin, async (req, res) => {
  if (!supabase) return res.status(503).json({ error: "Database not configured." });
  const projectId = parseInt(req.params.id, 10);
  try {
    const { error } = await supabase.from("projects").delete().eq("id", projectId);
    if (error) throw error;
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// POST contact form submission
app.post("/api/contact", async (req, res) => {
  if (!supabase) return res.status(503).json({ error: "Database not configured." });
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }]);
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// GET contact submissions (Admin Only)
app.get("/api/contacts", verifyAdmin, async (req, res) => {
  if (!supabase) return res.status(503).json({ error: "Database not configured." });
  try {
    const { data, error } = await supabase.from("contacts").select("*").order("id", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ------------------------------------
// CORE VITE DEV SERVER & PRODUCTION ROUTING
// ------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULLSTACK SERVER] Operational at http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
