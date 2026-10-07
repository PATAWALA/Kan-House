import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";

async function getSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("settings").select("*");
  if (error) return {};
  const map: Record<string, any> = {};
  (data ?? []).forEach((s: any) => {
    map[s.key] = s.value?.text ?? "";
  });
  return map;
}

export default async function AdminParametresPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-2xl space-y-8">
      <section>
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55 mb-5">
          Informations de la marque
        </p>
        <div className="space-y-5">
          <SettingsForm settingKey="brand_name" label="Nom de la marque" defaultValue={settings.brand_name ?? "Kan House"} />
          <SettingsForm settingKey="brand_tagline" label="Tagline" defaultValue={settings.brand_tagline ?? "Furniture · Interiors · Sourcing"} />
          <SettingsForm settingKey="brand_description" label="Description courte" defaultValue={settings.brand_description ?? ""} textarea />
        </div>
      </section>

      <section className="pt-8" style={{ borderTop: "1px solid var(--color-border-line)" }}>
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55 mb-5">
          Contact
        </p>
        <div className="space-y-5">
          <SettingsForm settingKey="contact_email" label="Email de contact" defaultValue={settings.contact_email ?? "hello@kanhouse.com"} />
          <SettingsForm settingKey="contact_phone" label="Téléphone" defaultValue={settings.contact_phone ?? ""} />
          <SettingsForm settingKey="contact_paris" label="Adresse Paris" defaultValue={settings.contact_paris ?? "Paris · France"} />
          <SettingsForm settingKey="contact_shanghai" label="Adresse Shanghai" defaultValue={settings.contact_shanghai ?? "Shanghai · Chine"} />
        </div>
      </section>

      <section className="pt-8" style={{ borderTop: "1px solid var(--color-border-line)" }}>
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-espresso)]/55 mb-5">
          Réseaux sociaux
        </p>
        <div className="space-y-5">
          <SettingsForm settingKey="social_instagram" label="Instagram" defaultValue={settings.social_instagram ?? ""} />
          <SettingsForm settingKey="social_linkedin" label="LinkedIn" defaultValue={settings.social_linkedin ?? ""} />
          <SettingsForm settingKey="social_tiktok" label="TikTok" defaultValue={settings.social_tiktok ?? ""} />
        </div>
      </section>
    </div>
  );
}