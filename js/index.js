let zapatillas = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        zapatillas = data;
        crearTarjetasProductosInicio(zapatillas);
    })

const contenedorTarjetas = document.getElementById("productos-container");




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