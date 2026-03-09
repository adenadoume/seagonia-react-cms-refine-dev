import { useAdminNewsletter } from '../hooks/useAdmin'

export default function NewsletterAdmin() {
  const { data: subscribers, isLoading } = useAdminNewsletter()

  if (isLoading) return <div className="p-8 text-gray-400">Loading...</div>

  const active = subscribers?.filter((s) => s.is_active).length ?? 0

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Newsletter</h1>
      <p className="text-gray-400 text-sm mb-6">{active} active subscribers</p>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 text-gray-500 font-medium">Email</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Status</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map((sub) => (
              <tr key={sub.id} className="border-b border-gray-50">
                <td className="px-4 py-3">{sub.email}</td>
                <td className="px-4 py-3">
                  <span className={sub.is_active ? 'badge-published' : 'badge-draft'}>
                    {sub.is_active ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(sub.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {subscribers?.length === 0 && (
          <div className="text-center text-gray-400 py-12">No subscribers yet</div>
        )}
      </div>
    </div>
  )
}
