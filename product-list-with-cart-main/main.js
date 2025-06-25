const listproducts = document.getElementById("list-products");
const listOrder = document.querySelector(".right-content-order");

const listempty = document.querySelector("#list-empty");

const numberProducts = document.querySelector("#number-products");

const calculatePrice = document.querySelector("#calculatePrice");

const confirmOrder = document.querySelector("#confirm-order");

const modalConfirmation = document.querySelector("#order-confirmation");
const confirmOrderButton = document.querySelector(".order-confirmation__button");
const ordenListConfirmation = document.querySelector("#confirmed-list-products");

let orderCantidad = 0;
let orderTotal = 0;

let listProductOrder = [];

const calculate = () => {
  // Reinicia el total antes de calcular
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
  listOrder.innerHTML = "";
  // Crear elementos del carrito para cada producto
  listProductOrder.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add(
      "flex",
      "w-full",
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
          listempty.style.display = "flex";
          calculatePrice.style.display = "none";
        }

        // Restaurar botones en la lista de productos
        const itemInList = document.querySelectorAll(".item-cart");
        itemInList.forEach((item) => {
          const name = item.querySelector(".item-cart__name")?.textContent;
          if (name === product.name) {
            const buttonMain = item.querySelector(".item-cart__button-main");
            const quantityWrapper = item.querySelector(
              ".item-cart__button-quantity"
            );
            if (buttonMain && quantityWrapper) {
              buttonMain.style.display = "flex";
              quantityWrapper.style.display = "none";
            }
          }
        });

        // Eliminar borde de la imagen asociada
        const itemImage = document.querySelectorAll(".item-cart");
        itemImage.forEach((item) => {
          const name = item.querySelector(".item-cart__name")?.textContent;
          if (name === product.name) {
            const image = item.querySelector(".item-cart__image");
            image?.classList.remove("item-cart__image--selected");
          }
        });

        // Volver a renderizar el carrito
        createCart();
      }
    });

    // Agregar el producto al contenedor del carrito
    listOrder.appendChild(cartItem);
  });
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

      productElement.innerHTML = `
      <div class="item-cart">
        <div class="item-cart__image-container">
          <img class="item-cart__image" src="${product.image.desktop}" alt="">

          <div class="item-cart__button">
            <div class="item-cart__button-main">
              <img src="assets/images/icon-add-to-cart.svg" alt="">
              <p class="item-cart__button-text">Add to cart</p>
            </div>
            <div class="item-cart__button-quantity">
              <button class="item-cart__minus">-</button>
              <p class="item-cart__quantity">12</p>
              <button class="item-cart__plus">+</button>
            </div>
          </div>
        </div>

        <div class="item-cart__description">
          <p class="item-cart__category">${product.category}</p>
          <p class="item-cart__name">${product.name}</p>
          <p class="item-cart__price">$${product.price.toFixed(2)}</p>
        </div>
      </div>
      `;

      const buttonMain = productElement.querySelector(
        ".item-cart__button-main"
      );
      const quantityWrapper = productElement.querySelector(
        ".item-cart__button-quantity"
      );
      const quantityText = productElement.querySelector(".item-cart__quantity");
      const btnPlus = productElement.querySelector(".item-cart__plus");
      const btnMinus = productElement.querySelector(".item-cart__minus");
      const itenCartImageSelected =
        productElement.querySelector(".item-cart__image");

      let currentQuantity = 0;

      const updateQuantityDisplay = () => {
        quantityText.textContent = currentQuantity;
        if (currentQuantity <= 0) {
          quantityWrapper.style.display = "none";
          buttonMain.style.display = "flex";
        } else {
          quantityWrapper.style.display = "flex";
          buttonMain.style.display = "none";
        }
      };

      buttonMain?.addEventListener("click", () => {
        const existingProduct = listProductOrder.find(
          (p) => p.name === product.name
        );
        if (!existingProduct) {
          listProductOrder.push({ ...product, quantity: 1 });
          currentQuantity = 1;
        } else {
          existingProduct.quantity += 1;
          currentQuantity = existingProduct.quantity;
        }
        orderCantidad++;
        numberProducts.innerHTML = orderCantidad;
        updateQuantityDisplay();
        listempty.style.display = "none";
        calculatePrice.style.display = "block";
        itenCartImageSelected.classList.add("item-cart__image--selected");
        calculate();
        createCart();
      });

      btnPlus.addEventListener("click", () => {
        const existingProduct = listProductOrder.find(
          (p) => p.name === product.name
        );
        existingProduct.quantity++;
        currentQuantity = existingProduct.quantity;
        orderCantidad++;
        numberProducts.innerHTML = orderCantidad;
        updateQuantityDisplay();
        calculate();
        createCart();
      });

      btnMinus.addEventListener("click", () => {
        const existingProduct = listProductOrder.find(
          (p) => p.name === product.name
        );
        if (existingProduct && existingProduct.quantity > 1) {
          existingProduct.quantity--;
          currentQuantity = existingProduct.quantity;
        } else {
          const index = listProductOrder.findIndex(
            (p) => p.name === product.name
          );
          if (index !== -1) listProductOrder.splice(index, 1);
          currentQuantity = 0;
          // 🔽 Aquí debes quitar el borde también
          const itemImage = productElement.querySelector(".item-cart__image");
          itemImage?.classList.remove("item-cart__image--selected");
        }

        orderCantidad--;
        numberProducts.innerHTML = orderCantidad;
        updateQuantityDisplay();
        if (orderCantidad === 0) {
          calculatePrice.style.display = "none";
          listempty.style.display = "flex";
        }
        calculate();
        createCart();
      });

      listproducts.appendChild(productElement);
    });
  })
  .catch((error) => console.error("Error:", error));




