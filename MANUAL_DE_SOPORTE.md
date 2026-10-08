# MANUAL DE OPERACIONES Y SOPORTE DE PLATAFORMA
**Trip Now — Renta de Vehículos en El Salvador**
*Versión Documental: 3.2.0 | Clasificación: Documento de Soporte Corporativo*
*Territorio: El Salvador, Centroamérica | Moneda Oficial: USD ($)*

---

## 1. RESUMEN EJECUTIVO Y PERFIL DE LA EMPRESA

### 1.1 Misión y Propuesta de Valor
**Trip Now** es una plataforma digital de movilidad y arrendamiento vehicular diseñada para ofrecer una experiencia de reserva transparente, ágil y confiable en todo el territorio de El Salvador. 

Conectamos a turistas, viajeros de negocios y residentes con una flota moderna de camionetas 4x4, SUVs familiares y sedanes ejecutivos, con cobertura en las terminales aéreas y centros urbanos más importantes del país.

### 1.2 Pilares Operativos
- **Kilometraje 100% Ilimitado:** Todos los vehículos cuentan con kilometraje libre dentro del territorio nacional.
- **Transparencia Tarifaria Total:** Precios fijos expresados en Dólares de los Estados Unidos (USD), sin cobros ocultos de última hora.
- **Atención Continua 24/7:** Mostrador de despacho activo las 24 horas del día en el Aeropuerto Internacional (SAL).
- **Asistencia Vial Permanente:** Soporte telefónico y por WhatsApp en caso de cualquier eventualidad en carretera.

---

## 2. ARQUITECTURA DE LA APLICACIÓN

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENTE / NAVEGADOR WEB                    │
│   React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons   │
│   (Soporte Bilingüe ES/EN · Modo Claro / Modo Oscuro)          │
└────────────────┬───────────────────────────────┬────────────────┘
                 │                               │
                 ▼                               ▼
┌────────────────────────────────┐ ┌──────────────────────────────┐
│       FIREBASE FIRESTORE       │ │      GOOGLE APPS SCRIPT      │
│  · Colección 'reservas'        │ │      (Bridge Webhook)        │
│  · Colección 'clientes'        │ │              │               │
│  · Bitácora 'movimientos'      │ └──────────────┬───────────────┘
│  (Persistencia en Tiempo Real) │                ▼
└────────────────────────────────┘ ┌──────────────────────────────┐
                                   │     GOOGLE SHEETS CLOUD      │
                                   │  · Pestaña: Clientes         │
                                   │  · Pestaña: Viajes/Reservas  │
                                   └──────────────────────────────┘
```

---

## 3. MANUAL DEL CLIENTE Y EXPERIENCIA DE RESERVA

### 3.1 Portal de Bienvenida y Validación de Identidad
Al ingresar por primera vez a la plataforma, el sistema solicita al usuario registrar sus datos básicos antes de rentar:
1. **Nombre Completo:** Para emisión del contrato y comprobante digital.
2. **Correo Electrónico:** Clave única para consulta del historial de reservas.
3. **Teléfono / WhatsApp:** Canal de contacto directo para la entrega de llaves.
4. **Documento de Identidad:** DUI, Pasaporte o Licencia vigente (validación reglamentaria de tránsito).

### 3.2 Flota de Vehículos Disponibles

| Modelo | Categoría | Tarifa Diaria (USD) | Características y Uso Recomendado |
| :--- | :--- | :--- | :--- |
| **Toyota Hilux 4x4** | Camioneta Doble Cabina | $65.00 / día | Tracción 4x4, capacidad de carga, ideal para surf, playas y rutas volcánicas. |
| **Toyota RAV4** | SUV Confort | $55.00 / día | Amplio maletero, suspensión suave, recomendada para familias y turismo nacional. |
| **Toyota Corolla** | Sedán Ejecutivo | $40.00 / día | Rendimiento eficiente de combustible, óptimo para traslados ejecutivos y ciudad. |

### 3.3 Proceso de Reserva Paso a Paso
1. **Selección del Vehículo:** El cliente puede ajustar la cantidad de días deseados y añadir al carrito.
2. **Sucursal de Retiro:** Selección entre Aeropuerto Internacional SAL, San Salvador (Paseo Escalón), Santa Ana, San Miguel o Surf City.
3. **Fecha de Recogida:** Elección de fecha en el calendario interactivo. El sistema calcula automáticamente la fecha de devolución y el importe total en USD.
4. **Confirmación Digital:** Al confirmar, se descuenta 1 unidad del inventario físico, se genera el ID de reserva y se envía el registro a los sistemas contables.

---

## 4. MANUAL DEL PANEL ADMINISTRATIVO

### 4.1 Acceso al Sistema
- El acceso se realiza mediante el botón con ícono de escudo en la barra de navegación superior.
- La sesión permanece resguardada de forma protegida para evitar cierres accidentales durante la operación.

### 4.2 Módulos Operativos

#### A. Control de Flota e Inventario
- **Ajuste de Stock:** Botones rápidos `+` y `-` para sumar o restar vehículos disponibles en patio.
- **Pausa de Taller / Mantenimiento:** Oculta temporalmente un vehículo del catálogo para lavado o chequeo preventivo sin borrar su historial.
- **Alta de Vehículos:** Permite incorporar nuevos modelos, categorías, tarifas y fotografías.

#### B. Ciclo de Vida de las Reservas
Cada reserva transita por tres estados:
1. **En Curso:** Vehículo asignado o en posesión del cliente.
2. **Finalizado:** Se marca cuando el cliente entrega el vehículo. El sistema reintegra automáticamente **+1 unidad al inventario disponible** y actualiza el estado en Google Sheets y Firebase.
3. **Cancelado:** Anulación de la reserva y restitución automática del cupo en el inventario.

#### C. Directorio de Clientes (CRM)
- Consulta del historial acumulado de viajes y monto total facturado por cliente.
- Funcionalidad de eliminación de registros con validación de seguridad para evitar borrados accidentales.

#### D. Sincronización Contable con Google Sheets
- Conexión serverless mediante Google Apps Script para reflejar automáticamente los datos en hojas de cálculo corporativas.
- Botón *"Probar Conexión"* integrado para verificar la operatividad del enlace en milisegundos.

---

## 5. GUÍA DE RESOLUCIÓN DE INCIDENCIAS

| Situación | Causa | Solución Operativa |
| :--- | :--- | :--- |
| **Un vehículo no aparece en el catálogo** | El vehículo tiene stock en 0 o está en modo "Pausado". | En el Panel Admin, verificar que el stock sea mayor a 0 y que el interruptor de pausa esté desactivado. |
| **El auto devuelto no se suma al catálogo** | La reserva aún no ha sido marcada como finalizada. | Localizar la reserva en la lista de reservas del Panel Admin y presionar **"Finalizar"**. El sistema sumará +1 unidad de inmediato. |
| **No se registra la fila en Google Sheets** | Permisos del script de Google no configurados para acceso público. | En Google Apps Script: *Implementar > Administrar implementaciones > Quién tiene acceso: Cualquier usuario*. |

---

## 6. DIRECTORIO DE SUCURSALES Y ATENCIÓN

- 📞 **Central Telefónica:** +503 2264-9800
- ✈️ **Aeropuerto Internacional SAL:** +503 2344-7700 *(Atención 24 Horas)*
- 📱 **WhatsApp de Asistencia Vial:** +503 7845-1234
- 📍 **Oficina Central San Salvador:** Paseo General Escalón #3700, Col. Escalón
- 📍 **Oficina Surf City:** Km 42 Carretera El Litoral, Playa El Tunco, La Libertad
