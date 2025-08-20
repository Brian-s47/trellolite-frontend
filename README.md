# 🎨 TrelloLite - Frontend

**TrelloLite-frontend** es la interfaz web del proyecto **TrelloLite**, una aplicación tipo Trello simplificada para la gestión de tareas en equipos pequeños.  

Este frontend está construido con **Next.js**, **TailwindCSS** y **Material UI**, y se conecta a la API desarrollada en el repositorio [TrelloLite-backend](https://github.com/Brian-s47/TrelloLite-backend).  

---

## ⚙️ Tecnologías usadas

- [Next.js](https://nextjs.org/) - Framework React para frontend moderno.
- [React](https://reactjs.org/) - Librería para construir interfaces.
- [TailwindCSS](https://tailwindcss.com/) - Estilos utilitarios rápidos y personalizables.
- [Material UI](https://mui.com/) - Componentes accesibles y estilizados listos para producción.
- [Git & GitHub](https://github.com/) - Control de versiones y repositorio remoto.
- [Node.js](https://nodejs.org/) - Entorno de ejecución de JavaScript.

---

## 📦 Instalación y ejecución

1. **Clonar el repositorio**
```bash
git clone https://github.com/Brian-s47/TrelloLite-frontend
cd TrelloLite-frontend
```
2. Instalar dependencias:
```bash
npm install
```
3. Ejecutar en modo desarrollo:
```bash
npm run dev
```
4. Abrir en el navegador:
```bash
http://localhost:3000
```
---
```bash
**🖼️ Estructura del proyecto**

TrelloLite-frontend/
├── app/
│   ├── usuarios/          # Vista principal de usuarios
│   │   └── page.jsx
│   ├── tableros/          # Vista de tableros
│   │   ├── page.jsx       # Listado de tableros
│   │   └── [id]/page.jsx  # Tareas por tablero
│   ├── globals.css        # Estilos globales con Tailwind
│   └── layout.js          # Layout principal con header y footer
├── components/            # Componentes reutilizables
│   └── UsersPage.jsx
├── lib/
│   └── api.js             # Helper HTTP para consumir la API
├── public/                # Recursos estáticos
└── README.md
```

**🔗 Repos relacionados**

- Backend - TrelloLite <https://github.com/Brian-s47/TrelloLite-backend>

**🚀 Funcionalidades principales**

- Gestión de usuarios

- Crear usuarios con nombre y email.

- Listado de todos los usuarios con fecha de creación.

- Gestión de tableros

- Crear tableros con nombre, descripción y colaboradores.

- Ver listado de tableros por usuario.

- Gestión de tareas

- Crear tareas con título, descripción, responsable y estado inicial pendiente.

- Asignar tareas a cualquier miembro del tablero.

- Cambiar estado de forma secuencial y lógica:

- pendiente → en_progreso → completada.

- Interfaz moderna y responsiva

- Uso combinado de Material UI y TailwindCSS.

- Paleta azul moderna, tablas con hover, botones estilizados, tarjetas con sombras suaves.
---

**🎯 Próximas mejoras (ideas)**

 Autenticación y login de usuarios.

 Filtros y búsqueda en tableros/tareas.

 Drag & Drop para mover tareas entre estados.

 Integración con base de datos en tiempo real (ej: WebSockets).
 ---

**🔗 Repos relacionados**

Backend - TrelloLite
https://github.com/Brian-s47/TrelloLite-backend
---

**👨‍💻 Autor**

Proyecto desarrollado por Brian Suárez como práctica educativa para aprender frontend con Next.js y conectar con un backend propio en Node.js.