confirmOrder.addEventListener("click", () => {
  document.body.classList.add('modal-open');

  // hacer el el view suba hasta el top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (listProductOrder.length > 0) {
    modalConfirmation.style.display = "flex";
    //console.log("Order details:", listProductOrder);

    listProductOrder.forEach((product) => {

      const ordenItem =document.createElement("div");
      ordenItem.classList.add("order-list");

      ordenItem.innerHTML = `
            <div class="order-list__image">
              <img src=${product.image.desktop} />
            </div>
            <div class="order-list__description">
              <p>${product.name}}</p>
              <p>x${product.quantity}</p>
              <p>$${product.price}</p>
            </div>
            <div class="order-list__subtotal">
              <p>${(product.price * product.quantity).toFixed(2)}</p>
            </div>
      `;
      const price = document.querySelector("#priceOrder");
      price.innerHTML = `$${orderTotal.toFixed(2)}`; // Asegúrate de mostrar con dos decimales
      ordenListConfirmation.appendChild(ordenItem);


    });

    
  }
});


confirmOrderButton.addEventListener("click", () => {
  // Ocultar el modal
  modalConfirmation.style.display = "none";
  document.body.classList.remove('modal-open');

  // Reiniciar datos
  listProductOrder = [];
  orderCantidad = 0;
  orderTotal = 0;

  // Limpiar visualización del carrito
  listOrder.innerHTML = "";
  numberProducts.textContent = "0";
  calculatePrice.style.display = "none";
  listempty.style.display = "flex";

  // Limpiar lista de orden confirmada
  ordenListConfirmation.innerHTML = "";

  // Restaurar los productos: mostrar botón principal y ocultar cantidad
  const allItems = document.querySelectorAll(".item-cart");
  allItems.forEach((item) => {
    const buttonMain = item.querySelector(".item-cart__button-main");
    const quantityWrapper = item.querySelector(".item-cart__button-quantity");
    const image = item.querySelector(".item-cart__image");

    if (buttonMain && quantityWrapper) {
      buttonMain.style.display = "flex";
      quantityWrapper.style.display = "none";
    }

    if (image) {
      image.classList.remove("item-cart__image--selected");
    }
  });
});


