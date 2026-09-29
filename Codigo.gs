/* Fares Glam - backend para Google Apps Script.
 * El unico dato que debes cambiar al final es SHEET_ID si usas otro Sheet.
 */

const APP = {
  SHEET_ID: '1P6hZc57Jel6Ankys31dYanln1nF1QREOgHaeG2A3ngg',
  DRIVE_FOLDER_NAME: 'Fares Glam - Fotos',
  TIME_ZONE: 'America/Bogota',
  DEFAULT_PIN: '0000',
  CACHE_SECONDS: 300,
  MAX_IMAGE_BYTES: 4 * 1024 * 1024
};

const TABLES = {
  Productos: ['id', 'categoria', 'nombre', 'acabado', 'precio', 'precio_por_unidad', 'stock', 'agotado_manual', 'visible', 'orden', 'imagen_repo', 'imagen_drive_id', 'actualizado', 'creado_en', 'precio_anterior', 'colores'],
  Pedidos: ['id_pedido', 'fecha', 'nombre', 'whatsapp', 'items_json', 'resumen', 'total', 'estado', 'contactado_en', 'nota', 'direccion', 'referencia'],
  Categorias: ['slug', 'nombre', 'orden', 'visible'],
  Config: ['clave', 'valor']
};

const INITIAL_PRODUCTS = [["ARG-001","argollas","Argolla circones","Bañado en rodio",30000,false,0,false,true,1,"assets/productos/argollas/arg-001_circones_rodio/arg-001_circones_rodio.jpg","",""],["ARG-002","argollas","Argolla entrelazada","Bañado en rodio",30000,false,0,false,true,2,"assets/productos/argollas/arg-002_entrelazada_rodio/arg-002_entrelazada_rodio.jpg","",""],["ARG-003","argollas","Argolla microcircón pequeñas","Bañado en rodio y oro de 18k",15000,false,0,false,true,3,"assets/productos/argollas/arg-003_microcircon-pequenas_oro18k/arg-003_microcircon-pequenas_oro18k.jpg","",""],["ARG-004","argollas","Argolla 006","Bañado en rodio y plata",19000,false,3,false,true,4,"assets/productos/argollas/arg-004_argolla-006_plata/arg-004_argolla-006_plata.jpg","",""],["ARG-005","argollas","Argolla plata","Bañado en rodio y plata",19000,false,3,false,true,5,"assets/productos/argollas/arg-005_plata/arg-005_plata.jpg","",""],["ARG-006","argollas","Argolla tallada","Bañado en rodio y oro de 18k",25000,false,0,false,true,6,"assets/productos/argollas/arg-006_tallada_oro18k/arg-006_tallada_oro18k.jpg","",""],["ARG-007","argollas","Argolla diamantada","Bañado en rodio y oro de 18k",33000,false,0,false,true,7,"assets/productos/argollas/arg-007_diamantada_oro18k/arg-007_diamantada_oro18k.jpg","",""],["TOP-001","topos","Topos cereza","Bañado en rodio y oro de 18k",14000,false,0,false,true,1,"assets/productos/topos/top-001_topos-cereza_oro18k/top-001_topos-cereza_oro18k.jpg","",""],["TOP-002","topos","Topos plateados N6","Bañado en rodio y plata",8000,false,3,false,true,2,"assets/productos/topos/top-002_topos-plateados-n6_plata/top-002_topos-plateados-n6_plata.jpg","",""],["TOP-003","topos","Topos dorados N4","Bañado en rodio y oro de 18k",6000,false,0,false,true,3,"assets/productos/topos/top-003_topos-dorados-n4_oro18k/top-003_topos-dorados-n4_oro18k.jpg","",""],["EUR-001","eur-fur","Eur Fur balines","Bañado en rodio",7500,false,0,false,true,1,"assets/productos/eur-fur/eur-001_balines_rodio/eur-001_balines_rodio.jpg","",""],["EUR-002","eur-fur","Eur Fur circones","Bañado en rodio",15000,false,0,false,true,2,"assets/productos/eur-fur/eur-002_circones_rodio/eur-002_circones_rodio.jpg","",""],["ARE-001","aretes","Aretes aro","Bañado en rodio y oro de 18k",15000,false,3,false,true,1,"assets/productos/aretes/are-001_aro_oro18k/are-001_aro_oro18k.jpg","",""],["ARE-002","aretes","Aretes corazón esmalteado","Bañado en rodio y oro de 18k",30000,false,3,false,true,2,"assets/productos/aretes/are-002_corazon-esmalteado_oro18k/are-002_corazon-esmalteado_oro18k.jpg","",""],["ARE-003","aretes","Aretes van cleef negro","Bañado en rodio",15000,false,3,false,true,3,"assets/productos/aretes/are-003_vancleef-negro_rodio/are-003_vancleef-negro_rodio.jpg","",""],["ARE-004","aretes","Aretes flor vinotinto","Bañado en rodio",35000,false,0,false,true,4,"assets/productos/aretes/are-004_flor-vinotinto_rodio/are-004_flor-vinotinto_rodio.jpg","",""],["ARE-005","aretes","Aretes flor perlada","Bañado en rodio y oro de 18k",28000,false,3,false,true,5,"assets/productos/aretes/are-005_flor-perlada_oro18k/are-005_flor-perlada_oro18k.jpg","",""],["ARE-006","aretes","Aretes flor dorada","Bañado en rodio y oro de 18k",35000,false,3,false,true,6,"assets/productos/aretes/are-006_flor-dorada_oro18k/are-006_flor-dorada_oro18k.jpg","",""],["COL-001","collares","Collar cereza","Bañado en rodio y oro de 18k",35000,false,3,false,true,1,"assets/productos/collares/col-001_cereza_oro18k/col-001_cereza_oro18k.jpg","",""],["COL-002","collares","Collar corazón rosa (vinotinto)","Bañado en rodio",28000,false,0,false,true,2,"assets/productos/collares/col-002_corazon-rosa-vinotinto_rodio/col-002_corazon-rosa-vinotinto_rodio.jpg","",""],["COL-003","collares","Collar corazones","Bañado en rodio y oro de 18k",30000,false,0,false,true,3,"assets/productos/collares/col-003_corazones_oro18k/col-003_corazones_oro18k.jpg","",""],["COL-004","collares","Collar girasol","Bañado en rodio y oro de 18k",30000,false,3,false,true,4,"assets/productos/collares/col-004_girasol_oro18k/col-004_girasol_oro18k.jpg","",""],["COL-005","collares","Collar cruz","Bañado en rodio y oro de 18k",30000,false,0,false,true,5,"assets/productos/collares/col-005_cruz_oro18k/col-005_cruz_oro18k.jpg","",""],["COL-006","collares","Collar rosa","Bañado en rodio y oro de 18k",32000,false,0,false,true,6,"assets/productos/collares/col-006_rosa_oro18k/col-006_rosa_oro18k.jpg","",""],["COL-007","collares","Collar van cleef","Bañado en rodio",28000,false,0,false,true,7,"assets/productos/collares/col-007_van-cleef_rodio/col-007_van-cleef_rodio.jpg","",""],["COL-008","collares","Collar corazón verde","Bañado en rodio",32000,false,3,false,true,8,"assets/productos/collares/col-008_corazon-verde_rodio/col-008_corazon-verde_rodio.jpg","",""],["COL-009","collares","Collar cruz esmeralda","Bañado en rodio",32000,false,3,false,true,9,"assets/productos/collares/col-009_cruz-esmeralda_rodio/col-009_cruz-esmeralda_rodio.jpg","",""],["COL-010","collares","Collar corazón rojo","Bañado en rodio",32000,false,3,false,true,10,"assets/productos/collares/col-010_corazon-rojo_rodio/col-010_corazon-rojo_rodio.jpg","",""],["PUL-001","pulseras","Pulsera doble corazón","Bañado en rodio",40000,false,3,false,true,1,"assets/productos/pulseras/pul-001_doble-corazon_rodio/pul-001_doble-corazon_rodio.jpg","",""],["PUL-002","pulseras","Pulsera Ref 001","Bañado en rodio y oro de 18k",45000,false,3,false,true,2,"assets/productos/pulseras/pul-002_ref-001_oro18k/pul-002_ref-001_oro18k.jpg","",""],["PUL-003","pulseras","Pulsera pandora cereza","Bañado en rodio y oro de 18k",50000,false,3,false,true,3,"assets/productos/pulseras/pul-003_pandora-cereza_oro18k/pul-003_pandora-cereza_oro18k.jpg","",""],["PUL-004","pulseras","Pulsera pandora corazón","Bañado en rodio y oro de 18k",50000,false,3,false,true,4,"assets/productos/pulseras/pul-004_pandora-corazon_oro18k/pul-004_pandora-corazon_oro18k.jpg","",""],["PUL-005","pulseras","Pulseras perladas","Bañado en rodio",33000,true,0,false,true,5,"assets/productos/pulseras/pul-005_pulseras-perladas_rodio/pul-005_pulseras-perladas_rodio.jpg","",""],["PUL-006","pulseras","Pulsera Ref 002","Bañado en rodio",50000,false,3,false,true,6,"assets/productos/pulseras/pul-006_ref-002_rodio/pul-006_ref-002_rodio.jpg","",""],["PUL-007","pulseras","Pulsera pandora","Bañado en rodio y oro de 18k",50000,false,3,false,true,7,"assets/productos/pulseras/pul-007_pandora_oro18k/pul-007_pandora_oro18k.jpg","",""],["PUL-008","pulseras","Pulsera corazón graduable","Bañado en rodio y oro de 18k",45000,false,0,false,true,8,"assets/productos/pulseras/pul-008_corazon-graduable_oro18k/pul-008_corazon-graduable_oro18k.jpg","",""],["PUL-009","pulseras","Pulsera corazón verde","Bañado en rodio",30000,false,0,false,true,9,"assets/productos/pulseras/pul-009_corazon-verde_rodio/pul-009_corazon-verde_rodio.jpg","",""],["PUL-010","pulseras","Pulsera corazón morado","Bañado en rodio",30000,false,0,false,true,10,"assets/productos/pulseras/pul-010_corazon-morado_rodio/pul-010_corazon-morado_rodio.jpg","",""],["ANI-001","anillos","Anillo circón doble","Bañado en rodio y oro de 18k",20000,false,0,false,true,1,"assets/productos/anillos/ani-001_circon-doble_oro18k/ani-001_circon-doble_oro18k.jpg","",""],["ANI-002","anillos","Anillo Ref 002","Bañado en rodio y oro de 18k",36000,false,3,false,true,2,"assets/productos/anillos/ani-002_ref-002_oro18k/ani-002_ref-002_oro18k.jpg","",""],["ANI-003","anillos","Anillo microcircón","Bañado en rodio y oro de 18k",25000,false,0,false,true,3,"assets/productos/anillos/ani-003_microcircon_oro18k/ani-003_microcircon_oro18k.jpg","",""],["ANI-004","anillos","Anillo circón","Bañado en rodio",19000,false,0,false,true,4,"assets/productos/anillos/ani-004_circon_rodio/ani-004_circon_rodio.jpg","",""],["ANI-005","anillos","Anillo circones","Bañado en rodio",20000,false,0,false,true,5,"assets/productos/anillos/ani-005_circones_rodio/ani-005_circones_rodio.jpg","",""],["ANI-006","anillos","Anillo flor","Bañado en rodio y oro de 18k",29000,false,3,false,true,6,"assets/productos/anillos/ani-006_anillo-flor_oro18k/ani-006_anillo-flor_oro18k.jpg","",""],["ANI-007","anillos","Anillo circón cruzado","Bañado en rodio",22000,false,0,false,true,7,"assets/productos/anillos/ani-007_circon-cruzado_rodio/ani-007_circon-cruzado_rodio.jpg","",""],["ANI-008","anillos","Anillo corazón doble","Bañado en rodio",28000,false,0,false,true,8,"assets/productos/anillos/ani-008_corazon-doble_rodio/ani-008_corazon-doble_rodio.jpg","",""],["ANI-009","anillos","Anillo Ref 009","Bañado en rodio y oro de 18k",23000,false,3,false,true,9,"assets/productos/anillos/ani-009_ref-009_oro18k/ani-009_ref-009_oro18k.jpg","",""],["ANI-010","anillos","Anillo corazón rojo","Bañado en rodio y oro de 18k",25000,false,0,false,true,10,"assets/productos/anillos/ani-010_corazon-rojo_oro18k/ani-010_corazon-rojo_oro18k.jpg","",""],["ANI-011","anillos","Anillo Ref 011","Bañado en rodio",26000,false,3,false,true,11,"assets/productos/anillos/ani-011_ref-011_rodio/ani-011_ref-011_rodio.jpg","",""]];

