import { FormEvent, useState } from "react";
import { X, Check, Image as ImageIcon, Send } from "lucide-react";

interface AddProjectModalProps {
  onClose: () => void;
  onSave: (projectData: any) => Promise<boolean>;
}

// Stellar monochrome preset photography options to style custom entries gracefully
const PHOTO_PRESETS = [
  {
    name: "Symmetric Brutalism",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Architectural Vaults",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Typographic Cast",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Shadow Geometry",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Monolith Slate",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function AddProjectModal({ onClose, onSave }: AddProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [coverImage, setCoverImage] = useState(PHOTO_PRESETS[0].url);
  const [tags, setTags] = useState("");
  const [year, setYear] = useState("2026");
  const [client, setClient] = useState("");
  const [link, setLink] = useState("#");
  const [credits, setCredits] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage({ type: "error", text: "Title and description are required." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const tagsArray = tags
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : ["Design"];

    const success = await onSave({
      title,
      description,
      longDescription: longDescription || description,
      coverImage,
      tags: tagsArray,
      year: year || "2026",
      client: client || "Independent",
      credits: credits || "Art & Code: Romel Ligligon",
      link: link || "#"
    });

    setLoading(false);
    if (success) {
      setMessage({ type: "success", text: "Project saved successfully. Refreshing list..." });
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setMessage({ type: "error", text: "Failed to write project to database." });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div 
        className="bg-white border-2 border-black w-full max-w-2xl overflow-y-auto max-h-[90vh] flex flex-col"
        id="add-project-modal-container"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-black p-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-black/55 block">
              Database Submission Panel
            </span>
            <h3 className="font-display font-medium text-2xl uppercase tracking-tight text-black">
              Register Portfolio Work
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 border border-black/10 hover:border-black cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 flex flex-col gap-6">
          
          {message && (
            <div 
              className={`p-3 border font-mono text-[11px] uppercase tracking-wider ${
                message.type === "success" 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-black border-black"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${message.type === "success" ? "bg-white animate-ping" : "bg-black"}`} />
                <span>{message.text}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Title */}
            <div>
              <label className="block font-mono text-[10px] uppercase text-black/65 mb-1.5">
                Work Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. MONOSPACE STUDIES"
                className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none"
                required
              />
            </div>

            {/* Subtitle description */}
            <div>
              <label className="block font-mono text-[10px] uppercase text-black/65 mb-1.5">
                Subtitle / Summary *
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Experimental typography exploring silent pauses"
                className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Long narrative */}
          <div>
            <label className="block font-mono text-[10px] uppercase text-black/65 mb-1.5">
              Production narrative / Long details
            </label>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="e.g. Detailed paragraph describing design systems, grid ratios, client briefs..."
              rows={3}
              className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Year */}
            <div>
              <label className="block font-mono text-[10px] uppercase text-black/65 mb-1.5">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2026"
                className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none"
              />
            </div>

            {/* Client */}
            <div>
              <label className="block font-mono text-[10px] uppercase text-black/65 mb-1.5">
                Client
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Monolith Agency"
                className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none"
              />
            </div>

            {/* Link */}
            <div>
              <label className="block font-mono text-[10px] uppercase text-black/65 mb-1.5">
                Interactive Link URL
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="e.g. https://monolith.com"
                className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tags */}
            <div>
              <label className="block font-mono text-[10px] uppercase text-black/65 mb-1.5">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Architecture, Typography, Motion"
                className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none"
              />
            </div>

            {/* Credits */}
            <div>
              <label className="block font-mono text-[10px] uppercase text-black/65 mb-1.5">
                Credits / Collaborators
              </label>
              <input
                type="text"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                placeholder="Lead: Jane Doe / Camera: Studio Noir"
                className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none"
              />
            </div>
          </div>

          {/* Cover image URL and presets */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-mono text-[10px] uppercase text-black/65">
                Monochrome Image Selection
              </label>
              <span className="font-mono text-[9px] text-black/45 uppercase">Select predefined premium cover</span>
            </div>
            
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Custom image URL"
              className="w-full border border-black/25 p-2 font-mono text-xs focus:border-black focus:outline-none mb-3"
            />

            <div className="grid grid-cols-5 gap-2">
              {PHOTO_PRESETS.map((preset) => {
                const isSelected = coverImage === preset.url;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setCoverImage(preset.url)}
                    className={`relative aspect-[16/10] bg-black/5 overflow-hidden border cursor-pointer ${
                      isSelected ? "border-black border-2 scale-[1.03]" : "border-black/10 grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
                    } transition-all duration-300`}
                    title={preset.name}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <Check className="w-5 h-5 text-black bg-white rounded-full p-0.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-black/10">
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[10px] uppercase tracking-wider border border-black/30 p-2 px-4 hover:border-black cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="font-mono text-[10px] uppercase tracking-widest bg-black text-white p-2 px-6 hover:bg-black/90 cursor-pointer disabled:opacity-50 inline-flex items-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? "Writing to DB..." : "Register Work"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
