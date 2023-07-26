// src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



const productList = [
  { id: 1, name: 'Produto 1', description: 'Descrição do Produto 1', price: 10 },
  { id: 2, name: 'Produto 2', description: 'Descrição do Produto 2', price: 15 },
  { id: 3, name: 'Produto 3', description: 'Descrição do Produto 3', price: 20 },
];

const ProductList = ({ addToCart }) => {
  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <p>{product.description}</p>
            <p>Preço: R${product.price}</p>
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Cart = ({ cartItems }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <p>Quantidade: {item.quantity}</p>
            <p>Preço: R${item.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      <p>Total da Compra: R${getTotalPrice()}</p>
    </div>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Recuperar os itens do carrinho do localStorage, se houver
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      // Se o produto já existe no carrinho, atualize a quantidade
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Caso contrário, adicione o produto ao carrinho com quantidade 1
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    // Salve os itens do carrinho no localStorage sempre que o carrinho for atualizado
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <ProductList addToCart={addToCart} />
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default App;
