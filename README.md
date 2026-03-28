# Body Control San Ramón

Aplicación web moderna para un gimnasio ubicado en San Ramón, Costa Rica.
Diseñada para ofrecer una experiencia visual atractiva, navegación fluida y acceso a programas de entrenamiento, planes y contenido fitness.

---

## Tecnologías utilizadas

- React.js
- React Router DOM
- CSS3

---

## Características principales

### Programas de entrenamiento

- Navegación dinámica entre programas (`/program/:id`)
- Vista detallada con:
  - Nivel
  - Duración
  - Beneficios
  - Ejercicios
  - Tips

- UI estilo "videojuego selection" (hover effects)

---

### Planes de membresía

- Planes:
  - Inicial
  - Intermedio
  - Avanzado
  - Elite

- Tarjetas interactivas con beneficios
- Integración con pantalla de checkout
- Flujo:

  ```
  Planes → Checkout → Pago
  ```

---

### Hero Section

- Video de fondo fullscreen
- Overlay degradado para efecto cinematográfico
- Botón con efecto gold premium (shine animation)

---

### Navegación avanzada

- React Router implementado
- Navegación SPA sin recargas
- Scroll a secciones con hash links:
  - `/#training`
  - `/#plans`

- Navbar responsive con menú móvil

---

## Estructura del proyecto

```
src/
│
├── App.jsx
├── main.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Programs.jsx
│   ├── ProgramDetail.jsx
│   ├── Plans.jsx
│   ├── Checkout.jsx
│   ├── Products.jsx
│   ├── Gallery.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
│
├── styles/
│   ├── App.css
│   ├── Hero.css
│   ├── Programs.css
│   ├── ProgramDetail.css
│   ├── Plans.css
│   └── Checkout.css
│
└── assets/
    ├── images/
    ├── videos/
    └── fonts/
```

---

## Instalación y uso

```bash
# Clonar repositorio
git clone https://github.com/luisbossa/Gym-Website

# Entrar al proyecto
cd Gym-Website

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

---

## Rutas principales

| Ruta              | Descripción         |
| ----------------- | ------------------- |
| `/`               | Página principal    |
| `/program/:id`    | Detalle de programa |
| `/checkout/:plan` | Pago de plan        |

---

## Responsive Design

- Mobile
- Tablet
- Desktop

Uso de:

- `clamp()`
- `flexbox`
- `grid`

---

## Funcionalidades destacadas

- Navegación sin recarga (SPA)
- Scroll inteligente entre secciones
- Separación de layouts (Home vs ProgramDetail)
- Hover interactivo tipo gaming UI

---

## Mejoras futuras

- Integración con pasarela de pago (Stripe / PayPal)
- Autenticación de usuarios
- Dashboard de progreso
- Backend con Node.js / Express
- Base de datos (MongoDB)

---

## Sobre el proyecto

Este proyecto fue desarrollado como una experiencia digital para representar un gimnasio moderno en Costa Rica, enfocado en:

- Motivación visual
- Experiencia de usuario fluida
- Branding fuerte (negro + dorado)
- Escalabilidad futura

---

## Autor

Desarrollado por **Bstudio**

---

## Licencia

Este proyecto es de uso educativo y personal.
