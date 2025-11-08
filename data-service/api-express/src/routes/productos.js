import { Router } from "express";
import { Producto } from "../models/Producto.js";

const router = Router();

// GET /api/productos?categoria=papeleria&min=10&max=100
router.get("/", async (req, res) => {
  try {
    const { categoria, min, max } = req.query;
    const filter = {};

    if (categoria) filter.categorias = categoria;
    if (min || max) {
      filter.precio = {};
      if (min) filter.precio.$gte = Number(min);
      if (max) filter.precio.$lte = Number(max);
    }

    const docs = await Producto.find(filter).lean();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error listando productos" });
  }
});

// GET /api/productos/A-001
router.get("/:sku", async (req, res) => {
  try {
    const doc = await Producto.findOne({ sku: req.params.sku }).lean();
    if (!doc) return res.status(404).json({ error: "No encontrado" });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo producto" });
  }
});

// POST /api/productos
// body: { sku, nombre, precio, stock, categorias, ...campos flex }
router.post("/", async (req, res) => {
  try {
    const created = await Producto.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    const code = err.code === 11000 ? 409 : 400; // SKU duplicado
    res.status(code).json({ error: err.message });
  }
});

// PATCH /api/productos/A-002
// body: { colores: ["Azul","Rojo"] } (por ejemplo)
router.patch("/:sku", async (req, res) => {
  try {
    const updated = await Producto.findOneAndUpdate(
      { sku: req.params.sku },
      { $set: req.body },
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return res.status(404).json({ error: "No encontrado" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
