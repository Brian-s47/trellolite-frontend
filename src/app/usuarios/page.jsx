// zona de importacion de modulos
import UsersPage from "../components/usuarios/UsersPage.jsx"; // Importamos componenete de pa pagina de Usuarios "../../components/usuarios/UsersPage.jsx"

// Metadatos de la pagina para Next (SEO, título)
export const metadata = {
  title: "Usuarios | TrelloLite",
};
//Server Component que delega para asi mantener la ruta
export default function Page() {
  return <UsersPage />;
}
