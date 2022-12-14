class Product {
  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
    this.description = desc;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookID) {
    this.hookID = renderHookID;
  }

  createRootElement(tag, cssClass, attribute) {
    const rootElement = document.createElement(tag);
    if (cssClass) {
      rootElement.className = cssClass;
    }
    if (attribute && attribute.length > 0) {
      for (const attr of attribute) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookID).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  constructor(renderHookID) {
    super(renderHookID);
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, curItem) => {
      return prevValue + curItem.price;
    }, 0);
    return sum;
  }

  addToCart(product) {
    this.items.push(product);
    this.totalCartPrice.innerHTML = `<h2>Total:\$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  displayCart() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>Total:\$${0}</h2>
        <button>Continue to cart</button>
`;
    this.totalCartPrice = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookID) {
    super(renderHookID);
    this.product = product; // there is a parameter of type product and property of type product
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  renderListItems() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
        <div>
            <img src="${this.product.imageUrl} alt="${this.product.title}" >
            <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>&dollar;${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to Cart</button>
            </div>
        </div>
        `;

    const addCartBtn = prodEl.querySelector("button");
    addCartBtn.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [
    new Product(
      "Fresh Kisses",
      "https://images.unsplash.com/photo-1604544203292-0daa7f847478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZyUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      19.99,
      "Mint flavoured double brush."
    ),
    new Product(
      "Cat Basket",
      "https://images.unsplash.com/photo-1486530555807-11f29d0dff36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      23.25,
      "Cat basket with soft touch base."
    ),
    new Product(
      "Assorted Grains for Birds",
      "https://images.unsplash.com/photo-1543308485-b743d7f6dd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
      9.99,
      "Assorted grains for birds."
    ),
    new Product(
      "Dog Toy",
      "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      5.39,
      "Kong bone dog toy."
    ),
  ];

  constructor(renderHookID) {
    super(renderHookID);
  }

  render() {
    const prodList = this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    for (const prod of this.products) {
      const productItem = new ProductItem(prod, "prod-list");
      productItem.renderListItems();
    }
  }
}

class Shop {
  displayShop() {
    this.cart = new ShoppingCart("app");
    this.cart.displayCart();
    const productList = new ProductList("app");
    productList.render();
  }
}

class App {
  static init() {
    const ShopOne = new Shop();
    ShopOne.displayShop();
    this.cart = ShopOne.cart;
  }

  static addProductToCart(product) {
    this.cart.addToCart(product);
  }
}

App.init();
