const listproducts = document.getElementById("list-products");
const listOrder = document.querySelector(".right-content-order");

const listempty = document.querySelector("#list-empty");

const numberProducts = document.querySelector("#number-products");

const calculatePrice = document.querySelector("#calculatePrice");

let orderCantidad = 0;
let orderTotal = 0;

let listProductOrder = [];

const calculate = () => {
  // Reinicia el total antes de calcular
  console.log("calculando")
  orderTotal = 0;

  // Recorre los productos y suma el precio total con la cantidad correspondiente
  listProductOrder.forEach((product) => {
    orderTotal += product.price * product.quantity;
  });

  // Actualiza el contenido en el elemento del precio
  const price = document.querySelector("#price");
  price.innerHTML = `$${orderTotal.toFixed(2)}`; // Asegúrate de mostrar con dos decimales
};

const createCart = () => {
  console.log(listProductOrder);

  listOrder.innerHTML = "";

  // Crear elementos del carrito para cada producto
  listProductOrder.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add(
      "bg-red-500",
      "flex",
      "w-100",
      "justify-between",
      "items-center",
      "my-5"
    );

    cartItem.innerHTML = `
      <div class="w-full text-[14px]">
        <p class="font-semibold">${product.name}</p>
        <div class="flex gap-3">
          <p class="text-orangestyle">x${product.quantity}</p>
          <p class="text-rose-300">@ $${product.price}</p>
          <p class="text-rose-500">$${product.quantity * product.price}</p>
        </div>
      </div>
      <div class="remove-button rounded-full border-solid border-2 border-rose-300 p-1 cursor-pointer hover:border-rose-500">
        <img src="assets/images/icon-remove-item.svg" width="20" alt="">
      </div>
    `;

    // Agregar evento de eliminación al botón
    const removeButton = cartItem.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
      // Encontrar el índice del producto y eliminarlo
      const index = listProductOrder.findIndex((p) => p.name === product.name);

      if (index !== -1) {
        // Remover del array
        listProductOrder.splice(index, 1);
        
        // Reducir la cantidad total de productos
        orderCantidad -= product.quantity;
        numberProducts.innerHTML = orderCantidad;

        // Volver a calcular el precio
        calculate();
        
        // Verificar si el carrito está vacío
        if (listProductOrder.length === 0) {
          listOrder.innerHTML = "";
          listempty.style.display = "block";
          calculatePrice.style.display = "none";
        }

        // Volver a renderizar el carrito
        createCart();
      }
    });

    // Agregar el producto al contenedor del carrito
    listOrder.appendChild(cartItem);
  });
};

const order = () => {
  console.log("order");
};

fetch("./data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Error al cargar el JSON");
    return response.json();
  })
  .then((data) => {
    // Aquí ya tienes el objeto JSON
    data.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("my-4");
      productElement.innerHTML = `
        <img class="rounded-lg" src="${product.image.desktop}" alt="">
        <button class= "relative top-[-10px] flex px-4 py-1 bg-white rounded-lg gap-2 mx-auto">
          <img src="assets/images/icon-add-to-cart.svg" alt="">
          <p class="font-medium">Add to cart</p>
        </button>
        <div class="w-full">
          <p class="text-rose-300">${product.category}</p>
          <p class="font-semibold">${product.name}</p>
          <p class="text-orangestyle font-[700]">
            $${product.price}
          </p>
        </div>
      `;

      const button = productElement.querySelector("button");
      button.addEventListener("click", () => {
        const existingProduct = listProductOrder.find(
          (p) => p.name === product.name
        );
        if (!existingProduct) {
          listProductOrder.push({ ...product, quantity: 1 });
        } else {
          existingProduct.quantity += 1;
        }

        orderCantidad++;
        numberProducts.innerHTML = orderCantidad;

        if (orderCantidad === 0) {
          listOrder.innerHTML = "";
          listempty.innerHTML = `
          <img src="assets/images/illustration-empty-cart.svg" alt="">
          <p> Your added items will appear here </p>
          `;
        } else if (orderCantidad !== 0) {
          listempty.style.display = "none";
          calculatePrice.style.display = "block";
          calculate();
        }

        createCart();
      });
      listproducts.appendChild(productElement);
    });
  })
  .catch((error) => console.error("Error:", error));
