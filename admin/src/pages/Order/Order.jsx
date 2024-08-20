import React, { useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";




const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
      console.log("Response.data", response.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async(event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })

    if(response.data.success){
  await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Page commande</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div className="order-item-food">
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone + ","}</p>
              <p className="order-item-email">{order.address.email + ","}</p>
              {/* <p className="order-item-email">{order.date}</p> */}
             
            </div>
            <p>Articles : {order.items.length}</p>
            <p>{order.amount} Dh</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Preparation de commande">
                Preparation de commande
              </option>
              <option value="En cours pour la livraison">
                En cours pour la livraison
              </option>
              <option value="Livré">Livré</option>
              <option value="Annulé">Annulé</option>
              <option value="Hors Stock">Hors Stock</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
