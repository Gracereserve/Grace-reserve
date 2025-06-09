// ===============================================
// BACKEND COMPLETO SISTEMA DE RESERVAS SALON
// GRACE-RESERVE - FORMULARIO CITAS
// CON GOOGLE CALENDAR Y AUTENTICACIÓN
// ===============================================

// CONFIGURACIÓN - CAMBIAR POR TU EMAIL REAL
const MI_EMAIL_SALON = 'gracenailsandbeautyspaec@gmail.com'; // ⚠️ CAMBIAR POR TU EMAIL REAL
const MI_CALENDAR_ID = 'primary'; // Tu calendario principal
const NOMBRE_SALON = 'Grace Reserve - Salón de Uñas';
const DIRECCION_SALON = 'Baron de Carondelet'; // ⚠️ CAMBIAR POR TU DIRECCIÓN

// CONFIGURACIÓN INICIAL - Ejecutar una vez para crear las hojas
function configurarSistema() {
  try {
    crearHojasIniciales();
    configurarServicios();
    configurarHorarios();
    configurarCalendario();
    
    Logger.log("✅ Sistema Grace-Reserve configurado exitosamente");
    Logger.log("🔗 URL de la aplicación web: " + ScriptApp.getService().getUrl());
    Logger.log("🌐 Tu formulario estará en: https://gracereserve.github.io/formulario-citas");
  } catch (error) {
    Logger.log("❌ Error en configuración: " + error.toString());
  }
}

// Configurar permisos de Google Calendar
function configurarCalendario() {
  try {
    // Verificar acceso al calendario
    const calendarios = CalendarApp.getAllOwnedCalendars();
    Logger.log("📅 Calendarios disponibles: " + calendarios.length);
    
    // Crear calendario específico para Grace Reserve (opcional)
    try {
      let salonCalendar = CalendarApp.getCalendarsByName('Grace Reserve - Citas')[0];
      if (!salonCalendar) {
        salonCalendar = CalendarApp.createCalendar('Grace Reserve - Citas');
        Logger.log("📅 Calendario de Grace Reserve creado");
      }
    } catch (e) {
      Logger.log("ℹ️ Usando calendario principal para Grace Reserve");
    }
    
  } catch (error) {
    Logger.log("❌ Error configurando calendario: " + error.toString());
  }
}

// Crear las hojas necesarias
function crearHojasIniciales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Crear hoja RESERVAS
  let reservasSheet;
  try {
    reservasSheet = ss.getSheetByName('Reservas');
    if (!reservasSheet) {
      reservasSheet = ss.insertSheet('Reservas');
    }
  } catch (e) {
    reservasSheet = ss.insertSheet('Reservas');
  }
  
  // Headers para Reservas
  const reservasHeaders = [
    'ID', 'Fecha', 'Hora', 'Nombre', 'Apellido', 'Telefono', 
    'Servicio', 'Duracion', 'Estado', 'Fecha_Creacion', 'Email_Enviado',
    'Email_Cliente', 'Event_ID_Cliente', 'Event_ID_Salon', 'Google_User_ID'
  ];
  reservasSheet.getRange(1, 1, 1, reservasHeaders.length).setValues([reservasHeaders]);
  reservasSheet.getRange(1, 1, 1, reservasHeaders.length).setFontWeight('bold');
  reservasSheet.setFrozenRows(1);
  
  // Crear hoja CONFIGURACION
  let configSheet;
  try {
    configSheet = ss.getSheetByName('Configuracion');
    if (!configSheet) {
      configSheet = ss.insertSheet('Configuracion');
    }
  } catch (e) {
    configSheet = ss.insertSheet('Configuracion');
  }
  
  const configHeaders = ['Fecha', 'Estado', 'Horario_Especial', 'Notas'];
  configSheet.getRange(1, 1, 1, configHeaders.length).setValues([configHeaders]);
  configSheet.getRange(1, 1, 1, configHeaders.length).setFontWeight('bold');
  configSheet.setFrozenRows(1);
  
  // Crear hoja SERVICIOS
  let serviciosSheet;
  try {
    serviciosSheet = ss.getSheetByName('Servicios');
    if (!serviciosSheet) {
      serviciosSheet = ss.insertSheet('Servicios');
    }
  } catch (e) {
    serviciosSheet = ss.insertSheet('Servicios');
  }
  
  const serviciosHeaders = ['Servicio', 'Duracion_Minutos', 'Precio', 'Activo', 'Descripcion'];
  serviciosSheet.getRange(1, 1, 1, serviciosHeaders.length).setValues([serviciosHeaders]);
  serviciosSheet.getRange(1, 1, 1, serviciosHeaders.length).setFontWeight('bold');
  serviciosSheet.setFrozenRows(1);
}

