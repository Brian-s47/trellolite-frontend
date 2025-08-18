# 🎨 TrelloLite - Frontend

**TrelloLite-frontend** es la interfaz web del proyecto **TrelloLite**, una aplicación tipo Trello simplificada para la gestión de tareas en equipos pequeños.  
Este frontend está construido con **Next.js**, **TailwindCSS** y **Material UI**, y se conecta a la API desarrollada en el repositorio [TrelloLite-backend](https://github.com/Brian-s47/TrelloLite-backend).

---

## ⚙️ Tecnologías usadas

- [Next.js](https://nextjs.org/) - Framework React para frontend moderno
- [React](https://reactjs.org/) - Librería para construir interfaces
- [TailwindCSS](https://tailwindcss.com/) - Estilos utilitarios
- [Material UI](https://mui.com/) - Componentes preconstruidos y accesibles
- [Git & GitHub](https://github.com/) - Control de versiones

---

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone <https://github.com/Brian-s47/TrelloLite-frontend>
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
**🔗 Repos relacionados**

- Backend - TrelloLite <https://github.com/Brian-s47/TrelloLite-backend>

## 🖼️ Layout base

Se configuró el `RootLayout` en Next.js para que toda la aplicación tenga:

- **Header fijo** con AppBar de Material UI.
- **Main dinámico** donde se renderizan las páginas.
- **Footer fijo** con información del proyecto.

Esto asegura consistencia visual y prepara la app para integrar las vistas de usuarios, tableros y tareas.
