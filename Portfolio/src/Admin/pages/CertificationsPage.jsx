import { useRef, useState } from "react";
import useAdminPortfolio from "../hooks/useAdminPortfolio";
import { uploadCertificationImage } from "../api/client";
import {
  AdminCard,
  AdminCardSave,
  AdminField,
  AdminListActions,
  AdminPage,
  adminInputClass,
} from "../components/AdminUi";

function newId() {
  return `cert-${crypto.randomUUID().slice(0, 8)}`;
}

function CertificationImageInput({ value, onChange, certId }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Could not read file"));
        reader.readAsDataURL(file);
      });

      const res = await uploadCertificationImage(dataUrl, certId);
      onChange(res.imageUrl);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <img
          src={value}
          alt="Certification preview"
          className="h-24 w-auto rounded-lg border border-white/10 object-cover"
        />
      )}
      <div className="flex gap-2 items-center">
        <input
          className={adminInputClass}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter image URL or upload..."
        />
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          ref={fileRef}
          onChange={handleUpload}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="rounded-full bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2.5 text-xs font-semibold text-foreground disabled:opacity-50 whitespace-nowrap shrink-0 transition-colors"
        >
          {uploading ? "Uploading…" : "Upload file"}
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function CertificationsPage() {
  const { portfolio, loading, saving, setPortfolio, save, isSaving, cardStatus } =
    useAdminPortfolio();
  if (loading || !portfolio) return <p className="text-muted-foreground">Loading…</p>;

  const { certifications } = portfolio;

  const updateCert = (i, patch) => {
    const next = [...certifications];
    next[i] = { ...next[i], ...patch };
    setPortfolio((p) => ({ ...p, certifications: next }));
  };

  return (
    <AdminPage
      title="Certifications"
      subtitle="Edit each certification and save from its card."
      actions={
        <button
          type="button"
          onClick={() =>
            setPortfolio((p) => ({
              ...p,
              certifications: [
                {
                  id: newId(),
                  title: "New certification",
                  issuer: "",
                  credentialId: "",
                  issuedDate: "",
                  expirationDate: "",
                  credentialUrl: "",
                  imageUrl: "",
                  description: "",
                  skills: [],
                  displayOrder: 0,
                  archived: false,
                },
                ...p.certifications,
              ],
            }))
          }
          className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300"
        >
          + New certification
        </button>
      }
    >
      {certifications.length === 0 && (
        <p className="text-sm text-muted-foreground mb-4">No certifications yet.</p>
      )}

      {certifications.map((cert, i) => {
        const scope = `cert-${cert.id || i}`;
        return (
          <AdminCard
            key={cert.id || i}
            title={
              <span className="flex items-center gap-2">
                {cert.title}
                {cert.archived && (
                  <span className="text-[10px] font-mono uppercase text-muted-foreground border border-white/10 px-2 py-0.5 rounded-full">
                    Archived
                  </span>
                )}
              </span>
            }
          >
            {[
              ["title", "Title"],
              ["issuer", "Issuing organization"],
              ["credentialId", "Credential ID"],
              ["issuedDate", "Issued date"],
              ["expirationDate", "Expiration date"],
              ["credentialUrl", "Verification URL"],
              ["displayOrder", "Display order"],
            ].map(([key, label]) => (
              <AdminField key={key} label={label}>
                <input
                  className={adminInputClass}
                  value={cert[key] ?? ""}
                  type={key === "displayOrder" ? "number" : "text"}
                  onChange={(e) => updateCert(i, { [key]: key === "displayOrder" ? Number(e.target.value) : e.target.value })}
                />
              </AdminField>
            ))}
            <AdminField label="Description">
              <textarea className={adminInputClass} rows="3" value={cert.description ?? ""} onChange={(e) => updateCert(i, { description: e.target.value })} />
            </AdminField>
            <AdminField label="Skills (comma separated)">
              <input className={adminInputClass} value={(cert.skills ?? []).join(", ")} onChange={(e) => updateCert(i, { skills: e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean) })} placeholder="Python, FastAPI, SQL" />
            </AdminField>
            <AdminField label="Credential image">
              <CertificationImageInput
                value={cert.imageUrl || cert.image}
                onChange={(imageUrl) => updateCert(i, { imageUrl })}
                certId={cert.id || scope}
              />
            </AdminField>
            <AdminListActions
              archived={cert.archived}
              onArchive={() => updateCert(i, { archived: !cert.archived })}
              onDelete={() => {
                const next = {
                  ...portfolio,
                  certifications: certifications.filter((_, idx) => idx !== i),
                };
                setPortfolio(next);
                save("page", next);
              }}
            />
            <AdminCardSave
              onSave={() => save(scope)}
              saving={isSaving(scope)}
              saveLocked={saving}
              {...cardStatus(scope)}
            />
          </AdminCard>
        );
      })}
    </AdminPage>
  );
}
