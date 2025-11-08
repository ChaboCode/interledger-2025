import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    categorias: { type: [String], default: [] },

    // campos opcionales y flexibles:
    aros: { type: [String], default: undefined },
    colores: { type: [String], default: undefined },
    material: { type: [String], default: undefined }
  },
  {
    strict: false, // permite guardar/leer otros campos no definidos
    timestamps: false
  }
);

export const Producto = mongoose.model("Producto", productoSchema, "productos");
