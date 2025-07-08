# Agregar Páginas de Plataforma de Servicios

Este documento explica cómo agregar las 6 páginas predefinidas para una plataforma de servicios al proyecto con ID `686c3e7eeef6dc7a76a5252d`.

## 📋 Páginas que se agregarán

### 1. 🧾 Página de Registro/Login
- **Ruta:** `/auth`
- **Descripción:** Permite a los usuarios y profesionales crear una cuenta o acceder a la plataforma
- **Funcionalidades:**
  - Registro con email y contraseña
  - Elección de tipo de perfil: Cliente o Profesional
  - Verificación por correo electrónico
  - Recuperación de contraseña
  - Login con redes sociales (opcional)

### 2. 🏠 Home pública
- **Ruta:** `/`
- **Descripción:** Landing accesible a no registrados, que explica cómo funciona la plataforma
- **Funcionalidades:**
  - Breve explicación de la plataforma
  - Testimonios o reseñas destacadas
  - Botón de "Buscar profesionales"
  - CTA para registro/login

### 3. 🔍 Página de Búsqueda
- **Ruta:** `/search`
- **Descripción:** Interfaz principal donde los usuarios buscan profesionales con filtros
- **Funcionalidades:**
  - Filtro por ubicación (geolocalización, ciudad, código postal)
  - Filtro por categoría de servicios
  - Filtro por disponibilidad (fechas)
  - Filtro por precio o valoración
  - Resultados en listado o mapa

### 4. 🧑‍⚕️ Ficha de Profesional
- **Ruta:** `/professional/:id`
- **Descripción:** Vista pública del perfil profesional, similar a Airbnb o Doctoralia
- **Funcionalidades:**
  - Foto y descripción
  - Servicios ofrecidos
  - Localización en mapa
  - Valoraciones
  - Botón para contactar o reservar
  - Enlace a sesión online si está confirmado

### 5. 📅 Página de Reserva
- **Ruta:** `/booking/:professionalId`
- **Descripción:** Formulario de reserva que permite seleccionar fecha, modalidad y confirmación
- **Funcionalidades:**
  - Calendario con disponibilidad
  - Modalidad online o presencial
  - Envío de email de confirmación
  - Botón para cancelar o modificar
  - Visualización del enlace externo si es online
  - Integración con Stripe o PayPal (si aplica)

### 6. 💳 Página de Pago
- **Ruta:** `/payment/:bookingId`
- **Descripción:** Pasarela de pago segura para completar reservas
- **Funcionalidades:**
  - Cálculo automático de precio
  - Integración con Stripe, PayPal u otros
  - Confirmación de pago
  - Factura/envío de recibo (opcional)

## 🚀 Métodos para agregar las páginas

### Método 1: Usando PowerShell Script (Recomendado)

1. **Obtener token de autenticación:**
   - Abre tu navegador y ve a la aplicación
   - Abre las herramientas de desarrollador (F12)
   - Ve a la consola y ejecuta: `localStorage.getItem('token')`
   - Copia el token

2. **Ejecutar el script:**
   ```powershell
   # Edita el archivo add_service_pages.ps1
   # Reemplaza "TU_TOKEN_AQUI" con tu token real
   
   # Ejecuta el script
   .\add_service_pages.ps1
   ```

### Método 2: Usando Node.js Script

1. **Instalar dependencias:**
   ```bash
   npm install axios
   ```

2. **Ejecutar el script:**
   ```bash
   # Edita el archivo add_pages_script.js
   # Reemplaza "TU_TOKEN_AQUI" con tu token real
   
   node add_pages_script.js
   ```

### Método 3: Usando Postman o cURL

**Endpoint:** `POST http://localhost:3001/api/projects/686c3e7eeef6dc7a76a5252d/add-service-platform-pages`

**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json
```

**Body:** No se requiere body, las páginas están predefinidas en el backend.

**Ejemplo con cURL:**
```bash
curl -X POST \
  http://localhost:3001/api/projects/686c3e7eeef6dc7a76a5252d/add-service-platform-pages \
  -H 'Authorization: Bearer TU_TOKEN_AQUI' \
  -H 'Content-Type: application/json'
```

### Método 4: Usando la función genérica addMultiplePages

**Endpoint:** `POST http://localhost:3001/api/projects/686c3e7eeef6dc7a76a5252d/multiple-pages`

**Body:**
```json
{
  "pages": [
    {
      "name": "Página de Registro/Login",
      "description": "Permite a los usuarios y profesionales crear una cuenta o acceder a la plataforma...",
      "route": "/auth",
      "isEssential": true,
      "priority": 1
    },
    // ... resto de páginas
  ]
}
```

## 📊 Respuesta esperada

```json
{
  "message": "Proceso completado: 6 páginas de plataforma de servicios agregadas exitosamente",
  "totalRequested": 6,
  "totalAdded": 6,
  "totalErrors": 0,
  "addedPages": [
    {
      "id": "uuid-generado",
      "name": "Página de Registro/Login",
      "route": "/auth",
      "description": "Permite a los usuarios y profesionales crear una cuenta..."
    }
    // ... resto de páginas agregadas
  ],
  "project": {
    "id": "686c3e7eeef6dc7a76a5252d",
    "name": "Nombre del Proyecto",
    "totalPages": 6
  }
}
```

## ⚠️ Posibles errores

- **401 Unauthorized:** Token inválido o expirado
- **404 Not Found:** Proyecto no encontrado o sin permisos
- **400 Bad Request:** Alguna página ya existe (ruta duplicada)
- **500 Internal Server Error:** Error del servidor

## 🔧 Funciones implementadas en el backend

### `addServicePlatformPages`
- **Archivo:** `backend/controllers/projectController.js`
- **Ruta:** `POST /api/projects/:id/add-service-platform-pages`
- **Descripción:** Agrega las 6 páginas predefinidas específicamente para plataformas de servicios

### `addMultiplePages` (existente)
- **Archivo:** `backend/controllers/projectController.js`
- **Ruta:** `POST /api/projects/:id/multiple-pages`
- **Descripción:** Función genérica para agregar múltiples páginas personalizadas

## 📝 Notas importantes

1. **Rutas únicas:** El sistema verifica que no existan rutas duplicadas
2. **Autenticación:** Todas las rutas requieren autenticación válida
3. **Permisos:** Solo el propietario del proyecto puede agregar páginas
4. **IDs únicos:** Cada página recibe un UUID único automáticamente
5. **Timestamps:** Se agregan automáticamente `createdAt` a cada página

## 🎯 Próximos pasos

Después de agregar las páginas, puedes:
1. Generar historias de usuario para cada página
2. Configurar la estructura de archivos del proyecto
3. Implementar las funcionalidades específicas de cada página
4. Configurar las rutas en el frontend