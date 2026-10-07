"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { updateSettings } from "@/app/admin/actions";

export default function SettingsForm({
  settingKey,
  label,
  defaultValue,
  textarea = false,
}: {
  settingKey: string;
  label: string;
  defaultValue?: string;
  textarea?: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleBlur = async () => {
    if (value === defaultValue) return;

    setSaving(true);
    const formData = new FormData();
    formData.append("key", settingKey);
    formData.append("value", value);

    const result = await updateSettings(formData);
    setSaving(false);

    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55">
          {label}
        </label>
        {saving && (
          <span className="text-[0.65rem] text-[var(--color-espresso)]/45">Enregistrement…</span>
        )}
        {saved && (
          <span className="inline-flex items-center gap-1 text-[0.65rem] text-[#14532D]">
            <Check size={11} strokeWidth={2.5} />
            Enregistré
          </span>
        )}
      </div>

      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          className="w-full px-4 py-3 bg-transparent text-[0.92rem] outline-none resize-none focus:border-[var(--color-espresso)]/60 transition-colors"
          style={{ border: "1px solid var(--color-border-line)" }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          className="w-full px-4 py-3 bg-transparent text-[0.92rem] outline-none focus:border-[var(--color-espresso)]/60 transition-colors"
          style={{ border: "1px solid var(--color-border-line)" }}
        />
      )}
    </div>
  );
}