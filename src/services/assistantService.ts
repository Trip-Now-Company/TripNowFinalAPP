import { Language } from '../types';

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    tab: 'home' | 'catalog' | 'branches' | 'cart';
    label: string;
  };
}

/**
 * Knowledge base responses for offline / GitHub Pages static fallback
 * and instant safeguard enforcement.
 */
function getLocalFallback(prompt: string, lang: Language): { text: string; action?: { tab: 'home' | 'catalog' | 'branches' | 'cart'; label: string } } {
  const query = prompt.toLowerCase().trim();

  // 1. Strict Security & Privacy Guardrail Trigger
  if (
    query.includes('password') ||
    query.includes('contraseña') ||
    query.includes('clave') ||
    query.includes('token') ||
    query.includes('credencial') ||
    query.includes('admin') ||
    query.includes('datos de cliente') ||
    query.includes('lista de cliente') ||
    query.includes('tarjetas') ||
    query.includes('tarjeta de credito') ||
    query.includes('firebase') ||
    query.includes('api key') ||
    query.includes('hack') ||
    query.includes('prompt') ||
    query.includes('bypass') ||
    query.includes('dui de') ||
    query.includes('base de datos') ||
    query.includes('database') ||
    query.includes('privado')
  ) {
    if (lang === 'es') {
      return {
        text: '🔒 **Aviso de Privacidad y Seguridad:**\nPor estrictas políticas de protección de datos de Trip Now, no tengo acceso a credenciales, contraseñas, datos personales ni claves del sistema.\n\nMi función está limitada exclusivamente a orientarte dentro de las funciones de la página web (catálogo de autos, requisitos, sucursales y reservaciones).'
      };
    } else {
      return {
        text: '🔒 **Privacy & Security Notice:**\nPer Trip Now strict security policies, I do not have access to system credentials, passwords, customer personal records, or secret keys.\n\nI am exclusively designed to guide you through the website features (vehicle catalog, rental requirements, branch locations, and bookings).'
      };
    }
  }

  // 2. Funciones de la página web (Guía general de la plataforma)
  if (
    query.includes('que funciones') ||
    query.includes('que puedo hacer') ||
    query.includes('como usar la pagina') ||
    query.includes('como usar la app') ||
    query.includes('que hay en la pagina') ||
    query.includes('secciones') ||
    query.includes('features') ||
    query.includes('what can i do')
  ) {
    if (lang === 'es') {
      return {
        text: '🌐 **Funciones principales de la página web de Trip Now:**\n\n' +
          '• **Inicio:** Vista general de beneficios clave (kilometraje ilimitado, seguro incluido, entrega 24/7 en el Aeropuerto).\n' +
          '• **Catálogo:** Explora nuestra flota en vivo (Pickups 4x4, SUVs familiares, Sedanes económicos), filtra por categoría y selecciona los días de alquiler.\n' +
          '• **Sucursales:** Mapa interactivo y horarios de nuestras 4 sucursales en El Salvador (Aeropuerto Internacional 24/7, Escalón, Santa Ana y San Miguel).\n' +
          '• **Carrito y Reserva:** Configura tu fecha de retiro, sucursal de entrega y confirma tu reserva con disponibilidad garantizada.\n' +
          '• **Mi Perfil:** Identifícate de forma rápida para agilizar la entrega de tu vehículo.',
        action: { tab: 'catalog', label: 'Explorar Catálogo' }
      };
    } else {
      return {
        text: '🌐 **Main functions of the Trip Now website:**\n\n' +
          '• **Home:** Overview of key guarantees (unlimited mileage, included insurance, 24/7 airport delivery).\n' +
          '• **Catalog:** Browse live fleet (4x4 Pickups, family SUVs, economy Sedans), filter by category, and select rental duration.\n' +
          '• **Branches:** Interactive map and hours for our 4 branches in El Salvador (Airport 24/7, Escalón, Santa Ana, San Miguel).\n' +
          '• **Cart & Booking:** Choose your pickup date, branch, and finalize your booking with guaranteed availability.\n' +
          '• **My Profile:** Quickly identify yourself to speed up car handover at the counter.',
        action: { tab: 'catalog', label: 'Explore Fleet' }
      };
    }
  }

  // 2. Requisitos de alquiler
  if (
    query.includes('requisito') ||
    query.includes('edad') ||
    query.includes('licencia') ||
    query.includes('documento') ||
    query.includes('require') ||
    query.includes('license')
  ) {
    if (lang === 'es') {
      return {
        text: '📋 **Requisitos para alquilar un vehículo en Trip Now:**\n\n' +
          '1. **Edad mínima:** 21 años cumplidos.\n' +
          '2. **Licencia de conducir:** Vigente (nacional salvadoreña o extranjera autorizada).\n' +
          '3. **Identificación:** DUI vigente para salvadoreños o Pasaporte para extranjeros.\n' +
          '4. **Método de pago:** Tarjeta de crédito/débito o abono en la sucursal de retiro al recibir el auto.\n\n' +
          '¡Todo el trámite de entrega es rápido y se formaliza al retirar tu auto!',
        action: { tab: 'catalog', label: 'Explorar Catálogo' }
      };
    } else {
      return {
        text: '📋 **Requirements to rent a car with Trip Now:**\n\n' +
          '1. **Minimum age:** 21 years old.\n' +
          '2. **Driver\'s License:** Valid national or international license.\n' +
          '3. **ID Document:** Valid Salvadoran DUI or valid Passport.\n' +
          '4. **Payment Method:** Credit/Debit card or branch payment upon vehicle pickup.\n\n' +
          'Check-in is fast and friendly at any of our branches!',
        action: { tab: 'catalog', label: 'Explore Fleet' }
      };
    }
  }

  // 3. Cómo rentar o reservar
  if (
    query.includes('como rentar') ||
    query.includes('como reservar') ||
    query.includes('como funciona') ||
    query.includes('proceso') ||
    query.includes('pasos') ||
    query.includes('how to rent') ||
    query.includes('how to book')
  ) {
    if (lang === 'es') {
      return {
        text: '🚗 **Pasos sencillos para reservar en Trip Now:**\n\n' +
          '1. **Elige tu auto:** Ve a la pestaña **Catálogo** y selecciona el modelo ideal (Hilux, RAV4, Corolla).\n' +
          '2. **Agrega al carrito:** Elige cuántos días necesitas el vehículo y presiona **Alquilar ahora** o el botón de carrito.\n' +
          '3. **Elige sucursal y fecha:** En el Carrito, selecciona la sucursal de retiro (ej. Aeropuerto o San Salvador) y la fecha de entrega.\n' +
          '4. **Confirma tu reserva:** Revisa el resumen y confirma. ¡Tu auto quedará reservado con disponibilidad garantizada!',
        action: { tab: 'catalog', label: 'Ir al Catálogo' }
      };
    } else {
      return {
        text: '🚗 **Easy steps to book with Trip Now:**\n\n' +
          '1. **Select your car:** Visit the **Catalog** tab and pick your favorite vehicle (Hilux, RAV4, Corolla).\n' +
          '2. **Add to cart:** Choose your rental duration and click **Book Now**.\n' +
          '3. **Select branch and date:** In your Cart, choose your pickup branch (Airport, Escalón, etc.) and date.\n' +
          '4. **Confirm booking:** Review your rental summary and confirm with guaranteed availability!',
        action: { tab: 'catalog', label: 'Go to Catalog' }
      };
    }
  }

  // 4. Sucursales y ubicaciones
  if (
    query.includes('sucursal') ||
    query.includes('donde estan') ||
    query.includes('ubicacion') ||
    query.includes('aeropuerto') ||
    query.includes('san salvador') ||
    query.includes('horario') ||
    query.includes('branch') ||
    query.includes('location') ||
    query.includes('airport')
  ) {
    if (lang === 'es') {
      return {
        text: '📍 **Nuestras Sucursales en El Salvador:**\n\n' +
          '✈️ **Aeropuerto Internacional San Óscar Arnulfo Romero:**\n   • Horario: Atención 24 Horas / 7 días a la semana.\n   • Teléfono: +503 2345-6789\n\n' +
          '🏙️ **San Salvador - Colonia Escalón:**\n   • Horario: Lun-Sáb 7:00 AM - 7:00 PM | Dom 8:00 AM - 5:00 PM.\n   • Teléfono: +503 2211-4455\n\n' +
          '🏛️ **Santa Ana - Centro Histórico:**\n   • Horario: Lun-Sáb 8:00 AM - 6:00 PM.\n\n' +
          '🌴 **San Miguel - Metrocentro:**\n   • Horario: Lun-Sáb 8:00 AM - 6:00 PM.\n\n' +
          'Puedes retirar tu vehículo en cualquiera de estos puntos.',
        action: { tab: 'branches', label: 'Ver Mapa de Sucursales' }
      };
    } else {
      return {
        text: '📍 **Trip Now Branches in El Salvador:**\n\n' +
          '✈️ **San Óscar Arnulfo Romero International Airport:**\n   • Hours: 24/7 round-the-clock service.\n\n' +
          '🏙️ **San Salvador - Colonia Escalón:**\n   • Hours: Mon-Sat 7:00 AM - 7:00 PM | Sun 8:00 AM - 5:00 PM.\n\n' +
          '🏛️ **Santa Ana - Historic Center:**\n   • Hours: Mon-Sat 8:00 AM - 6:00 PM.\n\n' +
          '🌴 **San Miguel - Metrocentro:**\n   • Hours: Mon-Sat 8:00 AM - 6:00 PM.',
        action: { tab: 'branches', label: 'View Branches Map' }
      };
    }
  }

  // 5. Recomendación de vehículos / Destinos
  if (
    query.includes('recomiend') ||
    query.includes('sugiere') ||
    query.includes('playa') ||
    query.includes('surf') ||
    query.includes('volcan') ||
    query.includes('montaña') ||
    query.includes('ruta de las flores') ||
    query.includes('cual auto') ||
    query.includes('mejor auto') ||
    query.includes('recommend') ||
    query.includes('beach')
  ) {
    if (lang === 'es') {
      return {
        text: '⭐ **Recomendación según tu destino en El Salvador:**\n\n' +
          '• **Para Montañas, Volcanes o Caminos Rústicos (Ruta de las Flores, Cerro Verde, Chalatenango):** Te recomendamos la **Toyota Hilux 4x4** por su potencia, altura y tracción total.\n\n' +
          '• **Para Playas y Viajes en Familia (Surf City, El Tunco, El Zonte, Costa del Sol):** La **Toyota RAV4 (SUV)** ofrece máxima comodidad, espacio de maletero y aire acondicionado de alta eficiencia.\n\n' +
          '• **Para Ciudad y Carreteras Principales (San Salvador, Santa Tecla, Santa Ana):** El **Toyota Corolla** es la opción más económica, ágil y de bajísimo consumo de combustible.',
        action: { tab: 'catalog', label: 'Ver Vehículos Recomendados' }
      };
    } else {
      return {
        text: '⭐ **Vehicle recommendation based on your travel plan:**\n\n' +
          '• **For Volcanoes, Mountains or Off-road (Ruta de las Flores, Cerro Verde):** We recommend the **Toyota Hilux 4x4** for heavy-duty traction and ground clearance.\n\n' +
          '• **For Beach Trips & Family (Surf City, El Tunco, Costa del Sol):** The **Toyota RAV4 (SUV)** delivers prime comfort, luggage space, and family ergonomics.\n\n' +
          '• **For City and Highways (San Salvador, Metro Area):** The **Toyota Corolla Sedan** is the most cost-effective, smooth, and fuel-efficient choice.',
        action: { tab: 'catalog', label: 'View Recommended Cars' }
      };
    }
  }

  // 6. Políticas de combustible, seguro y kilometraje
  if (
    query.includes('seguro') ||
    query.includes('gasolina') ||
    query.includes('combustible') ||
    query.includes('kilometraje') ||
    query.includes('politica') ||
    query.includes('insurance') ||
    query.includes('fuel') ||
    query.includes('mileage')
  ) {
    if (lang === 'es') {
      return {
        text: '🛡️ **Políticas y Beneficios de Trip Now:**\n\n' +
          '• **Kilometraje:** ¡Ilimitado! Conduce libremente por todo El Salvador sin cargos sorpresa por kilómetro.\n' +
          '• **Seguro incluido:** Todos los alquileres cuentan con cobertura básica de protección contra colisión y daños a terceros.\n' +
          '• **Asistencia vial:** Soporte mecánico y grúa 24/7 en cualquier punto del territorio nacional.\n' +
          '• **Combustible:** Política de tanque igual (se entrega con tanque lleno y se devuelve al mismo nivel).'
      };
    } else {
      return {
        text: '🛡️ **Trip Now Policies & Benefits:**\n\n' +
          '• **Mileage:** Unlimited! Travel across El Salvador without hidden per-mile fees.\n' +
          '• **Insurance Included:** Standard coverage with third-party liability and collision protection.\n' +
          '• **24/7 Roadside Assistance:** Around-the-clock emergency support anywhere in El Salvador.\n' +
          '• **Fuel Policy:** Full-to-full (received full, returned full).'
      };
    }
  }

  // 7. Saludo o consulta general
  if (
    query.includes('hola') ||
    query.includes('buenos dias') ||
    query.includes('buenas tardes') ||
    query.includes('hello') ||
    query.includes('hi')
  ) {
    if (lang === 'es') {
      return {
        text: '¡Hola! Bienvenido a **Trip Now El Salvador**. Soy tu asistente virtual.\n\n¿En qué puedo ayudarte hoy?\n• Pasos para reservar tu vehículo\n• Requisitos de alquiler\n• Ubicación de nuestras sucursales\n• Recomendarte el mejor vehículo para tu viaje',
        action: { tab: 'catalog', label: 'Ver Catálogo' }
      };
    } else {
      return {
        text: 'Hello! Welcome to **Trip Now El Salvador**. I am your virtual assistant.\n\nHow can I help you today?\n• Guide you through booking a car\n• Rental requirements\n• Branch locations & 24/7 airport pickup\n• Recommendations for your trip',
        action: { tab: 'catalog', label: 'View Fleet' }
      };
    }
  }

  // Default response strictly reinforcing guidance on page functions
  if (lang === 'es') {
    return {
      text: `Soy el asistente virtual de **Trip Now El Salvador**. Mi función está orientada exclusivamente a ayudarte con las funciones de nuestra página web y el alquiler de vehículos.\n\nPuedo orientarte en:\n• **Catálogo y Autos:** Explorar nuestra flota (Toyota Hilux 4x4, RAV4, Corolla).\n• **Proceso de Reserva:** Cómo agregar al carrito y agendar tu fecha de retiro.\n• **Sucursales:** Ubicación y horarios (Aeropuerto 24/7, Escalón, Santa Ana, San Miguel).\n• **Requisitos y Políticas:** Licencia, edad mínima (21 años), kilometraje ilimitado y seguro.\n\n¿En qué proceso o función te gustaría que te guíe?`,
      action: { tab: 'catalog', label: 'Ver Catálogo' }
    };
  } else {
    return {
      text: `I am the **Trip Now El Salvador** virtual assistant. I am exclusively dedicated to guiding you through our website features and vehicle rental services.\n\nI can assist you with:\n• **Fleet & Vehicles:** Explore Toyota Hilux 4x4, RAV4, and Corolla.\n• **Booking Steps:** Adding to cart and selecting pickup dates.\n• **Branches:** Locations and hours (Airport 24/7, Escalón, Santa Ana, San Miguel).\n• **Requirements & Policies:** Driver's license, minimum age (21+), unlimited mileage, and insurance.\n\nWhich feature or process can I guide you through today?`,
      action: { tab: 'catalog', label: 'View Fleet' }
    };
  }
}

