```javascript
const API_URL = "https://fakestoreapi.com/products";

async function fetchProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to fetch products.");
  }

  return await response.json();
}

export { fetchProducts };
```
