import dotenv from 'dotenv';


dotenv.config();

export const metadata = {
  title: 'ChatKinsey',
  description: 'A case study training AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
