```javascript
import { fetchProducts } from "./api.js";

const state = {
  products: [],
  filteredProducts: [],
  category: "all",
  search: "",
  sort: "default"
};

const cachedProducts = localStorage.getItem("productsCache");

function showLoading() {
  document.getElementById("app").innerHTML = `
    <div class="loading-skeleton" aria-live="polite">
      Loading products...
    </div>
  `;
}

function showError(message) {
  document.getElementById("app").innerHTML = `
    <div class="error-banner" role="alert">
      ${message}
    </div>
  `;
}

function renderProducts(products) {
  const container = document.getElementById("app");

  if (!products.length) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  container.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <p>Price: $${product.price}</p>
          <button type="button" data-id="${product.id}">
            Add to Cart
          </button>
        </article>
      `
    )
    .join("");
}

function applyFilters() {
  let products = [...state.products];

  if (state.category !== "all") {
    products = products.filter(
      (product) => product.category === state.category
    );
  }

  if (state.search) {
    const keyword = state.search.toLowerCase();

    products = products.filter((product) =>
      product.title.toLowerCase().includes(keyword)
    );
  }

  if (state.sort === "price-low") {
    products.sort((a, b) => a.price - b.price);
  }

  if (state.sort === "price-high") {
    products.sort((a, b) => b.price - a.price);
  }

  state.filteredProducts = products;
  renderProducts(products);
}

function saveCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!cart.includes(productId)) {
    cart.push(productId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function setupControls() {
  const search = document.getElementById("search");
  const category = document.getElementById("category");
  const sort = document.getElementById("sort");

  if (search) {
    search.addEventListener("input", (event) => {
      state.search = event.target.value;
      applyFilters();
    });
  }

  if (category) {
    category.addEventListener("change", (event) => {
      state.category = event.target.value;
      applyFilters();
    });
  }

  if (sort) {
    sort.addEventListener("change", (event) => {
      state.sort = event.target.value;
      applyFilters();
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-id]")) {
      const id = Number(event.target.dataset.id);
      saveCart(id);
      event.target.textContent = "Added ✓";
    }
  });
}

async function init() {
  showLoading();

  try {
    if (cachedProducts) {
      state.products = JSON.parse(cachedProducts);
    } else {
      state.products = await fetchProducts();
      localStorage.setItem(
        "productsCache",
        JSON.stringify(state.products)
      );
    }

    setupControls();
    applyFilters();
  } catch (error) {
    console.error(error);
    showError(
      "Sorry, we couldn't load the data. Please refresh the page and try again."
    );
  }
}

init();
```

