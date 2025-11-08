// Se ejecuta con el usuario root sobre la BD "admin"
const dbName = process.env.MONGO_DB_NAME || 'tienda';
const appUser = process.env.MONGO_DB_USER || 'appuser';
const appPass = process.env.MONGO_DB_PASS || 'appsecret';

print(`> Creando base ${dbName} y usuario ${appUser}`);

db = db.getSiblingDB(dbName);

// Usuario de aplicación con permisos sobre la base "tienda"
db.createUser({
  user: appUser,
  pwd: appPass,
  roles: [{ role: 'readWrite', db: dbName }]
});

// Colección y datos de ejemplo
db.productos.insertMany([
  { sku: "A-001", nombre: "Cuaderno", precio: 35.5, stock: 100, categorias: ["papeleria"], Aros: ["80"] },
  { sku: "A-002", nombre: "Pluma", precio: 12.0, stock: 300, categorias: ["papeleria"], Colores: ["Azul", "Rojo"] },
  { sku: "B-100", nombre: "Taza", precio: 80.0, stock: 50,  categorias: ["hogar","regalos"], Material: ["Ceramica"] },
]);

print("> Datos iniciales listos");