// Configurar servicios iniciales
function configurarServicios() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const serviciosSheet = ss.getSheetByName('Servicios');
  
  const servicios = [
    ['Manicure Permanente', 60, 0, 'SI', 'Manicure con esmalte de larga duración'],
    ['Manicure Tradicional', 60, 0, 'SI', 'Manicure clásico con esmalte regular'],
    ['Esculpidas', 180, 0, 'SI', 'Uñas esculpidas completas'],
    ['Relleno Acrílico', 120, 0, 'SI', 'Relleno de uñas acrílicas'],
    ['Relleno Poligel', 120, 0, 'SI', 'Relleno con técnica poligel'],
    ['Pedicure con Esmalte Permanente', 60, 0, 'SI', 'Pedicure con esmalte permanente'],
    ['Pedicure con Esmalte Tradicional', 60, 0, 'SI', 'Pedicure con esmalte tradicional'],
    ['Barrido de Acrílico', 120, 0, 'SI', 'Técnica de barrido acrílico'],
    ['Keratina', 150, 0, 'SI', 'Tratamiento de keratina para uñas']
  ];
  
  serviciosSheet.getRange(2, 1, servicios.length, servicios[0].length).setValues(servicios);
}

// Configurar horarios de trabajo
function configurarHorarios() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('Configuracion');
  
  // Agregar configuración básica
  const configuracionBase = [
    ['HORARIOS_LUNES', 'ACTIVO', '9:00-12:00,14:00-21:00', 'Horario normal lunes'],
    ['HORARIOS_MARTES', 'ACTIVO', '9:00-12:00,14:00-19:00', 'Horario normal martes'],
    ['HORARIOS_MIERCOLES', 'ACTIVO', '9:00-12:00,14:00-21:00', 'Horario normal miércoles'],
    ['HORARIOS_JUEVES', 'ACTIVO', '9:00-12:00,14:00-21:00', 'Horario normal jueves'],
    ['HORARIOS_VIERNES', 'ACTIVO', '9:00-12:00,14:00-19:00', 'Horario normal viernes'],
    ['HORARIOS_SABADO', 'ACTIVO', '9:00-12:00,14:00-17:00', 'Horario normal sábado'],
    ['HORARIOS_DOMINGO', 'CERRADO', '', 'No se trabaja los domingos']
  ];
  
  configSheet.getRange(2, 1, configuracionBase.length, configuracionBase[0].length).setValues(configuracionBase);
}

