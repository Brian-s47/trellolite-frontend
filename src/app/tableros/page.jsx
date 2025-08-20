"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "../../lib/api.js";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function TablerosPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [boards, setBoards] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [miembros, setMiembros] = useState([]);

  async function loadData() {
    try {
      setLoading(true);
      setErr(null);
      const resBoards = await api.get("/tableros");
      const resUsers = await api.get("/usuarios");
      setBoards(resBoards.data || []);
      setUsers(resUsers.data || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function onCreateBoard(e) {
    e.preventDefault();
    try {
      setSaving(true);
      setErr(null);

      if (!nombre.trim() || !descripcion.trim()) {
        setErr("Nombre y descripción son requeridos");
        setSaving(false);
        return;
      }

      const payload = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        miembros: [userId, ...miembros],
      };

      await api.post("/tableros", payload);
      setNombre("");
      setDescripcion("");
      setMiembros([]);
      await loadData();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  function toggleMiembro(id) {
    setMiembros((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Typography variant="h5" component="h1" className="text-blue-700 font-bold">
        Tableros
      </Typography>

      {/* Formulario de creación */}
      <Card className="shadow-md rounded-lg">
        <CardContent>
          <form onSubmit={onCreateBoard} className="flex flex-col gap-4">
            <TextField
              label="Nombre del tablero"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              fullWidth
            />
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />

            <Typography variant="subtitle1" className="text-gray-700 font-semibold">
              Colaboradores:
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {users
                .filter((u) => u._id !== userId)
                .map((u) => (
                  <FormControlLabel
                    key={u._id}
                    control={
                      <Checkbox
                        checked={miembros.includes(u._id)}
                        onChange={() => toggleMiembro(u._id)}
                        sx={{ color: "#1e40af", "&.Mui-checked": { color: "#1e40af" } }}
                      />
                    }
                    label={u.nombre}
                  />
                ))}
            </div>

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#1e40af", ":hover": { backgroundColor: "#1e3a8a" } }}
              disabled={saving}
              className="self-start"
            >
              {saving ? "Guardando..." : "Crear Tablero"}
            </Button>
          </form>
          {err && <Alert severity="error" className="mt-4">{err}</Alert>}
        </CardContent>
      </Card>

      {/* Lista de tableros */}
      <Card className="shadow-md rounded-lg">
        <CardContent>
          {loading ? (
            <Stack direction="row" alignItems="center" gap={2}>
              <CircularProgress size={24} />
              <span>Cargando tableros…</span>
            </Stack>
          ) : (
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Miembros</TableCell>
                  <TableCell>Creado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {boards.map((b) => (
                  <TableRow key={b._id} hover>
                    <TableCell>{b.nombre}</TableCell>
                    <TableCell>{b.descripcion}</TableCell>
                    <TableCell>{b.miembros?.length || 0}</TableCell>
                    <TableCell>
                      {b.createdAt ? new Date(b.createdAt).toLocaleString() : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: "#1e40af",
                          color: "#1e40af",
                          ":hover": { backgroundColor: "#eff6ff" },
                        }}
                        onClick={() => router.push(`/tableros/${b._id}`)}
                      >
                        Ver Tareas
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {boards.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No hay tableros aún.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
