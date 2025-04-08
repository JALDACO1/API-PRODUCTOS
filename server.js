const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

class Producto {
  constructor(codigo, nombre) {
    this.codigo = codigo;
    this.nombre = nombre;
  }
}

class Inventario {
  constructor() {
    this.productos = [];
  }
  agregarProducto(producto) {
    this.productos.push(producto);
  }
  buscarProducto(codigo) {
    return this.productos.find((p) => p.codigo === codigo);
  }
  eliminarProducto(codigo) {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].codigo === codigo) {
        let eliminado = this.productos[i];
        this.productos.splice(i, 1);
        return eliminado;
      }
    }
    return null;
  }
  listarProductos() {
    return this.productos;
  }
}

let inventario = new Inventario();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Buscar
app.get("/producto/:codigo", (req, res) => {
  let codigo = parseInt(req.params.codigo);
  let producto = inventario.buscarProducto(codigo);
  if (producto) 
    res.json({ msg: "si", producto });
  else 
    res.json({ msg: "Producto no encontrado" });
});

// Agregar
app.post("/producto", (req, res) => {
  let { codigo, nombre } = req.body;
  let nuevoProducto = new Producto(codigo, nombre);
  inventario.agregarProducto(nuevoProducto);
  res.json({ msg: "Producto agregado", producto: nuevoProducto });
});

// Eliminar
app.delete("/producto/:codigo", (req, res) => {
  let codigo = parseInt(req.params.codigo);
  let eliminado = inventario.eliminarProducto(codigo);
  if (eliminado) 
  res.json({ msg: "Se eliminó", producto: eliminado });
  else 
  res.json({ msg: "Producto no encontrado" });
});

// Listar
app.get("/producto", (req, res) => {
  res.json(inventario.listarProductos());
});

app.listen(3002, () => console.log("Servidor corriendo en puerto 3002"));
