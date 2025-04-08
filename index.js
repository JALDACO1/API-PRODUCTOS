const API_URL = "http://localhost:3002/producto";

// Buscar producto
document.getElementById("buscar").addEventListener("click", function () {
  let codigo = parseInt(document.getElementById("codigo").value);

  fetch(`${API_URL}/${codigo}`)
    .then((response) => response.json())
    .then((resp) => {
      let div = document.getElementById("detalles");
      if (resp.msg == "si") {
        div.innerHTML = `<p>Producto encontrado:</p><h3>Código: ${resp.producto.codigo}</h3><p>Nombre: ${resp.producto.nombre}</p>`;
      } else {
        div.innerHTML = `<p>Producto no encontrado.</p>`;
      }
    });
});

// Agregar producto
document.getElementById("agregar").addEventListener("click", function () {
  let codigo = parseInt(document.getElementById("codigo").value);
  let nombre = document.getElementById("nombre").value;
  let producto = { codigo, nombre };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "detalles"
      ).innerHTML = `<p>Producto agregado:</p><h3>Código: ${data.producto.codigo}</h3><p>Nombre: ${data.producto.nombre}</p>`;
    });
});

// Eliminar producto
document.getElementById("eliminar").addEventListener("click", function () {
  let codigo = parseInt(document.getElementById("codigo").value);

  fetch(`${API_URL}/${codigo}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((res) => {
      let div = document.getElementById("detalles");
      if (res.msg == "Se eliminó") {
        div.innerHTML = `<p>Producto eliminado: Código ${res.producto.codigo}</p>`;
      } else {
        div.innerHTML = `<p>${res.msg}</p>`;
      }
    });
});

// Listar productos
document.getElementById("listar").addEventListener("click", function () {
  fetch(API_URL)
    .then((response) => response.json())
    .then((productos) => {
      let div = document.getElementById("detalles");
      if (productos.length > 0) {
        div.innerHTML = "<h3>Lista de productos:</h3>";
        productos.forEach((producto) => {
          div.innerHTML += `<h3>Código: ${producto.codigo}</h3><p>Nombre: ${producto.nombre}</p><hr>`;
        });
      } else {
        div.innerHTML = "<p>No hay productos en el inventario.</p>";
      }
    });
});