const INITIAL_CATEGORIES = [
  ['argollas', 'Argollas', 1, true],
  ['topos', 'Topos', 2, true],
  ['eur-fur', 'Eur Fur', 3, true],
  ['aretes', 'Aretes', 4, true],
  ['collares', 'Collares', 5, true],
  ['pulseras', 'Pulseras', 6, true],
  ['anillos', 'Anillos', 7, true]
];

/* Mensaje que se envia al cliente desde el boton "Contactar".
 * Marcadores disponibles: {nombre} {tienda} {pedido} {lineas} {total} {direccion} {referencia} */
const WHATSAPP_TEMPLATE = 'Hola {nombre}, te escribimos de {tienda}.\n\nTu pedido {pedido} fue registrado:\n{lineas}\n\nTotal: {total}\n\nDirección: {direccion}\nPunto de referencia: {referencia}\n\nPara pagar tu pedido:\nNequi: 3044160047\n🔑 Llave: 1007963069\n\nCuando realices el pago, envíanos el comprobante por este chat. ¡Gracias!';

const INITIAL_CONFIG = [
  ['nombre_tienda', 'Fares Glam'],
  ['eslogan', 'Moda femenina'],
  ['pais_codigo', 57],
  ['moneda', 'COP'],
  ['whatsapp_tienda', ''],
  ['instagram', 'faresglam_'],
  ['email_avisos', ''],
  ['umbral_pocas_unidades', 3],
  ['mostrar_agotados', true],
  ['plantilla_whatsapp', WHATSAPP_TEMPLATE]
];

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || 'catalog');
    if (action === 'catalog') return json_(catalog_());
    return json_(error_('NOT_FOUND', 'Accion no encontrada.'));
  } catch (err) {
    return json_(error_('SERVER', err.message));
  }
}

