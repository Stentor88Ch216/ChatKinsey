import Lines from "./lines"
import logo from "./images/ChatKinseyLogoHD.png"
import Image from "next/image"

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

        {/** 
        <div className="app-container">
          <Lines/>
          <div className="sidebar">
            <Image src={logo} alt="logo" className="logo"></Image>
          </div>
          <div className="main-content">{children}</div>
        </div>
        */}

      {children}

      </body>
    </html>
  )
}
