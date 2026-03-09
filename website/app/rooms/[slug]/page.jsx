import { hotelAPI } from '../../../lib/supabase'
import RoomDetailClient from '../../../components/pages/RoomDetailClient'

export async function generateMetadata({ params }) {
  try {
    const room = await hotelAPI.getRoom(params.slug)
    return {
      title: room?.name || 'Room',
      description: room?.description || 'Discover this room at Seagonia Hotel.',
    }
  } catch {
    return { title: 'Room' }
  }
}

export default function RoomDetailPage({ params }) {
  return <RoomDetailClient slug={params.slug} />
}
