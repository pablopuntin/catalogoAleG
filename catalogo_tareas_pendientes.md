## 🧾 Proyecto: Catálogo de Ropa – Tareas Pendientes y Mejoras (Julio 2025)

### ✅ Estado actual
- Backend en Node.js + Express
- Base de datos MongoDB Atlas
- Cloudinary implementado con Multer para subir imágenes
- Backend desplegado en Render
- Frontend modularizado en JavaScript + HTML + Bootstrap
- Frontend desplegado en Vercel
- Funciona login de administrador y logout
- CRUD:
  - Crear: ✅
  - Eliminar: ✅
  - Editar: 🟨 (botón hecho, pero la funcionalidad no funciona todavía)

---

### 📌 Tareas pendientes

#### 🔐 Administración
- [ ] Reemplazar el login por `prompt()` con un **formulario de login en pantalla** (input tipo `password` para que no se vea lo que se escribe)
- [ ] Quitar credenciales hardcodeadas del frontend (usuario y contraseña están en código)
- [ ] Crear lógica para que la administradora pueda **definir usuario y contraseña al iniciar por primera vez** y que quede **guardado de forma segura**
- [ ] Mostrar botón "Volver al formulario" cuando un administrador está logueado y navega a otras secciones
- [ ] Implementar cierre de sesión automático por inactividad (3 a 5 minutos)

#### 📦 Subcategorías y visualización
- [ ] Crear **cards estáticas por subcategoría** (ej: Biker, Capri, Short, etc.) con botón "Ver catálogo"
- [ ] Al hacer clic en esas cards, cargar dinámicamente los productos filtrados de esa subcategoría
- [ ] Si no hay productos en una subcategoría, mostrar un mensaje más claro y visual (texto más grande, color más llamativo)

#### 🎨 Estilos y experiencia de usuario
- [ ] Mejorar contraste del fondo (más oscuro) para que resalten mejor las imágenes
- [ ] Ajustar diseño responsivo de imágenes dinámicas para que coincidan visualmente con las cards estáticas

#### ⚙️ Funcionalidad técnica
- [ ] Corregir funcionalidad del botón **Editar producto**
- [ ] Manejo correcto del campo `disponible` como array (`split(',').map()`)
- [ ] Agregar `try/catch` y manejo de errores en todos los controladores del backend
- [ ] Mejorar mensajes de error/success en el frontend (visuales y en consola)
- [ ] Verificar y ajustar `window.env.API_URL` para deploy correcto en Vercel

---

### ✍️ Documentación pendiente
- Descripción general del proyecto
- Tecnologías utilizadas
- Estructura de carpetas (back y front)
- Funcionamiento para el usuario común y para el administrador
- Instrucciones para clonar, instalar y desplegar
- Posibles mejoras futuras

---

Este archivo sirve como base para planificar y documentar el estado del proyecto. Se actualizará a medida que se completen los puntos.