function doPost(e) {
  try {
    const body = parseBody_(e);
    const action = String(body.action || '');
    const result = dispatch_(action, body);
    return json_(result);
  } catch (err) {
    return json_(error_(err.code || 'SERVER', err.message));
  }
}

function setup() {
  const ss = spreadsheet_();
  Object.keys(TABLES).forEach(function(name) {
    const sheet = sheet_(ss, name);
    ensureHeaders_(sheet, TABLES[name]);
  });
  seedInitialData_();
  migrateWhatsappTemplate_();
  const folder = ensureDriveFolder_();
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('PIN_HASH')) {
    const salt = Utilities.getUuid();
    props.setProperties({
      PIN_SALT: salt,
      PIN_HASH: hash_(APP.DEFAULT_PIN, salt),
      PIN_DEFAULT: 'true',
      FOLDER_ID: folder.getId(),
      ORDER_COUNTER: '0'
    }, false);
  } else if (!props.getProperty('FOLDER_ID')) {
    props.setProperty('FOLDER_ID', folder.getId());
  }
  invalidateCache_();
  return { ok: true, message: 'Fares Glam quedo configurado.', folder_id: folder.getId() };
}

function seedInitialData_() {
  const productSheet = sheet_(spreadsheet_(), 'Productos');
  if (productSheet.getLastRow() <= 1) productSheet.getRange(2, 1, INITIAL_PRODUCTS.length, TABLES.Productos.length).setValues(INITIAL_PRODUCTS.map(function(row) { return row.concat(['', '', '']); }));
  const categorySheet = sheet_(spreadsheet_(), 'Categorias');
  if (categorySheet.getLastRow() <= 1) categorySheet.getRange(2, 1, INITIAL_CATEGORIES.length, TABLES.Categorias.length).setValues(INITIAL_CATEGORIES);
  const configSheet = sheet_(spreadsheet_(), 'Config');
  if (configSheet.getLastRow() <= 1) configSheet.getRange(2, 1, INITIAL_CONFIG.length, TABLES.Config.length).setValues(INITIAL_CONFIG);
}

