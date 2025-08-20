"use client";

import { useEffect, useState } from "react"; // Hooks de React
import { useRouter } from "next/navigation";
import { api } from "../../lib/api.js"; // helper HTTP (ajusta la ruta si tu api.js está en otro sitio)
import {
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

// Componente principal de la pantalla de Usuarios.
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const router = useRouter();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  // Cargar usuarios
  async function loadUsers() {
    try {
      setLoading(true);
      setErr(null);
      const { data, meta } = await api.get("/usuarios");
      setUsers(data || []);
      setMeta(meta || null);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // Crear usuario
  async function onCreateUser(e) {
    e.preventDefault();
    try {
      setSaving(true);
      setErr(null);
      const body = {
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
      };
      if (!body.nombre || !body.email) {
        setErr("Nombre y email son requeridos");
        setSaving(false);
        return;
      }
      await api.post("/usuarios", body);
      setNombre("");
      setEmail("");
      await loadUsers();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Typography variant="h5" component="h1">
        Usuarios
      </Typography>

      {/* Formulario de creación */}
      <Card>
        <CardContent>
          <form onSubmit={onCreateUser} className="flex flex-col md:flex-row gap-4">
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Guardando..." : "Crear"}
            </Button>
          </form>
          {err && <Alert severity="error" className="mt-4">{err}</Alert>}
        </CardContent>
      </Card>

      {/* Tabla de usuarios */}
      <Card>
        <CardContent>
          {loading ? (
            <Stack direction="row" alignItems="center" gap={2}>
              <CircularProgress size={24} />
              <span>Cargando usuarios…</span>
            </Stack>
          ) : (
            <>
              <div className="mb-2 text-sm text-gray-600">
                {meta?.total != null ? `Total: ${meta.total}` : null}
              </div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Creado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u._id}>
                    <TableCell>{u.nombre}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                        {u.createdAt ? new Date(u.createdAt).toLocaleString() : "-"}
                    </TableCell>
                    <TableCell>
                        <Button
                        variant="outlined"
                        size="small"
                        onClick={() => router.push(`/tableros?userId=${u._id}`)}
                        >
                        Ver Tableros
                        </Button>
                    </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3}>Sin usuarios aún.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
