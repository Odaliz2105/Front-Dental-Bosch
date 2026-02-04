🦷 Sistema Web Odontológico – Frontend

Consultorio Dental Bosch

📌 Descripción del proyecto

Este repositorio contiene el componente frontend del Sistema Web Odontológico Dental Bosch, desarrollado como parte del Proyecto de Integración Curricular para la obtención del título de Tecnóloga en Desarrollo de Software.

El frontend permite a los doctores y pacientes interactuar con el sistema de forma intuitiva, segura y eficiente, facilitando la gestión de pacientes, historias clínicas, odontogramas, citas e inventario odontológico, mediante el consumo de servicios REST proporcionados por el backend.

🎯 Objetivo del frontend

Desarrollar una interfaz web moderna que permita:

Gestionar pacientes y sus historias clínicas.

Visualizar y registrar odontogramas digitales.

Administrar citas odontológicas.

Controlar el inventario de insumos odontológicos.

Consumir endpoints del backend de forma segura.

Brindar una experiencia de usuario clara, responsiva y accesible.

👥 Roles del sistema
👩‍⚕️ Doctor

Iniciar sesión y gestionar perfil.

Registrar y administrar pacientes.

Gestionar citas odontológicas.

Registrar tratamientos y odontogramas.

Controlar inventario odontológico.

🧑 Paciente

Iniciar sesión.

Visualizar citas programadas.

Consultar historial clínico y odontograma.

Cancelar y calificar citas.

🛠️ Tecnologías utilizadas
Herramienta	Descripción
React JS	Biblioteca para la construcción de interfaces de usuario basadas en componentes
Vite	Herramienta de desarrollo rápida para proyectos React
JavaScript (ES6+)	Lenguaje principal del frontend
Tailwind CSS	Framework de estilos utilitarios para interfaces responsivas
Axios	Cliente HTTP para consumo de APIs REST
React Router DOM	Manejo de rutas públicas y privadas
React Toastify	Notificaciones visuales para el usuario
Lucide React / React Icons	Iconografía del sistema
🧱 Arquitectura

El frontend sigue el patrón arquitectónico Modelo – Vista – Controlador (MVC) adaptado a React:

Modelo: Gestión del estado y datos consumidos desde el backend.

Vista: Componentes visuales (interfaces y pantallas).

Controlador: Lógica de interacción, consumo de endpoints y validaciones.

Esta arquitectura facilita la escalabilidad, mantenimiento y comprensión del sistema.

📂 Estructura del proyecto
src/
│
├── api/            # Configuración de Axios y endpoints
├── assets/         # Recursos estáticos
├── components/     # Componentes reutilizables
├── context/        # Context API (autenticación, usuario)
├── layouts/        # Estructura general de las vistas
├── pages/          # Vistas principales del sistema
├── routes/         # Rutas públicas y privadas
├── services/       # Servicios de consumo de API
├── utils/          # Funciones auxiliares
├── App.jsx
└── main.jsx

🔐 Seguridad

Autenticación mediante JWT.

Protección de rutas privadas según rol.

Validaciones de formularios.

Manejo seguro de sesiones.

⚙️ Instalación y ejecución
1️⃣ Clonar el repositorio
git clone https://github.com/usuario/dental-bosch-frontend.git

2️⃣ Instalar dependencias
npm install

3️⃣ Ejecutar en entorno de desarrollo
npm run dev


El proyecto se ejecutará en:

http://localhost:5173

🌐 Variables de entorno

Crear un archivo .env en la raíz del proyecto:

VITE_API_URL=http://localhost:4000/api

🧪 Pruebas

Se realizaron pruebas:

Funcionales
De aceptación
De compatibilidad entre navegadores
De rendimiento básico
Los resultados se documentan en los Anexos del proyecto de titulación.

🚀 Despliegue

El frontend fue desplegado en un entorno web utilizando plataformas modernas de despliegue continuo, garantizando accesibilidad, rendimiento y estabilidad.

📄 Contexto académico
Este proyecto forma parte del Trabajo de Titulación de la carrera de Tecnología en Desarrollo de Software, aplicando metodologías ágiles (SCRUM) y buenas prácticas de ingeniería de software.

✍️ Autora

Aracely
Tecnología en Desarrollo de Software
Proyecto de Integración Curricular – Frontend
