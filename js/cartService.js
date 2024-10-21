const cuentaCarritoElement = document.getElementById("cuenta-carrito");


function agregarAlCarrito(producto){

  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #ee6130, #ee6130)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".80rem"
    },
    offset: {
        x: '2.5rem',
        y: '2rem' 
      },
    onClick: function(){} // Callback after click
  }).showToast();

  //Revisar si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("zapatillas"));
  let cantidadProductoFinal;
  
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("zapatillas",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    
    const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id)
    const nuevaMemoria = memoria;
    
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("zapatillas",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Restar una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("zapatillas"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("zapatillas",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualizar el número del carrito del header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("zapatillas"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Reiniciar el carrito */
function reiniciarCarrito(){

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Productos borrados!",
    showConfirmButton: false,
    timer: 2000
  });


  localStorage.removeItem("zapatillas");
  actualizarNumeroCarrito();
}


actualizarNumeroCarrito();