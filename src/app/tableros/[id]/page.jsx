"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "../../../lib/api.js";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function TareasPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [responsable, setResponsable] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setErr(null);
      const resTasks = await api.get(`/tareas?boardId=${id}`);
      const resUsers = await api.get("/usuarios");
      setTasks(resTasks.data || []);
      setUsers(resUsers.data || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  async function onCreateTask(e) {
    e.preventDefault();
    try {
      setSaving(true);
      setErr(null);

      if (!titulo.trim() || !responsable) {
        setErr("Título y responsable son requeridos");
        setSaving(false);
        return;
      }

      const payload = {
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        responsableId: responsable,
        boardId: id,
      };

      await api.post("/tareas", payload);
      setTitulo("");
      setDescripcion("");
      setResponsable("");
      await loadData();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function onChangeEstado(task, nextEstado) {
    try {
      await api.put(`/tareas/${task._id}`, { estado: nextEstado });
      await loadData();
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Typography variant="h5" component="h1" className="text-blue-700 font-bold">
        Tareas
      </Typography>

      {/* Formulario */}
      <Card className="shadow-md rounded-lg">
        <CardContent>
          <form onSubmit={onCreateTask} className="flex flex-col gap-4">
            <TextField
              label="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
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
            <FormControl fullWidth>
              <InputLabel>Responsable</InputLabel>
              <Select
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
                label="Responsable"
              >
                {users.map((u) => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#1e40af", ":hover": { backgroundColor: "#1e3a8a" } }}
              disabled={saving}
              className="self-start"
            >
              {saving ? "Guardando..." : "Crear Tarea"}
            </Button>
          </form>
          {err && <Alert severity="error" className="mt-4">{err}</Alert>}
        </CardContent>
      </Card>

      {/* Lista */}
      <Card className="shadow-md rounded-lg">
        <CardContent>
          {loading ? (
            <Stack direction="row" alignItems="center" gap={2}>
              <CircularProgress size={24} />
              <span>Cargando tareas…</span>
            </Stack>
          ) : (
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Responsable</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Creado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((t) => (
                  <TableRow key={t._id} hover>
                    <TableCell>{t.titulo}</TableCell>
                    <TableCell>{t.descripcion}</TableCell>
                    <TableCell>
                      {users.find((u) => u._id === t.responsableId)?.nombre || "-"}
                    </TableCell>
                    <TableCell className="capitalize">{t.estado}</TableCell>
                    <TableCell>
                      {t.createdAt ? new Date(t.createdAt).toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="space-x-2">
                      {t.estado === "pendiente" && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => onChangeEstado(t, "en_progreso")}
                        >
                          Iniciar
                        </Button>
                      )}
                      {t.estado === "en_progreso" && (
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ backgroundColor: "green", ":hover": { backgroundColor: "darkgreen" } }}
                          onClick={() => onChangeEstado(t, "completada")}
                        >
                          Completar
                        </Button>
                      )}
                      {t.estado === "completada" && (
                        <span className="text-green-700 font-semibold">✔ Finalizada</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {tasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay tareas aún.
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
