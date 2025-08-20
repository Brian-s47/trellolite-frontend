// zona de importacion de modulos
import UsersPage from "../components/UsersPage"; // Importamos componenete de pa pagina de Usuarios 

// Metadatos (opcional)
export const metadata = {
  title: "Usuarios - TrelloLite",
};

export default function Page() {
  return <UsersPage />;
}
