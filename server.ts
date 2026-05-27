import express from "express";
import path from "path";
import dns from "dns";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json());

// In-memory / file-based fallback database for projects and contact submissions
const DB_FILE = path.join(process.cwd(), "local_db.json");

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  coverImage: string;
  tags: string[];
  link: string;
  year: string;
  client: string;
  credits: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// Rich initial high-end editorial projects representing Romel Ligligon's real portfolio
const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Cognitive Prompt Architectures",
    description: "Architecting generative AI prompt structures and tools to optimize corporate workflows.",
    longDescription: "Developing highly complex prompt paradigms, multi-agent orchestrations, and testing frameworks that enhance production velocity. Leveraging Anthropic/Google generative models to solve technical bottlenecks, improve literacy metrics, and format responsive workspace outputs with extreme precision.",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    tags: ["Generative AI", "Prompt Design", "ML Workflows"],
    link: "#",
    year: "2025",
    client: "AI Solutions Lab",
    credits: "Lead Specialist: Romel Ligligon"
  },
  {
    id: 2,
    title: "Centennial KCP Yearbook",
    description: "Professional yearbook publication layout design, photography staging, and video editing.",
    longDescription: "A comprehensive media design system for King's College of the Philippines (KCP). Translating student journeys into standard high-contrast print shapes, setting margin ratios, and directing complete videography shoots. Built with Adobe Suite, typography matrices, and custom layout grids.",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Media Production", "Graphic Arts", "Video Editing"],
    link: "#",
    year: "2024",
    client: "King's College Administration",
    credits: "Creative Director: Romel Ligligon / Co-Designer: KCP IT Department"
  },
  {
    id: 3,
    title: "Apex IT Support Mesh",
    description: "End-to-end IT hardware sales, system provisioning, and complex technical troubleshooting.",
    longDescription: "Deploying secure, redundant hardware configurations for freelance and commercial client workstations. Integrating multi-level diagnostic checks, reselling custom-built rigs, and managing support tickets smoothly through secure cloud platforms. Emphasizes hardware longevity and perfect local networks.",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    tags: ["IT Support", "Hardware Literacy", "Sales"],
    link: "#",
    year: "2025",
    client: "Freelance Client Mesh",
    credits: "Lead Engineer: Romel Ligligon"
  },
  {
    id: 4,
    title: "Cyber Shield DICT-CAR",
    description: "A complete visual security framework built around cyber protection training protocols.",
    longDescription: "Implementing strict standards inspired by the Cyber Security Awareness training from DICT-CAR. Resolving complex vulnerability vectors in digital platforms, conducting risk analysis, and presenting technical safety protocols beautifully to academic and freelance cohorts across Pico La Trinidad Benguet.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    tags: ["Cybersecurity", "Compliance", "Architecture"],
    link: "#",
    year: "2024",
    client: "DICT Cordillera Administrative Region",
    credits: "Training Fellow: Romel Ligligon"
  }
];

function readLocalDB(): { projects: Project[]; contacts: Contact[] } {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading local db, resetting file:", err);
  }
  // Initialize with values
  const initData = { projects: INITIAL_PROJECTS, contacts: [] };
  fs.writeFileSync(DB_FILE, JSON.stringify(initData, null, 2), "utf-8");
  return initData;
}

function writeLocalDB(data: { projects: Project[]; contacts: Contact[] }) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to local db:", err);
  }
}

// Setup Supabase
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
  console.log("Supabase credentials not configured. Gracefully falling back to integrated local file database.");
}

// ------------------------------------
// ADMIN AUTHENTICATION
// ------------------------------------
const verifyAdmin = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader === "Bearer romel-ligligon-authorized-token") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized. Admin credentials required." });
  }
};

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "6FMuWl6MA00bMetR";
  if (password === adminPassword) {
    res.json({ success: true, token: "romel-ligligon-authorized-token" });
  } else {
    res.status(401).json({ error: "Invalid administrative credentials." });
  }
});

// ------------------------------------
// API ROUTES
// ------------------------------------

