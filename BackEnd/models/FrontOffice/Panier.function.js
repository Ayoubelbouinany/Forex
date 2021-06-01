const PanierModel = require('./Panier.module')

class  Panier {
  constructor(oldPanier) {
    this.items = oldPanier.items || {};
    this.totalQty = oldPanier.totalQty || 0;
    this.totalPrice = oldPanier.totalPrice || 0;
    this.user = oldPanier.user || "";
  }

  add(produit, idProduit) {
    let storedItem = this.items[idProduit];
    if (!storedItem) {
      storedItem = this.items[idProduit] = { produit: produit, qty: 0, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = parseFloat((storedItem.produit.price * storedItem.qty).toFixed(2));
    this.items[idProduit]=storedItem
    this.totalQty++;
    this.totalPrice += storedItem.produit.price;
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
    return this
  }

  generateModel(){
    let newPanier = new PanierModel({
      items: this.items,
      totalQty: this.totalQty,
      totalPrice: this.totalPrice,
      user: this.user
    })
    return newPanier
  }

  decreaseQty(idProduit) {
    this.items[idProduit].qty--;
    this.items[idProduit].price -= this.items[idProduit].produit.price;
    this.items[idProduit].price = parseFloat(this.items[idProduit].price.toFixed(2))
    this.totalQty--;
    this.totalPrice -= this.items[idProduit].produit.price
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
    if (this.items[idProduit].qty <= 0) {
      delete this.items[idProduit];
    }
    return this
  }

  increaseQty(idProduit) {
    this.items[idProduit].qty++;
    this.items[idProduit].price += this.items[idProduit].produit.price;
    this.items[idProduit].price = parseFloat(this.items[idProduit].price.toFixed(2))
    this.totalQty++;
    this.totalPrice += this.items[idProduit].produit.price
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
    return this
  }

  generateArray() {
    let arr = [];
    for (let id in this.items) {
      arr.push(this.items[id])
    }
    return arr;
  }
}

module.exports = Panier