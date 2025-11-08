import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectMongo } from "./db.js";
import productosRouter from "./routes/productos.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("API OK"));
app.use("/api/productos", productosRouter);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectMongo(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 API escuchando en http://localhost:${PORT}`));
  } catch (e) {
    console.error("❌ No se pudo iniciar la API:", e);
    process.exit(1);
  }
})();
