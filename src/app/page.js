"use client";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="max-w-lg w-full shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 p-6">
          <Typography variant="h4" component="h1" className="text-blue-600 font-bold">
            TrelloLite Frontend 🚀
          </Typography>
          <Typography variant="body1" align="center">
            Bienvenido a <strong>TrelloLite</strong>, una app sencilla para la
            gestión de tableros y tareas, creada como práctica educativa.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push("/usuarios")}
          >
            Ingresar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