// GET information state (database configuration and capabilities)
app.get("/api/status", (req, res) => {
  res.json({
    supabaseConfigured: hasSupabase,
    fallbackMode: !hasSupabase,
    environmentTime: new Date().toISOString()
  });
});

// GET all projects
app.get("/api/projects", async (req, res) => {
  if (hasSupabase && supabase) {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("id");
      if (error) {
        console.error("Supabase Error fetching projects:", error.message);
        throw error;
      }
      res.json(data);
    } catch (e: any) {
      // Fallback to local DB on error
      console.log("Using local JSON database fallback...");
      res.json(readLocalDB().projects);
    }
  } else {
    res.json(readLocalDB().projects);
  }
});

// GET single project
app.get("/api/projects/:id", async (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  if (hasSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      const localProjects = readLocalDB().projects;
      const found = localProjects.find((p) => p.id === projectId);
      if (found) {
        res.json(found);
      } else {
        res.status(404).json({ error: "Project not found in fallback database" });
      }
    }
  } else {
    const localProjects = readLocalDB().projects;
    const found = localProjects.find((p) => p.id === projectId);
    if (found) {
      res.json(found);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  }
});

// POST to create project (Supports fully interactive editing in preview!)
app.post("/api/projects", verifyAdmin, async (req, res) => {
  const newProjData = req.body;
  if (hasSupabase && supabase) {
    try {
      const { data, error } = await supabase.from("projects").insert([newProjData]).select();
      if (error) throw error;
      res.status(201).json({ success: true, data: data[0] });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const db = readLocalDB();
    const newId = db.projects.length > 0 ? Math.max(...db.projects.map((p) => p.id)) + 1 : 1;
    const project: Project = {
      id: newId,
      title: newProjData.title || "Untitled Masterpiece",
      description: newProjData.description || "Project description.",
      longDescription: newProjData.longDescription || "A structural design system by Jane Doe.",
      coverImage: newProjData.coverImage || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
      tags: Array.isArray(newProjData.tags) ? newProjData.tags : ["Design"],
      link: newProjData.link || "#",
      year: newProjData.year || new Date().getFullYear().toString(),
      client: newProjData.client || "Independent Studio",
      credits: newProjData.credits || "Art & Code: Jane Doe"
    };
    db.projects.push(project);
    writeLocalDB(db);
    res.status(201).json({ success: true, data: project });
  }
});

// DELETE a project (Supports fully interactive removal in preview!)
app.delete("/api/projects/:id", verifyAdmin, async (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  if (hasSupabase && supabase) {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", projectId);
      if (error) throw error;
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  } else {
    const db = readLocalDB();
    const index = db.projects.findIndex((p) => p.id === projectId);
    if (index !== -1) {
      db.projects.splice(index, 1);
      writeLocalDB(db);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  }
});

// POST contact form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (hasSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ name, email, message }]);
      if (error) throw error;
      res.status(201).json({ success: true, data });
    } catch (e: any) {
      console.warn("Supabase contact write failed, using local db backup:", e.message);
      // fallback save local
      const db = readLocalDB();
      const newContact: Contact = {
        id: db.contacts.length + 1,
        name,
        email,
        message,
        createdAt: new Date().toISOString()
      };
      db.contacts.push(newContact);
      writeLocalDB(db);
      res.status(201).json({ success: true, warning: "Saved to local fallback database path.", data: newContact });
    }
  } else {
    const db = readLocalDB();
    const newContact: Contact = {
      id: db.contacts.length + 1,
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };
    db.contacts.push(newContact);
    writeLocalDB(db);
    res.status(201).json({ success: true, data: newContact });
  }
});

// GET contact submissions (useful for checking submissions inside the preview!)
app.get("/api/contacts", async (req, res) => {
  if (hasSupabase && supabase) {
    try {
      const { data, error } = await supabase.from("contacts").select("*").order("id", { ascending: false });
      if (error) throw error;
      res.json(data);
    } catch (e: any) {
      res.json(readLocalDB().contacts);
    }
  } else {
    res.json(readLocalDB().contacts);
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

startServer();