/* Actualiza el mensaje guardado en la hoja Config si todavia es el antiguo
 * (el que no incluye {direccion}). Si ya lo personalizaste con {direccion}, no lo toca. */
function migrateWhatsappTemplate_() {
  const sheet = sheet_(spreadsheet_(), 'Config');
  const row = readTable_('Config').find(function(r) { return String(r.clave) === 'plantilla_whatsapp'; });
  if (!row) { appendRow_('Config', { clave: 'plantilla_whatsapp', valor: WHATSAPP_TEMPLATE }); return; }
  if (String(row.valor).indexOf('{direccion}') === -1) {
    row.valor = WHATSAPP_TEMPLATE;
    writeRow_(sheet, row._row, TABLES.Config, row);
  }
}

function dispatch_(action, body) {
  switch (action) {
    case 'login': return login_(body);
    case 'logout': requireToken_(body.token); return { ok: true };
    case 'admin_data': requireToken_(body.token); return adminData_();
    case 'product_patch': requireToken_(body.token); return productPatch_(body);
    case 'product_create': requireToken_(body.token); return productCreate_(body);
    case 'product_delete': requireToken_(body.token); return productDelete_(body);
    case 'category_create': requireToken_(body.token); return categoryCreate_(body);
    case 'image_upload': requireToken_(body.token); return imageUpload_(body);
    case 'order_create': return orderCreate_(body);
    case 'orders_list': requireToken_(body.token); return ordersList_(body);
    case 'order_update': requireToken_(body.token); return orderUpdate_(body);
    case 'settings_save': requireToken_(body.token); return settingsSave_(body);
    case 'pin_change': requireToken_(body.token); return pinChange_(body);
    default: return error_('NOT_FOUND', 'Accion no encontrada.');
  }
}

function catalog_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('catalog');
  if (cached) return JSON.parse(cached);
  const config = configMap_();
  const categories = readTable_('Categorias').filter(function(row) { return truthy_(row.visible); })
    .sort(function(a, b) { return number_(a.orden) - number_(b.orden); });
  const products = readTable_('Productos').filter(function(row) {
    return truthy_(row.visible) && (truthy_(config.mostrar_agotados) || !soldOut_(row, config));
  }).map(function(row) { return publicProduct_(row, config); })
    .sort(function(a, b) { return String(a.categoria).localeCompare(String(b.categoria)) || number_(a.orden) - number_(b.orden); });
  const result = { ok: true, generado: new Date().toISOString(), config: config, categorias: categories, productos: products };
  cache.put('catalog', JSON.stringify(result), APP.CACHE_SECONDS);
  return result;
}

