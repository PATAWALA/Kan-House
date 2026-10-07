import { createClient } from "@/lib/supabase/server";
import { getAdminUsers } from "@/app/admin/actions";
import SettingsForm from "@/components/admin/SettingsForm";
import UsersManager from "@/components/admin/UsersManager";

export const metadata = {
  title: "Paramètres — Admin Kan House",
};

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

async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export default async function AdminParametresPage() {
  const [settings, users, currentUser] = await Promise.all([
    getSettings(),
    getAdminUsers(),
    getCurrentUser(),
  ]);

  return (
    <div className="max-w-[1200px] space-y-5 lg:space-y-8">

      {/* Header */}
      <div>
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em]
                      text-[var(--color-espresso)]/45 mb-1">
          Système
        </p>
        <h1 className="text-[1.35rem] lg:text-[1.5rem] font-normal
                       text-[var(--color-espresso)]">
          Paramètres
        </h1>
      </div>

      {/* Utilisateurs admin */}
      <UsersManager
        users={users}
        currentUserId={currentUser?.id ?? ""}
      />

      {/* Marque */}
      <section
        className="p-4 lg:p-6 space-y-5"
        style={{ border: "1px solid var(--color-border-line)" }}
      >
        <header>
          <h2 className="text-[0.95rem] lg:text-[1rem] font-medium
                         text-[var(--color-espresso)]">
            Informations de la marque
          </h2>
          <p className="text-[0.78rem] lg:text-[0.82rem]
                        text-[var(--color-espresso)]/55 mt-0.5">
            Affichées dans le footer et les pages publiques
          </p>
        </header>

        <div className="space-y-5">
          <SettingsForm
            settingKey="brand_name"
            label="Nom de la marque"
            defaultValue={settings.brand_name ?? "Kan House"}
          />
          <SettingsForm
            settingKey="brand_tagline"
            label="Tagline"
            defaultValue={
              settings.brand_tagline ?? "Furniture · Interiors · Sourcing"
            }
          />
          <SettingsForm
            settingKey="brand_description"
            label="Description courte"
            defaultValue={settings.brand_description ?? ""}
            textarea
          />
        </div>
      </section>

      {/* Contact */}
      <section
        className="p-4 lg:p-6 space-y-5"
        style={{ border: "1px solid var(--color-border-line)" }}
      >
        <header>
          <h2 className="text-[0.95rem] lg:text-[1rem] font-medium
                         text-[var(--color-espresso)]">
            Contact
          </h2>
          <p className="text-[0.78rem] lg:text-[0.82rem]
                        text-[var(--color-espresso)]/55 mt-0.5">
            Coordonnées affichées sur le site
          </p>
        </header>

        <div className="space-y-5">
          <SettingsForm
            settingKey="contact_email"
            label="Email de contact"
            defaultValue={settings.contact_email ?? "hello@kanhouse.com"}
          />
          <SettingsForm
            settingKey="contact_phone"
            label="Téléphone"
            defaultValue={settings.contact_phone ?? ""}
          />
          <SettingsForm
            settingKey="contact_paris"
            label="Adresse Paris"
            defaultValue={settings.contact_paris ?? "Paris · France"}
          />
          <SettingsForm
            settingKey="contact_shanghai"
            label="Adresse Shanghai"
            defaultValue={settings.contact_shanghai ?? "Shanghai · Chine"}
          />
        </div>
      </section>

      {/* Réseaux */}
      <section
        className="p-4 lg:p-6 space-y-5"
        style={{ border: "1px solid var(--color-border-line)" }}
      >
        <header>
          <h2 className="text-[0.95rem] lg:text-[1rem] font-medium
                         text-[var(--color-espresso)]">
            Réseaux sociaux
          </h2>
          <p className="text-[0.78rem] lg:text-[0.82rem]
                        text-[var(--color-espresso)]/55 mt-0.5">
            Liens affichés dans le footer
          </p>
        </header>

        <div className="space-y-5">
          <SettingsForm
            settingKey="social_instagram"
            label="Instagram"
            defaultValue={settings.social_instagram ?? ""}
          />
          <SettingsForm
            settingKey="social_linkedin"
            label="LinkedIn"
            defaultValue={settings.social_linkedin ?? ""}
          />
          <SettingsForm
            settingKey="social_tiktok"
            label="TikTok"
            defaultValue={settings.social_tiktok ?? ""}
          />
        </div>
      </section>
    </div>
  );
}