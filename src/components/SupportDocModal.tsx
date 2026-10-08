import React, { useState } from 'react';
import {
  FileText, Shield, Database, Car, MapPin, CheckCircle2, AlertTriangle,
  ArrowRight, Download, Printer, ExternalLink, HelpCircle, Phone, Layers,
  Terminal, Server, RefreshCw, Key, Users, BookOpen
} from 'lucide-react';
import { Language } from '../types';

interface SupportDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SupportDocModal: React.FC<SupportDocModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'catalog' | 'admin' | 'sheets' | 'faq'>('overview');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDoc = () => {
    const markdownContent = `# MANUAL DE OPERACIONES Y SOPORTE DE PLATAFORMA
Trip Now — Renta de Vehículos en El Salvador
Versión: 3.2.0 | Clasificación: Documento de Soporte Corporativo
Territorio: El Salvador, Centroamérica | Moneda Oficial: USD ($)

================================================================================
1. RESUMEN EJECUTIVO Y PERFIL DE LA EMPRESA
================================================================================
Trip Now es una plataforma digital de movilidad y arrendamiento vehicular diseñada 
para brindar una experiencia ágil, transparente y moderna en El Salvador.

Pilares Fundamentales:
• Kilometraje 100% Ilimitado en todo el país.
• Tarifas transparentes en Dólares (USD) sin cobros ocultos de última hora.
• Despacho continuo 24/7 en el Aeropuerto Internacional (SAL).
• Sincronización en tiempo real con Firebase Firestore y Google Sheets.

================================================================================
2. FLUJO DE USUARIO Y EXPERIENCIA DE RESERVA
================================================================================
2.1 Validación de Conductor:
Todo cliente registra sus datos básicos para la emisión del contrato digital:
- Nombre Completo.
- Correo Electrónico (para seguimiento de reserva).
- Teléfono / WhatsApp (coordinación de entrega de llaves).
- Documento de Identidad (DUI, Pasaporte o Licencia vigente).

2.2 Modelos Principales:
- Toyota Hilux 4x4 Doble Cabina ($65.00/día): Rutas de playa, surf, montaña y volcanes.
- Toyota RAV4 SUV Confort ($55.00/día): Confort familiar, turismo nacional y maletero amplio.
- Toyota Corolla Sedán Ejecutivo ($40.00/día): Turismo urbano y ahorro de combustible.

================================================================================
3. MANUAL OPERATIVO DEL PANEL ADMINISTRATIVO
================================================================================
Funciones Principales:
- Ajuste rápido de inventario (+ / -) según disponibilidad física en patio.
- Modo Pausa para unidades en taller o inspección mecánica.
- Al marcar una reserva como "Finalizada", el sistema reintegra automáticamente +1 unidad al stock.
- Directorio de clientes (CRM) con historial acumulado de viajes y gasto total.
- Módulo de sincronización con Google Sheets para control contable.

================================================================================
4. DIRECTORIO DE ATENCIÓN Y ASISTENCIA
================================================================================
• Central Telefónica: +503 2264-9800
• Mostrador Aeropuerto SAL: +503 2344-7700 (24 Horas)
• WhatsApp Asistencia: +503 7845-1234
`;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TripNow-Manual-Soporte.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 rounded-3xl w-full max-w-5xl h-[92vh] shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Document Header bar (Estilo Google Docs / Enterprise Paper) */}
        <div className="bg-[#1e2530] text-white px-5 py-4 border-b border-stone-700/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 p-1 flex items-center justify-center shrink-0">
              <img
                src="./favicon.png"
                alt="Trip Now Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg text-white">
                  Trip Now — Manual de Soporte y Operaciones
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 hidden sm:inline-block">
                  DOC-SOPORTE-v3.2
                </span>
              </div>
              <p className="text-xs text-stone-300">
                {lang === 'es'
                  ? 'Guía oficial de procedimientos técnicos, flota, reservas y panel de control'
                  : 'Official guide for technical operations, fleet management & admin controls'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title="Imprimir documento / Guardar como PDF"
              aria-label="Imprimir"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadDoc}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg border border-stone-700 transition-colors cursor-pointer"
              title="Descargar Manual en formato Markdown (.md)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Descargar .MD</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="bg-stone-100 dark:bg-stone-800/60 px-5 py-2.5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeSection === 'overview'
                ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs border border-stone-200 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Perfil y Misión</span>
          </button>
          <button
            onClick={() => setActiveSection('catalog')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeSection === 'catalog'
                ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs border border-stone-200 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>2. Flota y Reservas</span>
          </button>
          <button
            onClick={() => setActiveSection('admin')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeSection === 'admin'
                ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs border border-stone-200 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>3. Panel Administrativo</span>
          </button>
          <button
            onClick={() => setActiveSection('sheets')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeSection === 'sheets'
                ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs border border-stone-200 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>4. Google Sheets & Sync</span>
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeSection === 'faq'
                ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs border border-stone-200 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>5. Troubleshooting & FAQ</span>
          </button>
        </div>

        {/* Content Body: Paper styling */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#fdfdfc] dark:bg-stone-950 text-stone-800 dark:text-stone-200 space-y-8">
          
          {/* SECTION 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Document Banner */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md">
                <img
                  src="./doc_hero_interface.jpg"
                  alt="Trip Now Interfaz de Plataforma"
                  className="w-full h-56 sm:h-72 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex items-end p-6">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-amber-500 text-stone-950 font-bold text-[11px] rounded uppercase tracking-wider mb-2">
                      Documento de Soporte Empresarial
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                      Trip Now: Manual de Operaciones y Plataforma Web
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                      El Salvador, Centroamérica · Conectividad en tiempo real entre flota vehicular, clientes y sincronización contable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                    <Car className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">Flota Diversificada</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    Vehículos pickup 4x4 (Hilux), SUVs para familias (RAV4) y sedanes eficientes (Corolla) con kilometraje ilimitado.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">Cobertura Nacional 24/7</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    Atención ininterrumpida en el Aeropuerto Internacional (SAL), San Salvador, Santa Ana, San Miguel y Surf City.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-3">
                    <Database className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">Sincronización Dual</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    Base de datos en la nube (Firebase Firestore) con puente automático directo a hojas contables de Google Sheets.
                  </p>
                </div>
              </div>

              {/* Architectural diagram */}
              <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 font-mono text-xs text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-2 mb-2 font-bold text-stone-900 dark:text-white">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Flujo de Datos e Infraestructura:</span>
                </div>
                <p className="mb-3 font-sans text-stone-600 dark:text-stone-400">
                  La arquitectura garantiza que cada transacción quede respaldada localmente en el navegador, en la nube para auditoría en vivo y en Google Sheets para el equipo administrativo.
                </p>
                <div className="bg-stone-950 text-emerald-400 p-4 rounded-xl overflow-x-auto leading-relaxed">
                  [Cliente Reserva] ──► [Firestore 'reservas'] ──► [Bridge Apps Script] ──► [Google Sheet Matriz]<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──► [Actualiza Stock Flota] ──► [Bitácora de Movimientos Real-Time]
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: CATALOG & RESERVATIONS */}
          {activeSection === 'catalog' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold">Módulo 2</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                  Catálogo, Registro de Conductor y Reservas
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                    1. Onboarding del Cliente (Welcome Gate)
                  </h4>
                  <p>
                    Para cumplir con normativas de tránsito de El Salvador, todo usuario que ingresa a la plataforma completa sus datos:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li><strong>Nombre Completo:</strong> Tal como figura en DUI o Pasaporte.</li>
                    <li><strong>Correo Electrónico:</strong> Identificador único para el historial de alquileres.</li>
                    <li><strong>Teléfono / WhatsApp:</strong> Contacto para entrega de llaves e inspección.</li>
                    <li><strong>Documento de Identidad:</strong> DUI, Pasaporte o Licencia vigente.</li>
                  </ul>
                  <p className="text-xs text-stone-500 italic">
                    * Estos datos se guardan en la colección de clientes y se sincronizan con Google Sheets.
                  </p>
                </div>
                <div className="bg-stone-100 dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 dark:text-white font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Beneficios incluidos en toda reserva:</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>Kilometraje 100% ilimitado en todo El Salvador.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>Asistencia vial telefónica y por WhatsApp 24/7.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>Tarifas transparentes fijadas en USD sin cargos sorpresa.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>Opción de entrega en aeropuerto o sucursal urbana.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flota Actual */}
              <div className="mt-6">
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white mb-3">
                  Modelos de Vehículos Disponibles en la Plataforma
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3 shadow-xs">
                    <img
                      src="./assets/vehicle_toyota_hilux_1790123618836-D_M9Pot9.jpg"
                      alt="Toyota Hilux"
                      className="w-full h-32 object-cover rounded-lg mb-2"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <h5 className="font-serif font-bold text-sm text-stone-900 dark:text-white">Toyota Hilux 4x4</h5>
                    <p className="text-xs text-stone-500">Camioneta Doble Cabina · $65/día</p>
                    <span className="inline-block mt-2 text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
                      Ideal terreno volcánico / playas
                    </span>
                  </div>
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3 shadow-xs">
                    <img
                      src="./assets/vehicle_toyota_rav4_1790123629362-Bu_Tj4Y3.jpg"
                      alt="Toyota RAV4"
                      className="w-full h-32 object-cover rounded-lg mb-2"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <h5 className="font-serif font-bold text-sm text-stone-900 dark:text-white">Toyota RAV4</h5>
                    <p className="text-xs text-stone-500">SUV Confort · $55/día</p>
                    <span className="inline-block mt-2 text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
                      Familiar & Maletero amplio
                    </span>
                  </div>
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3 shadow-xs">
                    <img
                      src="./assets/vehicle_corolla_sedan_1790123639645-DhHHDAZX.jpg"
                      alt="Toyota Corolla"
                      className="w-full h-32 object-cover rounded-lg mb-2"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <h5 className="font-serif font-bold text-sm text-stone-900 dark:text-white">Toyota Corolla</h5>
                    <p className="text-xs text-stone-500">Sedán Ejecutivo · $40/día</p>
                    <span className="inline-block mt-2 text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
                      Económico en combustible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: ADMIN PANEL */}
          {activeSection === 'admin' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold">Módulo 3</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                  Panel Administrativo y Gestión de Flota
                </h3>
              </div>

              {/* Admin banner image */}
              <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md">
                <img
                  src="./doc_admin_dashboard.jpg"
                  alt="Panel de Control Trip Now"
                  className="w-full h-56 sm:h-72 object-cover"
                />
              </div>

              {/* Access Info Card (Sin datos personales) */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Key className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-stone-900 dark:text-white">
                    Acceso Seguro al Panel de Administración:
                  </div>
                  <p className="text-stone-700 dark:text-stone-300">
                    El ingreso al panel de control se realiza mediante autenticación protegida en sesión (`sessionStorage`), garantizando que la operación esté restringida exclusivamente al personal autorizado de Trip Now.
                  </p>
                </div>
              </div>

              {/* Capabilities checklist */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                  Funciones Operativas del Administrador
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
                    <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-amber-600" />
                      <span>Gestión de Vehículos</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400">
                      Crear nuevos vehículos, ajustar el stock con botones (+ / -), pausar modelos para mantenimiento o eliminarlos permanentemente.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
                    <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4 text-emerald-600" />
                      <span>Ciclo de Vida de Reservas</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400">
                      Cambiar estados entre <em>En curso</em>, <em>Finalizado</em> (reintegra automáticamente el vehículo al inventario) y <em>Cancelado</em>.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
                    <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>CRM & Eliminación de Clientes</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400">
                      Visualizar gasto total por cliente, eliminar usuarios individuales o presionar el botón de limpieza total con confirmación en dos pasos.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
                    <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-purple-600" />
                      <span>Monitor de Movimientos en Vivo</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400">
                      Feed en tiempo real que registra cada acción, reserva y confirmación realizada por los usuarios en la web.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: GOOGLE SHEETS & SYNC */}
          {activeSection === 'sheets' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold">Módulo 4</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                  Integración con Google Sheets y Apps Script
                </h3>
              </div>

              <div className="space-y-3 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                <p>
                  Trip Now incluye un conector serverless que replica automáticamente todos los movimientos a una hoja de cálculo en Google Drive para control contable y auditoría de gerencia sin costo de infraestructura.
                </p>
              </div>

              {/* Setup Steps */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                  Pasos de Configuración del Webhook:
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <li>
                    Abre una hoja de cálculo en Google Sheets y ve al menú <strong>Extensiones &gt; Apps Script</strong>.
                  </li>
                  <li>
                    Pega el código de webhook de Trip Now (disponible para copiar con un clic dentro del panel de administración).
                  </li>
                  <li>
                    Haz clic en <strong>Implementar &gt; Nueva implementación</strong>.
                  </li>
                  <li>
                    Selecciona <em>Tipo: Aplicación web</em>, asigna <em>Ejecutar como: Yo</em> y <em>Quién tiene acceso: Cualquier usuario (Anyone)</em>.
                  </li>
                  <li>
                    Copia la URL web resultante y pégala en la pestaña <strong>Base de Datos</strong> del panel de Trip Now.
                  </li>
                  <li>
                    Haz clic en <strong>Probar Conexión</strong> para recibir confirmación de enlace exitoso.
                  </li>
                </ol>
              </div>

              {/* Fields Table */}
              <div className="mt-4">
                <h5 className="font-bold text-xs uppercase text-stone-600 dark:text-stone-400 mb-2">
                  Estructura de Columnas Registradas en Google Sheets:
                </h5>
                <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      <tr>
                        <th className="p-3">Pestaña</th>
                        <th className="p-3">Columnas Registradas</th>
                        <th className="p-3">Finalidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                      <tr>
                        <td className="p-3 font-semibold font-mono text-amber-700 dark:text-amber-400">Viajes</td>
                        <td className="p-3 font-mono text-[11px]">ID, Cliente, Email, Vehículo, Días, Total USD, Recogida, Retorno, Sucursal, Estado</td>
                        <td className="p-3">Control operativo y facturación por vehículo.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold font-mono text-amber-700 dark:text-amber-400">Clientes</td>
                        <td className="p-3 font-mono text-[11px]">ID, Nombre, Email, Teléfono, Documento, Reservas, Total Gastado, Fecha Registro</td>
                        <td className="p-3">Directorio CRM y seguimiento de fidelidad.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: FAQ & TROUBLESHOOTING */}
          {activeSection === 'faq' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold">Módulo 5</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                  Preguntas Frecuentes y Resolución de Incidencias
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5 shadow-xs">
                  <div className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>¿Qué hacer si un vehículo no aparece en el catálogo para los clientes?</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 pl-6">
                    Revisa en el Panel Admin que el vehículo tenga <strong>Stock mayor a 0</strong> y que no esté en estado <strong>Pausado</strong> (pausa para taller o lavado).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5 shadow-xs">
                  <div className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>¿Cómo se devuelven los vehículos al inventario disponible al finalizar un alquiler?</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 pl-6">
                    En el Panel Admin, localiza la reserva en la lista y presiona el botón verde <strong>Finalizar</strong>. El sistema automáticamente sumará 1 unidad al stock del vehículo y actualizará el estado en Google Sheets y Firebase.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5 shadow-xs">
                  <div className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>¿Cómo descargar el código fuente completo de la aplicación?</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 pl-6">
                    Puedes hacer clic en el botón <strong>.ZIP</strong> ubicado en la barra superior o en el enlace <strong>Descargar .ZIP</strong> en el pie de página de la aplicación.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5 shadow-xs">
                  <div className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Canales de contacto directo para asistencia técnica:</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 pl-6">
                    Central: +503 2264-9800 | Aeropuerto SAL (24h): +503 2344-7700 | WhatsApp: +503 7845-1234.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="bg-stone-100 dark:bg-stone-900 px-5 py-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <div className="flex items-center gap-2">
            <span>Trip Now El Salvador</span>
            <span>·</span>
            <span>Documento Técnico Interno</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="text-stone-700 dark:text-stone-300 hover:text-stone-900 flex items-center gap-1 font-medium cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