function adminData_() {
  const config = configMap_();
  return { ok: true, config: config, categorias: readTable_('Categorias'), productos: readTable_('Productos'), pedidos: ordersList_({ estado: 'todos' }).pedidos, pin_default: PropertiesService.getScriptProperties().getProperty('PIN_DEFAULT') === 'true' };
}

function login_(body) {
  const props = PropertiesService.getScriptProperties();
  const now = Date.now();
  const lockedUntil = number_(props.getProperty('LOGIN_LOCKED_UNTIL'));
  if (lockedUntil > now) throw codeError_('LOCKED', 'Demasiados intentos. Prueba en 15 minutos.');
  const salt = props.getProperty('PIN_SALT');
  if (!salt || !props.getProperty('PIN_HASH')) setup();
  const pin = String(body.pin || '');
  if (hash_(pin, props.getProperty('PIN_SALT')) !== props.getProperty('PIN_HASH')) {
    const failures = number_(props.getProperty('LOGIN_FAILURES')) + 1;
    props.setProperty('LOGIN_FAILURES', String(failures));
    if (failures >= 5) {
      props.setProperties({ LOGIN_FAILURES: '0', LOGIN_LOCKED_UNTIL: String(now + 15 * 60 * 1000) }, false);
      throw codeError_('LOCKED', 'Demasiados intentos. Prueba en 15 minutos.');
    }
    throw codeError_('BAD_PIN', 'PIN incorrecto.');
  }
  props.deleteProperty('LOGIN_FAILURES');
  props.deleteProperty('LOGIN_LOCKED_UNTIL');
  const token = Utilities.getUuid() + '-' + Utilities.getUuid();
  const sessions = sessions_();
  sessions[hash_(token)] = { exp: now + 7 * 24 * 60 * 60 * 1000 };
  props.setProperty('SESSIONS', JSON.stringify(sessions));
  return { ok: true, token: token, expira: new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString(), pin_default: props.getProperty('PIN_DEFAULT') === 'true' };
}

function orderCreate_(body) {
  const requestId = String(body.request_id || '');
  const name = clean_(body.nombre, 60);
  const whatsapp = clean_(body.whatsapp, 30);
  const address = clean_(body.direccion, 150);
  const reference = clean_(body.referencia, 150);
  const items = Array.isArray(body.items) ? body.items : [];
  if (!requestId || name.length < 2 || !validWhatsapp_(whatsapp) || address.length < 5 || reference.length < 2 || !items.length) throw codeError_('VALIDATION', 'Completa nombre, WhatsApp, dirección, punto de referencia y productos.');
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const props = PropertiesService.getScriptProperties();
    const requestKey = 'REQ_' + hash_(requestId, 'request');
    const prior = props.getProperty(requestKey);
    if (prior) return JSON.parse(prior);
    const all = readTable_('Productos');
    const byId = {}; all.forEach(function(p) { byId[String(p.id)] = p; });
    const cleanItems = [];
    const changed = [];
    let total = 0;
    items.forEach(function(item) {
      const id = String(item.id || '');
      const qty = Math.floor(number_(item.cantidad));
      const product = byId[id];
      if (!product || !truthy_(product.visible) || soldOut_(product, configMap_()) || qty < 1 || qty > number_(product.stock)) throw codeError_('STOCK', 'Algunos productos ya no tienen esa cantidad.');
      const price = number_(product.precio);
      const colors = colorList_(product.colores);
      let color = clean_(item.color, 30);
      if (colors.length) {
        const match = colors.filter(function(c) { return c.toLowerCase() === color.toLowerCase(); })[0];
        if (!match) throw codeError_('COLOR', 'Elige un color disponible para ' + product.nombre + '.');
        color = match;
      } else { color = ''; }
      cleanItems.push({ id: id, nombre: String(product.nombre) + (color ? ' (' + color + ')' : ''), color: color, cantidad: qty, precio: price });
      total += price * qty;
      product.stock = number_(product.stock) - qty;
      product.agotado_manual = false;
      product.actualizado = new Date().toISOString();
      changed.push(product);
    });
    const sheet = sheet_(spreadsheet_(), 'Productos');
    changed.forEach(function(p) { writeRow_(sheet, p._row, TABLES.Productos, p); });
    const orderId = nextOrderId_();
    const summary = cleanItems.map(function(i) { return i.cantidad + ' x ' + i.nombre; }).join(', ');
    const order = { id_pedido: orderId, fecha: new Date().toISOString(), nombre: name, whatsapp: whatsapp, items_json: JSON.stringify(cleanItems), resumen: summary, total: total, estado: 'nuevo', contactado_en: '', nota: '', direccion: address, referencia: reference };
    appendRow_('Pedidos', order);
    const result = { ok: true, pedido: orderId, total: total, items: cleanItems };
    props.setProperty(requestKey, JSON.stringify(result));
    invalidateCache_();
    notifyNewOrder_(order);
    return result;
  } finally { lock.releaseLock(); }
}

