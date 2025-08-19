"use client"; //Indicamos a Next que este archivo se renderiza en el cliente

import { useEffect, useState } from "react"; // Hooks de React
import { api } from "../../../lib/api.js"; // helper HTTP "../../lib/api"
import { useRouter } from "next/navigation";
import { Card, CardContent, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Alert, CircularProgress, Stack, Typography } from "@mui/material"; // Componentes de Material UI
/// Componente principal de la pantalla de Usuarios.
export default function UsersPage() {
    //Estados para: lista de usuarios, metadatos (meta.total), indicador de carga, y error.
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    //Estados del formulario para crear usuario y un flag mientras se guarda.
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [saving, setSaving] = useState(false);
    // Funcion para cargar los usuarios
    async function loadUsers() {
        try {
            setLoading(true); //Marca inicio de loading
            setErr(null);
            const { data, meta } = await api.get("/usuarios"); // Obtiene todos los usuarios "GET /usuarios"
            setUsers(data || []); // Actualiza users
            setMeta(meta || null); // Actualiza meta
        } catch (e) {
            setErr(e.message); // Setea el error obtenido
        } finally {
            setLoading(false); //Marca cierre de loading
        }
    }
    // Si todo va bien carla el componenete con los datos obtenidos
    useEffect(() => {
        loadUsers();
    }, 
    []);
    // Funcion para crear usuarios
    async function onCreateUser(e) {
        e.preventDefault(); // Previene recarga de pagina en formulario
        try {
            setSaving(true); //Marca inicio de Saving
            setErr(null);
            const body = { nombre: nombre.trim(), email: email.trim().toLowerCase() }; // Creamos contante de body para envio de datos 
            // Validacion de campos minimos
            if (!body.nombre || !body.email) {
                setErr("Nombre y email son requeridos");
                setSaving(false); //Marca cierre de Saving
                return; // Caso de Error y salida
            }
            await api.post("/usuarios", body);// En caso de tod ir bien hacemos metodo post a usuarios con body
            setNombre(""); // Limpiamos los datos de formuilario
            setEmail("");// Limpiamos los datos de formuilario
            await loadUsers(); 
        } catch (e) {
            setErr(e.message); // obtenemos el erro y lo seteamos para mostrarlo
        } finally {
            setSaving(false); //Marca cierre de Saving
        }
    }
    // Si todo sale bien retornoamos el componente creado
    const router = useRouter();
    return (
    <div className="max-w-5xl mx-auto space-y-6">
        <Typography variant="h5" component="h1">Usuarios</Typography>

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
                </TableBody>
                </Table>
            </>
            )}
        </CardContent>
        </Card>
    </div>
    );
}
