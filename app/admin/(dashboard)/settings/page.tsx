export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-text">Settings</h1>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-brand-text">Admin Account</p>
          <p className="text-xs text-brand-text/40 mt-1">To change your password, use the setup endpoint or contact your developer.</p>
        </div>
        <div className="border-t border-white/8 pt-4">
          <p className="text-sm font-medium text-brand-text">Database</p>
          <p className="text-xs text-brand-text/40 mt-1">MongoDB Atlas Free Tier · 512MB storage limit · Rate limiting enabled (5 req/60s per IP)</p>
        </div>
        <div className="border-t border-white/8 pt-4">
          <p className="text-sm font-medium text-brand-text">FAQ Seed</p>
          <p className="text-xs text-brand-text/40 mt-1">If you have no FAQs, visit the FAQs page and click &quot;Seed Default FAQs&quot; to populate 8 default AI automation FAQs.</p>
        </div>
      </div>
    </div>
  )
}
