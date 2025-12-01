# Front-Dental-Bosch

Frontend del proyecto **Consultorio Dental Bosch** desarrollado con **Vite**, **React** y **Tailwind CSS**.

---

## 🔹 Tecnologías utilizadas

- **React** – Librería para construir la interfaz.  
- **Vite** – Build tool y servidor de desarrollo rápido.  
- **Tailwind CSS** – Framework de estilos utilitarios.  
- **JavaScript / JSX** – Lógica de componentes.  
- **Render** – Plataforma para desplegar el frontend.

---

## 🔹 Estructura del proyecto

<img width="450" height="459" alt="image" src="https://github.com/user-attachments/assets/07604a51-b618-46f7-a027-6ebcb30bb6ba" />

---

## 🔹 Variables de entorno

Para que el frontend funcione correctamente, se deben configurar las siguientes variables en `.env` o en la plataforma de despliegue:

```env
VITE_API_URL=https://backend-dental-bosch.onrender.com
VITE_BACKEND_URL=https://backend-dental-bosch.onrender.com
VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY_DE_GOOGLE

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (solo local)
npm run dev

# Generar build para producción
npm run build

# Previsualizar el build local
npm run preview
