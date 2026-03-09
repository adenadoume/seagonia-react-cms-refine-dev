import { Suspense } from 'react'
import BookClient from '../../components/pages/BookClient'

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-400">Loading...</div>}>
      <BookClient />
    </Suspense>
  )
}
