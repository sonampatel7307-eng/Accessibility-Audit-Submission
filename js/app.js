const API_URL = "https://fakestoreapi.com/products";

const state = {
  products: [],
  category: "all",
  search: "",
  sort: "default"
};

const app = document.getElementById("app");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

function showLoading() {
  app.innerHTML = "<p>Loading products...</p>";
}

function showError() {
  app.innerHTML = `
    <div class="error-banner" role="alert">
      Unable to load products. Please refresh the page and try again.
    </div>
  `;
}

function renderProducts(products) {
  if (!products.length) {
    app.innerHTML = "<p>No products found.</p>";
    return;
  }

  app.innerHTML = products.map(product => `
    <article class="product-card">
      <h3>${product.title}</h3>

      <p>Category: ${product.category}</p>

      <p>Price: $${product.price}</p>

      <button
        type="button"
        data-id="${product.id}"
        style="
          display: inline-block;
          visibility: visible;
          opacity: 1;
          background: #2563eb;
          color: #ffffff;
          padding: 10px 16px;
          margin-top: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
        ">
        Add to Cart
      </button>
    </article>
  `).join("");
}

function applyFilters() {
  let products = [...state.products];

  if (state.category !== "all") {
    products = products.filter(
      product => product.category === state.category
    );
  }

  if (state.search.trim()) {
    const term = state.search.toLowerCase();

    products = products.filter(product =>
      product.title.toLowerCase().includes(term)
    );
  }

  if (state.sort === "price-low") {
    products.sort((a, b) => a.price - b.price);
  }

  if (state.sort === "price-high") {
    products.sort((a, b) => b.price - a.price);
  }

  renderProducts(products);
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!cart.includes(id)) {
    cart.push(id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

async function loadProducts() {
  showLoading();

  try {
    const cached = localStorage.getItem("productsCache");

    if (cached) {
      state.products = JSON.parse(cached);
    } else {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      state.products = await response.json();

      localStorage.setItem(
        "productsCache",
        JSON.stringify(state.products)
      );
    }

    applyFilters();
  } catch (error) {
    console.error(error);
    showError();
  }
}

searchInput.addEventListener("input", event => {
  state.search = event.target.value;
  applyFilters();
});

categorySelect.addEventListener("change", event => {
  state.category = event.target.value;
  applyFilters();
});

sortSelect.addEventListener("change", event => {
  state.sort = event.target.value;
  applyFilters();
});

app.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");

  if (!button) return;

  addToCart(Number(button.dataset.id));

  button.textContent = "Added ✓";
});

loadProducts();
