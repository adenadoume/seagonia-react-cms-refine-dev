import QueryProvider from '../components/providers/QueryProvider'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import './globals.css'

export const metadata = {
  title: {
    default: 'Seagonia Hotel — Your Corner by the Sea',
    template: '%s | Seagonia Hotel',
  },
  description: 'A boutique 58-room hotel in Pogonia village near Paleros, on the Ionian coast of Greece.',
  openGraph: {
    siteName: 'Seagonia Hotel',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