function productPatch_(body) {
  const id = String(body.id || '');
  const sheet = sheet_(spreadsheet_(), 'Productos');
  const product = findRow_('Productos', 'id', id);
  if (!product) throw codeError_('NOT_FOUND', 'Producto no encontrado.');
  const oldPrice = number_(product.precio);
  ['categoria', 'nombre', 'acabado', 'precio', 'precio_por_unidad', 'stock', 'agotado_manual', 'visible', 'orden', 'colores'].forEach(function(key) {
    if (Object.prototype.hasOwnProperty.call(body, key)) product[key] = body[key];
  });
  product.precio = Math.max(0, Math.floor(number_(product.precio)));
  if (Object.prototype.hasOwnProperty.call(body, 'precio')) product.precio_anterior = product.precio < oldPrice ? oldPrice : '';
  product.stock = Math.max(0, Math.floor(number_(product.stock)));
  product.colores = colorList_(product.colores).join(', ');
  product.actualizado = new Date().toISOString();
  writeRow_(sheet, product._row, TABLES.Productos, product);
  invalidateCache_();
  return { ok: true, producto: product }; 
}

function productCreate_(body) {
  const category = clean_(body.categoria, 40);
  const name = clean_(body.nombre, 120);
  if (!category || !name) throw codeError_('VALIDATION', 'Categoria y nombre son obligatorios.');
  const now = new Date().toISOString();
  const product = { id: nextProductId_(category), categoria: category, nombre: name, acabado: clean_(body.acabado, 80), precio: Math.max(0, Math.floor(number_(body.precio))), precio_por_unidad: truthy_(body.precio_por_unidad), stock: Math.max(0, Math.floor(number_(body.stock))), agotado_manual: false, visible: true, orden: nextOrder_(category), imagen_repo: '', imagen_drive_id: '', actualizado: now, creado_en: now, precio_anterior: '', colores: colorList_(body.colores).join(', ') };
  appendRow_('Productos', product);
  invalidateCache_();
  return { ok: true, producto: product };
}

function productDelete_(body) {
  const product = findRow_('Productos', 'id', String(body.id || ''));
  if (!product) throw codeError_('NOT_FOUND', 'Producto no encontrado.');
  const driveId = String(product.imagen_drive_id || '');
  if (driveId) { try { DriveApp.getFileById(driveId).setTrashed(true); } catch (ignore) {} }
  sheet_(spreadsheet_(), 'Productos').deleteRow(product._row);
  invalidateCache_();
  return { ok: true, eliminado: product.id };
}

function categoryCreate_(body) {
  const name = clean_(body.nombre, 50);
  const slug = clean_(body.slug || name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), 40);
  if (!name || !slug) throw codeError_('VALIDATION', 'Nombre de categoria obligatorio.');
  if (findRow_('Categorias', 'slug', slug)) throw codeError_('VALIDATION', 'Esa categoria ya existe.');
  const categories = readTable_('Categorias');
  const category = { slug: slug, nombre: name, orden: categories.length + 1, visible: true };
  appendRow_('Categorias', category);
  invalidateCache_();
  return { ok: true, categoria: category };
}

function imageUpload_(body) {
  const id = String(body.id || '');
  const mime = String(body.mime || '');
  const data = String(body.data || '').replace(/^data:[^;]+;base64,/, '');
  if (!/^image\/(jpeg|jpg|png|webp)$/i.test(mime) || !data) throw codeError_('VALIDATION', 'La imagen no es valida.');
  const bytes = Utilities.base64Decode(data);
  if (bytes.length > APP.MAX_IMAGE_BYTES) throw codeError_('LIMIT', 'La imagen supera 4 MB.');
  const product = findRow_('Productos', 'id', id);
  if (!product) throw codeError_('NOT_FOUND', 'Producto no encontrado.');
  const folder = ensureDriveFolder_();
  const ext = mime.toLowerCase().indexOf('png') >= 0 ? 'png' : 'jpg';
  const file = folder.createFile(Utilities.newBlob(bytes, mime, id + '_' + Date.now() + '.' + ext));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  const oldId = String(product.imagen_drive_id || '');
  product.imagen_drive_id = file.getId();
  product.actualizado = new Date().toISOString();
  writeRow_(sheet_(spreadsheet_(), 'Productos'), product._row, TABLES.Productos, product);
  if (oldId && oldId !== file.getId()) { try { DriveApp.getFileById(oldId).setTrashed(true); } catch (ignore) {} }
  invalidateCache_();
  return { ok: true, imagen_drive_id: file.getId(), producto: product };
}

