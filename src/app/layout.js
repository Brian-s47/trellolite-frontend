import "./globals.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export const metadata = {
  title: "TrelloLite Frontend",
  description: "Frontend de la API TrelloLite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: "#1e40af" }}>
          <Toolbar className="flex justify-between">
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              <Link href="/" className="text-white no-underline">
                TrelloLite
              </Link>
            </Typography>
            <nav className="space-x-4">
              <Link href="/usuarios" className="text-gray-100 hover:underline">
                Usuarios
              </Link>
              <Link href="/tableros" className="text-gray-100 hover:underline">
                Tableros
              </Link>
            </nav>
          </Toolbar>
        </AppBar>

        {/* Contenido dinámico */}
        <main className="flex-grow p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 text-center p-4 text-sm">
          © 2025 TrelloLite - Backend & Frontend
        </footer>
      </body>
    </html>
  );
}
