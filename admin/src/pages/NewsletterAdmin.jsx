import { useAdminNewsletter } from '../hooks/useAdmin'

export default function NewsletterAdmin() {
  const { data: subscribers, isLoading } = useAdminNewsletter()

  if (isLoading) return <div className="p-8 text-slate-400">Loading...</div>

  const active = subscribers?.filter((s) => s.is_active).length ?? 0

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-white mb-1">Newsletter</h1>
      <p className="text-slate-400 text-sm mb-6">{active} active subscribers</p>

      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="px-4 py-3 text-slate-400 font-medium">Email</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map((sub) => (
              <tr key={sub.id} className="border-b border-slate-700/50">
                <td className="px-4 py-3 text-slate-300">{sub.email}</td>
                <td className="px-4 py-3">
                  <span className={sub.is_active ? 'badge-published' : 'badge-draft'}>
                    {sub.is_active ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">
                  {new Date(sub.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {subscribers?.length === 0 && (
          <div className="text-center text-slate-400 py-12">No subscribers yet</div>
        )}
      </div>
    </div>
  )
}
