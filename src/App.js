import React, { useEffect,useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    if ( cart.find( cartItem => cartItem.id === item.id ) )
        return;

    const newCart= [ ...cart, item ]; 
    setCart( newCart );
    localStorage.setItem( "cart", JSON.stringify( newCart ) );
  };
  const removeItem = (id) => {setCart( cart.filter( cartItem  => cartItem.id !== id) );
    const newCart = cart.filter( cartItem  => cartItem.id !== id)
    setCart( newCart );
    localStorage.setItem( "cart", JSON.stringify( newCart ) );
  };
  useEffect( () => {

    const cartFromLS = JSON.parse( localStorage.getItem("cart") );
    if ( cartFromLS ) {
        setCart( cartFromLS );
    }

  }, [])
  return (
    <div className="App">

<ProductContext.Provider value={ { products, cart, addItem, removeItem } }>
      <Navigation />

      {/* Routelar */}
      <main className="content">
        <Route exact path="/">
          <Products/>
        </Route>
        <Route path="/cart">
                <ShoppingCart />
              </Route>
      </main>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
