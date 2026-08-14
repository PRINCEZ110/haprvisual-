"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UploadButton from "@/components/admin/UploadButton";
import { CATEGORIES } from "@/lib/constants";

type FormState = {
  title: string;
  year: string;
  description: string;
  coverImage: string;
  categories: string[];
  gallery: string[];
};

type Props = {
  mode: "create" | "edit";
  initial?: FormState & { id?: string };
};

const EMPTY: FormState = {
  title: "",
  year: String(new Date().getFullYear()),
  description: "",
  coverImage: "",
  categories: [],
  gallery: [],
};

export default function AdminProjectForm({ mode, initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initial ?? EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function toggleCategory(name: string) {
    set(
      "categories",
      form.categories.includes(name)
        ? form.categories.filter((c) => c !== name)
        : [...form.categories, name]
    );
  }

  function removeGallery(url: string) {
    set(
      "gallery",
      form.gallery.filter((g) => g !== url)
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.coverImage) {
      setError("Please upload a cover image.");
      return;
    }
    setSaving(true);

    const payload = {
      ...form,
      gallery:
        form.gallery.length > 0
          ? form.gallery
          : form.coverImage
          ? [form.coverImage]
          : [],
    };

    const res =
      mode === "create"
        ? await fetch("/api/admin/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch(`/api/admin/projects/${initial?.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

    setSaving(false);
    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      setError("Failed to save project. Check the data and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-3xl gap-6">
      <div>
        <label htmlFor="title" className="field-label">
          Project name
        </label>
        <input
          id="title"
          type="text"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className="field"
          placeholder="Nordic Lounge"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="year" className="field-label">
            Year
          </label>
          <input
            id="year"
            type="text"
            required
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            className="field"
            placeholder="2024"
          />
        </div>
        <div>
          <span className="field-label">Categories</span>
          <div className="flex flex-wrap gap-2 border border-line bg-white/50 px-3 py-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
                  form.categories.includes(cat)
                    ? "bg-ink text-cream"
                    : "border border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="field-label">
          Short project description
        </label>
        <textarea
          id="description"
          required
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="field resize-none"
          placeholder="Photorealistic visualization of a minimalist lounge..."
        />
      </div>

      <div>
        <span className="field-label">Cover image</span>
        <div className="flex flex-wrap items-center gap-4">
          {form.coverImage ? (
            <div className="relative h-28 w-40 overflow-hidden border border-line">
              <Image
                src={form.coverImage}
                alt="Cover preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ) : null}
          <div>
            <UploadButton
              label={form.coverImage ? "Replace cover" : "Upload cover"}
              onUploaded={(url) => set("coverImage", url)}
            />
            {form.coverImage && (
              <button
                type="button"
                onClick={() => set("coverImage", "")}
                className="mt-2 block text-xs text-red-700 underline underline-offset-4"
              >
                Remove cover
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <span className="field-label">Gallery (optional)</span>
        <div className="flex flex-wrap items-start gap-4">
          {form.gallery.map((url) => (
            <div key={url} className="relative h-24 w-32 overflow-hidden border border-line">
              <Image src={url} alt="Gallery preview" fill unoptimized className="object-cover" />
              <button
                type="button"
                onClick={() => removeGallery(url)}
                className="absolute right-1 top-1 rounded-full bg-coffee px-2 text-xs text-cream"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
          <UploadButton label="Add image" onUploaded={(url) => set("gallery", [...form.gallery, url])} />
        </div>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="pill disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : mode === "create" ? "Create project" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}