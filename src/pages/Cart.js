import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user, dummy } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    // return cart.reduce((currentValue, nextValue) => {
    //   return currentValue + nextValue.count * nextValue.price;
    // }, 0);
    let cartTotal = 0;
    if(dummy.products !== undefined){
      for (let i = 0; i < dummy.products.length; i++) {
        cartTotal = cartTotal + dummy.products[i].price * dummy.products[i].count;
      }
    }
    const data = localStorage.getItem("cart")
    console.log(data)
    return cartTotal;
  };

  const saveOrderToDb = () => {
    console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Author</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      
      
      {dummy.products.map((d) => (
        <ProductCardInCheckout key={d.product} p={d} />
      ))}      
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {(dummy.products !== undefined) ? dummy.products.length : 0} Product</h4>

          {(dummy.products !== undefined) ? ((dummy.products.length) ?
            showCartItems() : <p>No products in cart. <Link to="/shop">Continue Shopping.</Link></p>
          ) : (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {(dummy.products !== undefined) ? (dummy.products.map((d, i) => (
            <div key={i}>
              <p>
                {d.title} x {d.count} = ${d.price * d.count}
              </p>
            </div>
          ))) : null}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!getTotal()}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Cart;
