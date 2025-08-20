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
  const { id: boardId } = useParams(); // viene de la ruta /tableros/[id]
  const [board, setBoard] = useState(null);
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const [users, setUsers] = useState([]);


  // form
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [responsable, setResponsable] = useState("");

  // cargar tablero + tareas
  async function loadData() {
    try {
        setLoading(true);
        setErr(null);
        const resUsers = await api.get("/usuarios");
        setUsers(resUsers.data || []);
        const resBoard = await api.get(`/tableros/${boardId}`);
        const resTareas = await api.get("/tareas");
        // filtramos solo las de este tablero
        setBoard(resBoard.data);
        setTareas((resTareas.data || []).filter((t) => t.boardId === boardId));
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [boardId]);

  // crear tarea
  async function onCreateTask(e) {
    e.preventDefault();
    try {
      setSaving(true);
      setErr(null);

      if (!titulo.trim() || !descripcion.trim() || !fechaLimite || !responsable) {
        setErr("Todos los campos son requeridos");
        setSaving(false);
        return;
      }

      const payload = {
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        fechaLimite,
        responsableId: responsable,
        boardId,
        estado: "pendiente", // por defecto
      };

      await api.post("/tareas", payload);
      setTitulo("");
      setDescripcion("");
      setFechaLimite("");
      setResponsable("");
      await loadData();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function cambiarEstado(tarea) {
  try {
    let nuevoEstado;
    if (tarea.estado === "pendiente") nuevoEstado = "en_progreso";
    else if (tarea.estado === "en_progreso") nuevoEstado = "completada";
    else return; // si ya está completada, no hace nada

    await api.patch(`/tareas/${tarea._id}/estado`, { estado: nuevoEstado });
    await loadData(); // recargar tareas
  } catch (e) {
    setErr(e.message);
  }
}


  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Typography variant="h5" component="h1">
        Tareas del tablero: {board?.nombre}
      </Typography>

      {/* Formulario de creación */}
      <Card>
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
            />
            <TextField
              label="Fecha Límite"
              type="date"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            {/* seleccionar responsable */}
            <FormControl fullWidth>
            <InputLabel>Responsable</InputLabel>
            <Select
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
            >
                {board?.miembros?.map((uid) => {
                const user = users.find((u) => u._id === uid);
                return (
                    <MenuItem key={uid} value={uid}>
                    {user ? user.nombre : uid} {/* 👈 si no encuentra, muestra el id */}
                    </MenuItem>
                );
                })}
            </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              className="self-start"
            >
              {saving ? "Guardando..." : "Crear Tarea"}
            </Button>
          </form>
          {err && <Alert severity="error" className="mt-4">{err}</Alert>}
        </CardContent>
      </Card>

      {/* Lista de tareas */}
      <Card>
        <CardContent>
          {loading ? (
            <Stack direction="row" alignItems="center" gap={2}>
              <CircularProgress size={24} />
              <span>Cargando tareas…</span>
            </Stack>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Responsable</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha Límite</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
                {tareas.map((t) => (
                    <TableRow key={t._id}>
                    <TableCell>{t.titulo}</TableCell>
                    <TableCell>{t.descripcion}</TableCell>
                    <TableCell>
                    {users.find((u) => u._id === t.responsableId)?.nombre || t.responsableId}
                    </TableCell>
                    <TableCell>{t.estado}</TableCell>
                    <TableCell>
                      {t.estado !== "completada" && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => cambiarEstado(t)}
                        >
                          {t.estado === "pendiente" ? "Iniciar" : "Completar"}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                        {t.fechaLimite
                        ? new Date(t.fechaLimite).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    </TableRow>
                ))}

                {tareas.length === 0 && (
                    <TableRow>
                    <TableCell colSpan={5}>Sin tareas aún.</TableCell>
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
