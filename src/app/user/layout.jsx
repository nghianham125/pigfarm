import Header from "@/app/user/components/app.header";
import Footer from "@/app/user/components/app.footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* Giao diện bố cục */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