// ===============================================
// API PRINCIPAL - RECIBIR RESERVAS
// ===============================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'crear_reserva') {
      return crearReserva(data);
    } else if (data.action === 'crear_reserva_autenticada') {
      return crearReservaConCalendario(data);
    } else if (data.action === 'obtener_horarios') {
      return obtenerHorariosDisponibles(data);
    } else if (data.action === 'admin_panel') {
      return manejarAdminPanel(data);
    } else if (data.action === 'verificar_auth') {
      return verificarAutenticacion(data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Acción no válida'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error en doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'panel_admin') {
    return HtmlService.createHtmlOutputFromFile('admin_panel');
  }
  
  // Por defecto, devolver info del sistema
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'Grace Reserve - Sistema activo',
      timestamp: new Date().toISOString(),
      formulario: 'https://gracereserve.github.io/formulario-citas'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// CREAR RESERVA CON GOOGLE CALENDAR
function crearReservaConCalendario(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reservasSheet = ss.getSheetByName('Reservas');
    
    // Validar que el horario esté disponible
    if (!validarDisponibilidad(data.date, data.time, data.duration)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false, 
          error: 'El horario seleccionado ya no está disponible'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Generar ID único
    const id = 'GRACE' + Date.now();
    
    // Crear eventos en Google Calendar
    const eventosCalendario = crearEventosCalendario(data, id);
    
    // Preparar datos para insertar
    const nuevaReserva = [
      id,
      data.date,
      data.time,
      data.firstName,
      data.lastName,
      data.phone,
      data.service,
      data.duration,
      'CONFIRMADA',
      new Date().toISOString(),
      'SI',
      data.userEmail || '',
      eventosCalendario.clienteEventId || '',
      eventosCalendario.salonEventId || '',
      data.googleUserId || ''
    ];
    
    // Insertar en la hoja
    reservasSheet.appendRow(nuevaReserva);
    
    // Enviar email de confirmación
    enviarEmailConfirmacion(data, id);
    
    Logger.log('✅ Reserva Grace Reserve creada con calendario: ' + id);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        reservaId: id,
        message: 'Reserva confirmada y agregada a Google Calendar',
        calendarEvents: eventosCalendario
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('❌ Error creando reserva con calendario: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: 'Error interno del servidor: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CREAR EVENTOS EN GOOGLE CALENDAR
function crearEventosCalendario(data, reservaId) {
  const serviceNames = {
    'manicure_permanente': 'Manicure Permanente',
    'manicure_tradicional': 'Manicure Tradicional',
    'esculpidas': 'Esculpidas',
    'relleno_acrilico': 'Relleno Acrílico',
    'relleno_poligel': 'Relleno Poligel',
    'pedicure_permanente': 'Pedicure con Esmalte Permanente',
    'pedicure_tradicional': 'Pedicure con Esmalte Tradicional',
    'barrido_acrilico': 'Barrido de Acrílico',
    'keratina': 'Keratina'
  };
  
  const servicioNombre = serviceNames[data.service] || data.service;
  
  // Crear fecha y hora de inicio
  const fechaHora = new Date(data.date + 'T' + data.time + ':00');
  const fechaFin = new Date(fechaHora.getTime() + (data.duration * 60 * 1000));
  
  const resultado = {
    clienteEventId: null,
    salonEventId: null
  };
  
  try {
    // 1. CREAR EVENTO EN MI CALENDARIO (Grace Reserve)
    const eventoSalon = CalendarApp.getDefaultCalendar().createEvent(
      `💅 ${servicioNombre} - ${data.firstName} ${data.lastName}`,
      fechaHora,
      fechaFin,
      {
        description: `
🆔 Reserva: ${reservaId}
👤 Cliente: ${data.firstName} ${data.lastName}
📞 Teléfono: ${data.phone}
📧 Email: ${data.userEmail || 'No proporcionado'}
💅 Servicio: ${servicioNombre}
⏱️ Duración: ${data.duration} minutos

💡 Esta cita fue creada automáticamente por Grace Reserve.
🌐 Sistema: https://gracereserve.github.io/formulario-citas
        `,
        location: DIRECCION_SALON,
        guests: data.userEmail ? [data.userEmail] : [],
        sendInvites: false
      }
    );
    
    // Agregar alerta 1 hora antes
    eventoSalon.addPopupReminder(60); // 60 minutos antes
    eventoSalon.addEmailReminder(60); // Email 60 minutos antes
    
    resultado.salonEventId = eventoSalon.getId();
    Logger.log('📅 Evento creado en calendario de Grace Reserve: ' + resultado.salonEventId);
    
  } catch (error) {
    Logger.log('❌ Error creando evento en calendario de Grace Reserve: ' + error.toString());
  }
  
  return resultado;
}

// VERIFICAR AUTENTICACIÓN
function verificarAutenticacion(data) {
  try {
    const esValido = data.userEmail && data.userEmail.includes('@');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        authenticated: esValido,
        userEmail: data.userEmail || null
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function crearReserva(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reservasSheet = ss.getSheetByName('Reservas');
    
    // Validar que el horario esté disponible
    if (!validarDisponibilidad(data.date, data.time, data.duration)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false, 
          error: 'El horario seleccionado ya no está disponible'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Generar ID único
    const id = 'GRACE' + Date.now();
    
    // Preparar datos para insertar
    const nuevaReserva = [
      id,
      data.date,
      data.time,
      data.firstName,
      data.lastName,
      data.phone,
      data.service,
      data.duration,
      'CONFIRMADA',
      new Date().toISOString(),
      'NO'
    ];
    
    // Insertar en la hoja
    reservasSheet.appendRow(nuevaReserva);
    
    // Enviar email de confirmación
    enviarEmailConfirmacion(data, id);
    
    // Marcar email como enviado
    const lastRow = reservasSheet.getLastRow();
    reservasSheet.getRange(lastRow, 11).setValue('SI');
    
    Logger.log('✅ Reserva Grace Reserve creada: ' + id);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        reservaId: id,
        message: 'Reserva confirmada exitosamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('❌ Error creando reserva: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: 'Error interno del servidor'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function validarDisponibilidad(fecha, hora, duracionMinutos) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reservasSheet = ss.getSheetByName('Reservas');
  const configSheet = ss.getSheetByName('Configuracion');
  
  // Verificar si el día está cerrado
  const fechaObj = new Date(fecha + 'T00:00:00');
  const diaSemana = fechaObj.getDay();
  const nombresDias = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
  const diaConfig = 'HORARIOS_' + nombresDias[diaSemana];
  
  // Buscar configuración del día
  const configData = configSheet.getDataRange().getValues();
  let horariosDia = null;
  
  for (let i = 1; i < configData.length; i++) {
    if (configData[i][0] === diaConfig && configData[i][1] === 'ACTIVO') {
      horariosDia = configData[i][2];
      break;
    }
  }
  
  if (!horariosDia) {
    return false;
  }
  
  // Verificar si hay fecha específica cerrada
  for (let i = 1; i < configData.length; i++) {
    if (configData[i][0] === fecha && configData[i][1] === 'CERRADO') {
      return false;
    }
  }
  
  // Verificar conflictos con otras reservas
  const reservasData = reservasSheet.getDataRange().getValues();
  
  for (let i = 1; i < reservasData.length; i++) {
    const reservaFecha = reservasData[i][1];
    const reservaHora = reservasData[i][2];
    const reservaDuracion = reservasData[i][7];
    const reservaEstado = reservasData[i][8];
    
    if (reservaFecha === fecha && reservaEstado === 'CONFIRMADA') {
      if (hayConflictoHorario(hora, duracionMinutos, reservaHora, reservaDuracion)) {
        return false;
      }
    }
  }
  
  return true;
}

function hayConflictoHorario(nuevaHora, nuevaDuracion, reservaHora, reservaDuracion) {
  const nuevaInicio = convertirHoraAMinutos(nuevaHora);
  const nuevaFin = nuevaInicio + nuevaDuracion;
  
  const reservaInicio = convertirHoraAMinutos(reservaHora);
  const reservaFin = reservaInicio + reservaDuracion;
  
  return !(nuevaFin <= reservaInicio || nuevaInicio >= reservaFin);
}

function convertirHoraAMinutos(hora) {
  const [horas, minutos] = hora.split(':').map(Number);
  return horas * 60 + minutos;
}

// ===============================================
// SISTEMA DE EMAILS GRACE RESERVE
// ===============================================

function enviarEmailConfirmacion(data, reservaId) {
  try {
    const serviceNames = {
      'manicure_permanente': 'Manicure Permanente',
      'manicure_tradicional': 'Manicure Tradicional',
      'esculpidas': 'Esculpidas',
      'relleno_acrilico': 'Relleno Acrílico',
      'relleno_poligel': 'Relleno Poligel',
      'pedicure_permanente': 'Pedicure con Esmalte Permanente',
      'pedicure_tradicional': 'Pedicure con Esmalte Tradicional',
      'barrido_acrilico': 'Barrido de Acrílico',
      'keratina': 'Keratina'
    };
    
    const servicioNombre = serviceNames[data.service] || data.service;
    const fechaFormateada = new Date(data.date + 'T00:00:00').toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const duracionTexto = data.duration < 60 ? data.duration + ' minutos' : 
                         (data.duration === 60 ? '1 hora' : 
                         (data.duration === 120 ? '2 horas' : 
                         (data.duration === 150 ? '2.5 horas' : 
                         (data.duration === 180 ? '3 horas' : data.duration + ' minutos'))));
    
    const asunto = `✅ Grace Reserve - Cita Confirmada - ${servicioNombre}`;
    
    const mensaje = `
    Hola ${data.firstName} ${data.lastName},

    ¡Tu cita en Grace Reserve ha sido confirmada exitosamente! 💅

    📋 DETALLES DE TU RESERVA:
    
    🆔 ID de Reserva: ${reservaId}
    👤 Cliente: ${data.firstName} ${data.lastName}
    📞 Teléfono: ${data.phone}
    💅 Servicio: ${servicioNombre}
    📅 Fecha: ${fechaFormateada}
    🕐 Hora: ${data.time}
    ⏱️ Duración: ${duracionTexto}

    📍 UBICACIÓN:
    ${DIRECCION_SALON}

    📝 IMPORTANTE:
    • Por favor llega 5 minutos antes de tu cita
    • Si necesitas cancelar o reprogramar, contáctanos con al menos 24 horas de anticipación
    • Trae una referencia del diseño que deseas (opcional)
    • Esta cita se agregó automáticamente a tu Google Calendar con recordatorio

    🌐 Agenda más citas en: https://gracereserve.github.io/formulario-citas

    Si tienes alguna pregunta, no dudes en contactarnos.

    ¡Nos vemos pronto!

    Saludos,
    Grace Reserve - Tu Salón de Uñas ✨
    `;

    // Para activar emails automáticos, descomenta esta línea:
    // MailApp.sendEmail(data.userEmail || MI_EMAIL_SALON, asunto, mensaje);
    
    Logger.log('📧 Email de confirmación preparado para: ' + data.firstName);
    
  } catch (error) {
    Logger.log('❌ Error enviando email: ' + error.toString());
  }
}

// ===============================================
// API PARA OBTENER HORARIOS DISPONIBLES
// ===============================================

function obtenerHorariosDisponibles(data) {
  try {
    const fecha = data.date;
    const duracion = parseInt(data.duration);
    
    const horariosDisponibles = calcularHorariosDisponibles(fecha, duracion);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        horarios: horariosDisponibles
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function calcularHorariosDisponibles(fecha, duracionMinutos) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('Configuracion');
  
  const fechaObj = new Date(fecha + 'T00:00:00');
  const diaSemana = fechaObj.getDay();
  const nombresDias = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
  const diaConfig = 'HORARIOS_' + nombresDias[diaSemana];
  
  // Obtener horarios del día
  const configData = configSheet.getDataRange().getValues();
  let horariosDia = null;
  
  for (let i = 1; i < configData.length; i++) {
    if (configData[i][0] === diaConfig && configData[i][1] === 'ACTIVO') {
      horariosDia = configData[i][2];
      break;
    }
  }
  
  if (!horariosDia) {
    return [];
  }
  
  // Parsear horarios (formato: "9:00-12:00,14:00-21:00")
  const bloques = horariosDia.split(',');
  const horariosDisponibles = [];
  
  bloques.forEach(bloque => {
    const [inicio, fin] = bloque.split('-');
    const horariosBloque = generarHorariosPorBloque(inicio, fin, duracionMinutos, fecha);
    horariosDisponibles.push(...horariosBloque);
  });
  
  return horariosDisponibles;
}

function generarHorariosPorBloque(horaInicio, horaFin, duracionMinutos, fecha) {
  const horarios = [];
  const inicioMinutos = convertirHoraAMinutos(horaInicio);
  const finMinutos = convertirHoraAMinutos(horaFin);
  
  for (let minutos = inicioMinutos; minutos + duracionMinutos <= finMinutos; minutos += 60) {
    const hora = convertirMinutosAHora(minutos);
    
    if (validarDisponibilidad(fecha, hora, duracionMinutos)) {
      horarios.push(hora);
    }
  }
  
  return horarios;
}

function convertirMinutosAHora(minutos) {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// ===============================================
// PANEL DE ADMINISTRACIÓN GRACE RESERVE
// ===============================================

function manejarAdminPanel(data) {
  try {
    switch(data.subaction) {
      case 'obtener_reservas':
        return obtenerReservas(data);
      case 'cerrar_dia':
        return cerrarDiaEspecifico(data);
      case 'abrir_dia':
        return abrirDiaEspecifico(data);
      case 'cancelar_reserva':
        return cancelarReserva(data);
      default:
        throw new Error('Subacción no válida');
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function obtenerReservas(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reservasSheet = ss.getSheetByName('Reservas');
  const reservasData = reservasSheet.getDataRange().getValues();
  
  const reservas = [];
  
  for (let i = 1; i < reservasData.length; i++) {
    const reserva = {
      id: reservasData[i][0],
      fecha: reservasData[i][1],
      hora: reservasData[i][2],
      nombre: reservasData[i][3],
      apellido: reservasData[i][4],
      telefono: reservasData[i][5],
      servicio: reservasData[i][6],
      duracion: reservasData[i][7],
      estado: reservasData[i][8],
      fechaCreacion: reservasData[i][9]
    };
    
    if (!data.fecha || reserva.fecha === data.fecha) {
      reservas.push(reserva);
    }
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      reservas: reservas
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function cerrarDiaEspecifico(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('Configuracion');
  
  // Agregar entrada para cerrar día específico
  const nuevaConfig = [data.fecha, 'CERRADO', '', `Día cerrado por administrador - ${new Date().toISOString()}`];
  configSheet.appendRow(nuevaConfig);
  
  Logger.log(`📅 Día cerrado: ${data.fecha}`);
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: `Día ${data.fecha} cerrado exitosamente`
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function abrirDiaEspecifico(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('Configuracion');
  const configData = configSheet.getDataRange().getValues();
  
  // Buscar y eliminar configuración de día cerrado
  for (let i = configData.length - 1; i >= 1; i--) {
    if (configData[i][0] === data.fecha && configData[i][1] === 'CERRADO') {
      configSheet.deleteRow(i + 1);
      break;
    }
  }
  
  Logger.log(`📅 Día abierto: ${data.fecha}`);
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: `Día ${data.fecha} abierto exitosamente`
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function cancelarReserva(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reservasSheet = ss.getSheetByName('Reservas');
  const reservasData = reservasSheet.getDataRange().getValues();
  
  // Buscar y actualizar la reserva
  for (let i = 1; i < reservasData.length; i++) {
    if (reservasData[i][0] === data.reservaId) {
      reservasSheet.getRange(i + 1, 9).setValue('CANCELADA');
      
      Logger.log(`❌ Reserva cancelada: ${data.reservaId}`);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Reserva cancelada exitosamente'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  throw new Error('Reserva no encontrada');
}

// ===============================================
// FUNCIONES DE UTILIDAD
// ===============================================

function obtenerUrlWebApp() {
  return ScriptApp.getService().getUrl();
}

function limpiarDatosAntiguos() {
  // Función para limpiar reservas antiguas (opcional)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reservasSheet = ss.getSheetByName('Reservas');
  const reservasData = reservasSheet.getDataRange().getValues();
  
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 30); // 30 días atrás
  
  for (let i = reservasData.length - 1; i >= 1; i--) {
    const fechaReserva = new Date(reservasData[i][1]);
    if (fechaReserva < fechaLimite && reservasData[i][8] === 'COMPLETADA') {
      reservasSheet.deleteRow(i + 1);
    }
  }
  
  Logger.log('🧹 Datos antiguos limpiados');
}

// Función para obtener estadísticas
function obtenerEstadisticas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reservasSheet = ss.getSheetByName('Reservas');
  const reservasData = reservasSheet.getDataRange().getValues();
  
  const estadisticas = {
    totalReservas: reservasData.length - 1,
    reservasHoy: 0,
    serviciosMasPopulares: {},
    clientesRecurrentes: {}
  };
  
  const hoy = new Date().toISOString().split('T')[0];
  
  for (let i = 1; i < reservasData.length; i++) {
    const fecha = reservasData[i][1];
    const servicio = reservasData[i][6];
    const cliente = reservasData[i][3] + ' ' + reservasData[i][4];
    
    if (fecha === hoy) {
      estadisticas.reservasHoy++;
    }
    
    if (!estadisticas.serviciosMasPopulares[servicio]) {
      estadisticas.serviciosMasPopulares[servicio] = 0;
    }
    estadisticas.serviciosMasPopulares[servicio]++;
    
    if (!estadisticas.clientesRecurrentes[cliente]) {
      estadisticas.clientesRecurrentes[cliente] = 0;
    }
    estadisticas.clientesRecurrentes[cliente]++;
  }
  
  return estadisticas;
}