/**
 * Sends a message to the server-side Gemini assistant endpoint.
 * If running on a static host (GitHub Pages) or if the server is offline,
 * falls back seamlessly to the secure built-in knowledge engine.
 */
export async function sendAssistantMessage(
  userText: string,
  history: AssistantMessage[],
  lang: Language
): Promise<{ text: string; action?: { tab: 'home' | 'catalog' | 'branches' | 'cart'; label: string } }> {
  // Pre-check for security keywords in prompt to enforce client-side guardrails immediately
  const lower = userText.toLowerCase();
  if (
    lower.includes('password') ||
    lower.includes('contraseña') ||
    lower.includes('clave') ||
    lower.includes('token') ||
    lower.includes('admin') ||
    lower.includes('firebase') ||
    lower.includes('ghp_') ||
    lower.includes('hack')
  ) {
    return getLocalFallback(userText, lang);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage: userText,
        lang,
        history: history.slice(-6).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text,
        })),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.reply === 'string' && data.reply.trim().length > 0) {
        // Check if reply references catalog or branches to attach helpful action
        const replyLower = data.reply.toLowerCase();
        let action: { tab: 'home' | 'catalog' | 'branches' | 'cart'; label: string } | undefined = undefined;

        if (replyLower.includes('catálogo') || replyLower.includes('vehículo') || replyLower.includes('catalog')) {
          action = { tab: 'catalog', label: lang === 'es' ? 'Ver Catálogo' : 'View Fleet' };
        } else if (replyLower.includes('sucursal') || replyLower.includes('aeropuerto') || replyLower.includes('branch')) {
          action = { tab: 'branches', label: lang === 'es' ? 'Ver Sucursales' : 'View Branches' };
        } else if (replyLower.includes('carrito') || replyLower.includes('reserva') || replyLower.includes('cart')) {
          action = { tab: 'cart', label: lang === 'es' ? 'Ir al Carrito' : 'Go to Cart' };
        }

        return {
          text: data.reply.trim(),
          action,
        };
      }
    }
  } catch (_err) {
    // Expected on static hosting or offline: fallback smoothly
  }

  // Graceful fallback to rich local knowledge engine
  return getLocalFallback(userText, lang);
}
