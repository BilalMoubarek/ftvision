cat << 'EOF' > src/components/AdminContactButton.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X } from "lucide-react";

export interface ContactSettings {
  showContactButton: boolean;
  contactUrl: string;
  contactLabel: string;
}

export const CONTACT_STORAGE_KEY = "ftvision_admin_contact_v1";

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  showContactButton: true,
  contactUrl: "mailto:bilaltest47@gmail.com",
  contactLabel: "تواصل مع الأدمن",
};

export function getStoredContactSettings(): ContactSettings {
  if (typeof window === "undefined") return DEFAULT_CONTACT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(CONTACT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONTACT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      showContactButton:
        typeof parsed.showContactButton === "boolean"
          ? parsed.showContactButton
          : DEFAULT_CONTACT_SETTINGS.showContactButton,
      contactUrl:
        typeof parsed.contactUrl === "string" && parsed.contactUrl.trim()
          ? parsed.contactUrl.trim()
          : DEFAULT_CONTACT_SETTINGS.contactUrl,
      contactLabel:
        typeof parsed.contactLabel === "string" && parsed.contactLabel.trim()
          ? parsed.contactLabel.trim()
          : DEFAULT_CONTACT_SETTINGS.contactLabel,
    };
  } catch {
    return DEFAULT_CONTACT_SETTINGS;
  }
}

export default function AdminContactButton() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<ContactSettings>(
    DEFAULT_CONTACT_SETTINGS
  );
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("طلب فيلم / أنمي");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSettings(getStoredContactSettings());

    const handleStorage = () => {
      setSettings(getStoredContactSettings());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("ftvision-contact-updated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("ftvision-contact-updated", handleStorage);
    };
  }, []);

  if (pathname?.startsWith("/admin") || !settings.showContactButton) {
    return null;
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `[FTVision - ${topic}] ${message.trim() || "سلام أدمن"}`;
    const target = settings.contactUrl || DEFAULT_CONTACT_SETTINGS.contactUrl;

    if (target.startsWith("mailto:")) {
      const sep = target.includes("?") ? "&" : "?";
      window.location.href = `${target}${sep}subject=${encodeURIComponent(
        `FTVision: ${topic}`
      )}&body=${encodeURIComponent(text)}`;
    } else if (target.includes("wa.me") || target.includes("whatsapp.com")) {
      const sep = target.includes("?") ? "&" : "?";
      window.open(
        `${target}${sep}text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (target.includes("t.me")) {
      const sep = target.includes("?") ? "&" : "?";
      window.open(
        `${target}${sep}text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.open(target, "_blank", "noopener,noreferrer");
    }

    setMessage("");
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={settings.contactLabel}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-red-600 px-3.5 py-2.5 text-xs font-medium text-white shadow-lg transition hover:bg-red-500 active:scale-95"
      >
        <MessageCircle className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">{settings.contactLabel}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/70 p-4 sm:items-center sm:justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-100 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{settings.contactLabel}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSend} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-zinc-400">
                  نوع الرسالة
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="طلب فيلم / أنمي">طلب فيلم / أنمي</option>
                  <option value="إبلاغ عن سيرفر أو حلقة">
                    إبلاغ عن سيرفر أو حلقة
                  </option>
                  <option value="اقتراح أو ملاحظة">اقتراح أو ملاحظة</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs text-zinc-400">
                  التفاصيل (اسم العمل أو رقم الحلقة)
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="مثلاً: زيد الحلقة الجديدة أو شوف السيرفر رقم 2..."
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-xs font-medium text-white transition hover:bg-red-500"
              >
                <Send className="h-3.5 w-3.5" />
                <span>إرسال التواصل</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}