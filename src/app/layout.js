// Zona de importacion de modulos
import "./globals.css"; // Importacion de estilos globales -> se definieron con "TailwindCSS"
import { AppBar, Toolbar, Typography } from "@mui/material"; // Componentes de Material UI -> barra superior (AppBar), su contenedor interno (Toolbar) y el texto estilizado (Typography)

// Definicion de información -> (título y descripción)
export const metadata = {
  title: "TrelloLite Frontend",
  description: "Frontend de la API TrelloLite",
};
//Exporta componente principal de layout.
export default function RootLayout({ children }) { // { children } → Prop especial para contenido dinámico
  return (
    <html lang="es"> 
      <body className="flex flex-col min-h-screen"> 
      {/*body {
        display: flex; flexbox activado
        flex-direction: column; los hijos se apilan en columna
        min-height: 100vh; ocupa mínimo el alto total de la pantalla  
      }*/}
        {/* Header fijo */}
        <AppBar position="static"> {/* Barra de navegacion Fija -> Fija superir sin scroll para contrario seria: "fixed" */}
          <Toolbar> {/* Asegura que el contenido dentro tenga espaciado y alineación adecuada. */}
            <Typography variant="h6" component="div"> {/* Muestra el texto "TrelloLite" con estilo h6 (un heading pequeño)*/}
              TrelloLite
            </Typography> 
          </Toolbar>
        </AppBar>

        {/* Main dinámico */}
        <main className="flex-grow p-6 bg-gray-50">{children}</main> {/* main → contiene el contenido dinámico de la aplicación. / children → aquí Next.js renderiza la página que corresponda (usuarios, tableros, tareas, etc). */}
        {/*main {
          flex-grow: 1;  ocupa todo el espacio disponible 
          padding: 1.5rem;  6 de Tailwind = 1.5rem = 24px aprox 
          background-color: #f9fafb;  gris muy claro (bg-gray-50) 
        }*/}
        {/* Footer fijo */}
        <footer className="bg-gray-200 text-center p-4"> {/* footer fijo al final de la página.*/}
        {/*footer {
          background-color: #e5e7eb; gris más fuerte (bg-gray-200)
          text-align: center; centra el texto horizontalmente 
          padding: 1rem; 4 de Tailwind = 1rem = 16px 
        */}
          <p>© 2025 TrelloLite - Backend & Frontend</p>
        </footer>
      </body>
    </html>
  );
}
