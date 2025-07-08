const axios = require('axios');

// Configuración
const BASE_URL = 'http://localhost:3001/api';
const PROJECT_ID = '686c3e7eeef6dc7a76a5252d';

// Token de autenticación - DEBES REEMPLAZAR ESTO CON UN TOKEN VÁLIDO
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZjM2RmZGVlZjZkYzdhNzZhNTI1MTQiLCJpYXQiOjE3NTE5MjQyNTksImV4cCI6MTc1MjUyOTA1OX0.L7yuBeHR5IGf6P6MsNyJgInVOTZrrGwqq9PnEbyzVzs'; // Obtén esto del localStorage o de una sesión activa

// Páginas a agregar
const pagesToAdd = [
  {
    name: 'Página de Registro/Login',
    description: 'Permite a los usuarios y profesionales crear una cuenta o acceder a la plataforma. Incluye registro con email y contraseña, elección de tipo de perfil (Cliente o Profesional), verificación por correo electrónico, recuperación de contraseña y login con redes sociales (opcional).',
    route: '/auth',
    isEssential: true,
    priority: 1,
    generatedByAI: false
  },
  {
    name: 'Home pública',
    description: 'Landing accesible a no registrados, que explica cómo funciona la plataforma, con CTA para registrarse o buscar servicios. Incluye breve explicación de la plataforma, testimonios o reseñas destacadas, botón de "Buscar profesionales" y CTA para registro/login.',
    route: '/',
    isEssential: true,
    priority: 2,
    generatedByAI: false
  },
  {
    name: 'Página de Búsqueda',
    description: 'Interfaz principal donde los usuarios buscan profesionales con filtros. Incluye filtro por ubicación (geolocalización, ciudad, código postal), filtro por categoría de servicios, filtro por disponibilidad (fechas), filtro por precio o valoración, y resultados en listado o mapa.',
    route: '/search',
    isEssential: true,
    priority: 3,
    generatedByAI: false
  },
  {
    name: 'Ficha de Profesional',
    description: 'Vista pública del perfil profesional, similar a Airbnb o Doctoralia. Incluye foto y descripción, servicios ofrecidos, localización en mapa, valoraciones, botón para contactar o reservar, y enlace a sesión online si está confirmado.',
    route: '/professional/:id',
    isEssential: true,
    priority: 4,
    generatedByAI: false
  },
  {
    name: 'Página de Reserva',
    description: 'Formulario de reserva que permite seleccionar fecha, modalidad (online/presencial), y confirmación. Incluye calendario con disponibilidad, modalidad online o presencial, envío de email de confirmación, botón para cancelar o modificar, visualización del enlace externo si es online, e integración con Stripe o PayPal (si aplica).',
    route: '/booking/:professionalId',
    isEssential: true,
    priority: 5,
    generatedByAI: false
  },
  {
    name: 'Página de Pago',
    description: 'Pasarela de pago segura para completar reservas (si el plan lo permite). Incluye cálculo automático de precio, integración con Stripe, PayPal u otros, confirmación de pago, y factura/envío de recibo (opcional).',
    route: '/payment/:bookingId',
    isEssential: true,
    priority: 6,
    generatedByAI: false
  }
];

async function addPagesToProject() {
  try {
    console.log('🚀 Iniciando proceso de agregar páginas al proyecto...');
    console.log(`📋 Proyecto ID: ${PROJECT_ID}`);
    console.log(`📄 Páginas a agregar: ${pagesToAdd.length}`);
    
    const response = await axios.post(
      `${BASE_URL}/projects/${PROJECT_ID}/multiple-pages`,
      { pages: pagesToAdd },
      {
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Respuesta del servidor:');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.totalAdded > 0) {
      console.log(`🎉 ¡Éxito! Se agregaron ${response.data.totalAdded} páginas al proyecto.`);
      
      console.log('\n📋 Páginas agregadas:');
      response.data.addedPages.forEach((page, index) => {
        console.log(`${index + 1}. ${page.name} (${page.route})`);
      });
    }
    
    if (response.data.errors && response.data.errors.length > 0) {
      console.log('\n⚠️ Errores encontrados:');
      response.data.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.error}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error al agregar páginas:');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
      console.error('Request:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Función para mostrar las páginas que se van a agregar
function showPagesToAdd() {
  console.log('\n📋 Páginas que se agregarán:');
  pagesToAdd.forEach((page, index) => {
    console.log(`\n${index + 1}. ${page.name}`);
    console.log(`   Ruta: ${page.route}`);
    console.log(`   Descripción: ${page.description.substring(0, 100)}...`);
  });
  console.log('\n');
}

// Mostrar información y ejecutar
if (require.main === module) {
  console.log('🔧 Script para agregar páginas al proyecto');
  console.log('=' .repeat(50));
  
  if (AUTH_TOKEN === 'TU_TOKEN_AQUI') {
    console.log('⚠️  IMPORTANTE: Debes reemplazar AUTH_TOKEN con un token válido');
    console.log('   Puedes obtenerlo del localStorage de tu navegador o de una sesión activa');
    console.log('   Busca en el navegador: localStorage.getItem("token")');
    showPagesToAdd();
  } else {
    showPagesToAdd();
    addPagesToProject();
  }
}

module.exports = { addPagesToProject, pagesToAdd };