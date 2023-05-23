import Lines from "./lines"
import logo from "./ChatKinseyLogo.png"

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
      <body>

        <div className="app-container">
          <Lines/>
          <div className="sidebar">
            <img src={logo.src} alt="logo" className="logo"/>
          </div>
          <div className="main-content">{children}</div>
        </div>

      </body>
    </html>
  )
}
