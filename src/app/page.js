"use client";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="max-w-lg w-full shadow-lg rounded-xl">
        <CardContent className="flex flex-col items-center gap-6 p-8">
          <Typography variant="h4" component="h1" className="text-blue-700 font-extrabold">
            TrelloLite Frontend 🚀
          </Typography>
          <Typography variant="body1" align="center" className="text-gray-700">
            Bienvenido a <strong>TrelloLite</strong>, una app educativa sencilla
            para la gestión de tableros y tareas.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#1e40af", ":hover": { backgroundColor: "#1e3a8a" } }}
            onClick={() => router.push("/usuarios")}
          >
            Ingresar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
