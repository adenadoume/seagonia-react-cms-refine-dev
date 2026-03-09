import { Link } from 'react-router-dom'
import { useAdminStats } from '../hooks/useAdmin'

function StatCard({ label, value, path, accent }) {
  return (
    <Link
      to={path}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gold transition-colors"
    >
      <div className={`text-3xl font-semibold ${accent || 'text-navy'}`}>{value ?? '—'}</div>
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </Link>
  )
}

export default function Dashboard() {
  const { data: stats } = useAdminStats()

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Seagonia Hotel CMS overview</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Rooms" value={stats?.rooms} path="/rooms" />
        <StatCard label="Gallery Images" value={stats?.gallery} path="/gallery" />
        <StatCard label="Testimonials" value={stats?.testimonials} path="/testimonials" />
        <StatCard
          label="New Messages"
          value={stats?.newMessages}
          path="/messages"
          accent={stats?.newMessages > 0 ? 'text-blue-600' : 'text-navy'}
        />
      </div>

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Quick Access
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'Edit Home Page', path: '/pages' },
          { label: 'Manage Rooms', path: '/rooms' },
          { label: 'Manage Gallery', path: '/gallery' },
          { label: 'Manage Testimonials', path: '/testimonials' },
          { label: 'Hotel Settings', path: '/settings' },
          { label: 'View Messages', path: '/messages' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-white border border-gray-200 rounded px-4 py-3 text-sm text-gray-700 hover:border-gold hover:text-gold transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