function ordersList_(body) {
  const state = String(body.estado || 'todos');
  const orders = readTable_('Pedidos').filter(function(o) { return state === 'todos' || !state || String(o.estado) === state; }).sort(function(a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
  return { ok: true, pedidos: orders, nuevos: orders.filter(function(o) { return String(o.estado) === 'nuevo'; }).length };
}

function orderUpdate_(body) {
  const id = String(body.id_pedido || '');
  const order = findRow_('Pedidos', 'id_pedido', id);
  if (!order) throw codeError_('NOT_FOUND', 'Pedido no encontrado.');
  const next = String(body.estado || '');
  if (!['nuevo', 'contactado', 'entregado', 'cancelado'].includes(next)) throw codeError_('VALIDATION', 'Estado no valido.');
  const lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    if (next === 'cancelado' && String(order.estado) !== 'cancelado') {
      const items = JSON.parse(order.items_json || '[]');
      const productSheet = sheet_(spreadsheet_(), 'Productos');
      items.forEach(function(item) {
        const product = findRow_('Productos', 'id', item.id);
        if (product) { product.stock = number_(product.stock) + number_(item.cantidad); product.agotado_manual = false; product.actualizado = new Date().toISOString(); writeRow_(productSheet, product._row, TABLES.Productos, product); }
      });
    }
    order.estado = next;
    order.nota = clean_(body.nota, 300);
    if (next === 'contactado' && !order.contactado_en) order.contactado_en = new Date().toISOString();
    writeRow_(sheet_(spreadsheet_(), 'Pedidos'), order._row, TABLES.Pedidos, order);
    invalidateCache_();
    return { ok: true, pedido: order };
  } finally { lock.releaseLock(); }
}

function settingsSave_(body) {
  const allowed = ['nombre_tienda', 'eslogan', 'pais_codigo', 'moneda', 'whatsapp_tienda', 'instagram', 'email_avisos', 'umbral_pocas_unidades', 'mostrar_agotados', 'plantilla_whatsapp'];
  const sheet = sheet_(spreadsheet_(), 'Config');
  const rows = readTable_('Config');
  allowed.forEach(function(key) {
    if (!Object.prototype.hasOwnProperty.call(body, key)) return;
    const row = rows.find(function(r) { return String(r.clave) === key; });
    if (row) { row.valor = clean_(body[key], 1000); writeRow_(sheet, row._row, TABLES.Config, row); }
    else appendRow_('Config', { clave: key, valor: body[key] });
  });
  invalidateCache_();
  return { ok: true, config: configMap_() };
}

function pinChange_(body) {
  const props = PropertiesService.getScriptProperties();
  const current = String(body.pin_actual || '');
  const next = String(body.pin_nuevo || '');
  if (!/^\d{4}$/.test(next) || hash_(current, props.getProperty('PIN_SALT')) !== props.getProperty('PIN_HASH')) throw codeError_('VALIDATION', 'PIN actual o nuevo no valido.');
  props.setProperties({ PIN_HASH: hash_(next, props.getProperty('PIN_SALT')), PIN_DEFAULT: 'false' }, false);
  return { ok: true };
}

function spreadsheet_() { return SpreadsheetApp.openById(APP.SHEET_ID); }
function sheet_(ss, name) { return ss.getSheetByName(name) || ss.insertSheet(name); }
function ensureHeaders_(sheet, headers) { if (sheet.getLastRow() === 0) { sheet.getRange(1, 1, 1, headers.length).setValues([headers]); return; } const current = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0].map(String); if (current.every(function(v) { return !v; })) { sheet.getRange(1, 1, 1, headers.length).setValues([headers]); return; } headers.forEach(function(header) { if (current.indexOf(header) === -1) { sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header); current.push(header); } }); }
function readTable_(name) { const sheet = sheet_(spreadsheet_(), name); ensureHeaders_(sheet, TABLES[name]); const values = sheet.getDataRange().getValues(); if (values.length < 2) return []; const headers = values[0].map(String); return values.slice(1).filter(function(row) { return row.some(function(v) { return v !== ''; }); }).map(function(row, index) { const obj = { _row: index + 2 }; headers.forEach(function(h, i) { obj[h] = row[i]; }); return obj; }); }
function appendRow_(name, obj) { const sheet = sheet_(spreadsheet_(), name); ensureHeaders_(sheet, TABLES[name]); sheet.appendRow(TABLES[name].map(function(h) { return obj[h] === undefined ? '' : obj[h]; })); }
function writeRow_(sheet, rowNumber, headers, obj) { sheet.getRange(rowNumber, 1, 1, headers.length).setValues([headers.map(function(h) { return obj[h] === undefined ? '' : obj[h]; })]); }
function findRow_(name, key, value) { return readTable_(name).find(function(row) { return String(row[key]) === String(value); }) || null; }
function configMap_() { const out = {}; readTable_('Config').forEach(function(row) { out[String(row.clave)] = parseValue_(row.valor); }); return out; }
function publicProduct_(row, config) { return { id: String(row.id), categoria: String(row.categoria), nombre: String(row.nombre), acabado: String(row.acabado || ''), precio: number_(row.precio), precio_anterior: number_(row.precio_anterior), precio_por_unidad: truthy_(row.precio_por_unidad), stock: number_(row.stock), agotado: soldOut_(row, config), orden: number_(row.orden), imagen_repo: String(row.imagen_repo || ''), imagen_drive_id: String(row.imagen_drive_id || ''), creado_en: String(row.creado_en || ''), colores: colorList_(row.colores) }; }
function soldOut_(row, config) { return truthy_(row.agotado_manual) || number_(row.stock) <= 0; }
function ensureDriveFolder_() { const props = PropertiesService.getScriptProperties(); const id = props.getProperty('FOLDER_ID'); if (id) { try { return DriveApp.getFolderById(id); } catch (ignore) {} } const folders = DriveApp.getFoldersByName(APP.DRIVE_FOLDER_NAME); const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(APP.DRIVE_FOLDER_NAME); props.setProperty('FOLDER_ID', folder.getId()); return folder; }
function nextOrderId_() { const props = PropertiesService.getScriptProperties(); const n = number_(props.getProperty('ORDER_COUNTER')) + 1; props.setProperty('ORDER_COUNTER', String(n)); return 'P-' + ('0000' + n).slice(-4); }
function nextProductId_(category) { const prefix = String(category).slice(0, 3).toUpperCase(); const rows = readTable_('Productos'); let max = 0; rows.forEach(function(p) { if (String(p.id).indexOf(prefix + '-') === 0) max = Math.max(max, number_(String(p.id).split('-')[1])); }); return prefix + '-' + ('000' + (max + 1)).slice(-3); }
function nextOrder_(category) { return readTable_('Productos').filter(function(p) { return String(p.categoria) === category; }).length + 1; }
function requireToken_(token) { const sessions = sessions_(); const session = sessions[hash_(String(token || ''))]; if (!session || number_(session.exp) < Date.now()) throw codeError_('AUTH', 'Sesion vencida.'); return true; }
function sessions_() { try { return JSON.parse(PropertiesService.getScriptProperties().getProperty('SESSIONS') || '{}'); } catch (ignore) { return {}; } }
function notifyNewOrder_(order) { const email = String(configMap_().email_avisos || ''); if (!email) return; try { MailApp.sendEmail(email, 'Nuevo pedido ' + order.id_pedido + ' - $' + order.total, order.resumen + '\nCliente: ' + order.nombre + '\nWhatsApp: ' + order.whatsapp + '\nDirección: ' + order.direccion + '\nReferencia: ' + order.referencia); } catch (ignore) {} }
function invalidateCache_() { CacheService.getScriptCache().remove('catalog'); }
function parseBody_(e) { if (!e || !e.postData || !e.postData.contents) return {}; const raw = e.postData.contents; try { return JSON.parse(raw); } catch (ignore) { return e.parameter || {}; } }
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function error_(code, message) { return { ok: false, code: code, message: String(message || 'Error.') }; }
function codeError_(code, message) { const err = new Error(message); err.code = code; return err; }
function clean_(value, max) { return String(value === undefined || value === null ? '' : value).trim().slice(0, max); }
function number_(value) { const n = Number(value); return isFinite(n) ? n : 0; }
function truthy_(value) { return value === true || value === 1 || String(value).toLowerCase() === 'true' || String(value).toLowerCase() === 'si'; }
function parseValue_(value) { if (typeof value === 'boolean' || typeof value === 'number') return value; const s = String(value); if (/^(true|false)$/i.test(s)) return s.toLowerCase() === 'true'; if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s); return s; }
function validWhatsapp_(value) { const digits = String(value || '').replace(/\D/g, ''); return /^3\d{9}$/.test(digits) || /^573\d{9}$/.test(digits); }
function hash_(value, salt) { return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(salt || '') + String(value || ''), Utilities.Charset.UTF_8)); }

/* Colores opcionales de un producto. Acepta texto "Rojo, Verde" o lista.
 * Devuelve una lista limpia: sin repetidos, maximo 12 colores de 20 letras. */
function colorList_(value) {
  const parts = Array.isArray(value) ? value : String(value || '').split(/[,;\n]/);
  const seen = {};
  const out = [];
  parts.forEach(function(c) {
    const color = String(c).trim().slice(0, 20);
    const key = color.toLowerCase();
    if (color && !seen[key] && out.length < 12) { seen[key] = true; out.push(color); }
  });
  return out;
}
