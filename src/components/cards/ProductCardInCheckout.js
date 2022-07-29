import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch, useSelector } from "react-redux";
import { userDummyCart } from "../../functions/user";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import _ from "lodash";

const ProductCardInCheckout = ({ p }) => {
  let dispatch = useDispatch();

  const { user } = useSelector((state) => ({...state}))

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product.product == p.product) {
          cart[i].count = count;
        }
      });

      let unique = _.uniqWith(cart, _.isEqual);

      let cartTotal = 0;
      for (let i = 0; i < cart.length; i++) {
        cartTotal = cartTotal + unique[i].price * unique[i].count;
      }

      localStorage.setItem("cart", JSON.stringify(unique));
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      if(user && user.token){
        dispatch({
          type: "DUMMY_ADD_TO_CART",
          payload: {
            products: unique,
            cartTotal: cartTotal,
            orderdBy: user._id
          }
        })
  
        let _id = user._id;
  
        userDummyCart({unique, cartTotal, _id}, user.token).then((res) => {
          console.log(res)
        })
      }else{
        dispatch({
          type: "DUMMY_ADD_TO_CART",
          payload: {
            products: unique,
            cartTotal: cartTotal,
          }
        })
      }

    }
  };

  const handleRemove = () => {
    console.log(p.product, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product.product === p.product) {
          cart.splice(i, 1);
        }
      });

      let unique = _.uniqWith(cart, _.isEqual);

      let cartTotal = 0;
      for (let i = 0; i < unique.length; i++) {
        cartTotal = cartTotal + unique[i].price * unique[i].count;
      }

      localStorage.setItem("cart", JSON.stringify(unique));
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      
      if(user && user.token){
        dispatch({
          type: "DUMMY_ADD_TO_CART",
          payload: {
            products: unique,
            cartTotal: cartTotal,
            orderdBy: user._id
          }
        })
        
        let _id = user._id;
  
        userDummyCart({unique, cartTotal, _id}, user.token).then((res) => {
          console.log(res)
        })
      }else{
        dispatch({
          type: "DUMMY_ADD_TO_CART",
          payload: {
            products: unique,
            cartTotal: cartTotal,
          }
        })
      }
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {(p.images !== undefined )? ((p.images.length) ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />) : <ModalImage small={laptop} large={laptop} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
