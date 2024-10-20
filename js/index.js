const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en zapatillas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevaZapatilla = document.createElement("div");
    nuevaZapatilla.classList = "tarjeta-producto"
    nuevaZapatilla.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Zapatilla 1">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevaZapatilla);
    nuevaZapatilla.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(zapatillas);