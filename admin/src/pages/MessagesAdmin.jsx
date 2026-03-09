import { useState } from 'react'
import { useAdminMessages, useUpdateMessageStatus } from '../hooks/useAdmin'

export default function MessagesAdmin() {
  const { data: messages, isLoading } = useAdminMessages()
  const updateStatus = useUpdateMessageStatus()
  const [expanded, setExpanded] = useState(null)

  function toggleExpand(id) {
    setExpanded((prev) => (prev === id ? null : id))
  }

  if (isLoading) return <div className="p-8 text-slate-400">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-white mb-6">
        Contact Messages
        {messages?.filter((m) => m.status === 'new').length > 0 && (
          <span className="ml-2 badge-new">
            {messages.filter((m) => m.status === 'new').length} new
          </span>
        )}
      </h1>

      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="px-4 py-3 text-slate-400 font-medium">Name</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Email</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Subject</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((msg) => (
              <>
                <tr
                  key={msg.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer"
                  onClick={() => toggleExpand(msg.id)}
                >
                  <td className="px-4 py-3 font-medium text-slate-200">{msg.name}</td>
                  <td className="px-4 py-3 text-slate-400">{msg.email}</td>
                  <td className="px-4 py-3 text-slate-400">{msg.subject || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={msg.status === 'new' ? 'badge-new' : 'badge-read'}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {expanded === msg.id ? '▲' : '▼'}
                  </td>
                </tr>
                {expanded === msg.id && (
                  <tr key={`${msg.id}-expanded`} className="bg-slate-700/20">
                    <td colSpan={6} className="px-4 py-4">
                      <p className="text-slate-300 whitespace-pre-wrap mb-3">{msg.message}</p>
                      {msg.phone && <p className="text-slate-500 text-xs mb-3">Phone: {msg.phone}</p>}
                      <div className="flex gap-2">
                        {msg.status === 'new' && (
                          <button
                            className="btn-secondary text-xs"
                            onClick={(e) => { e.stopPropagation(); updateStatus.mutate({ id: msg.id, status: 'read' }) }}
                          >
                            Mark as Read
                          </button>
                        )}
                        {msg.status !== 'archived' && (
                          <button
                            className="btn-secondary text-xs"
                            onClick={(e) => { e.stopPropagation(); updateStatus.mutate({ id: msg.id, status: 'archived' }) }}
                          >
                            Archive
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {messages?.length === 0 && (
          <div className="text-center text-slate-400 py-12">No messages yet</div>
        )}
      </div>
    </div>
  )
}
