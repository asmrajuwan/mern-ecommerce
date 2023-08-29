import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="flex flex-row">
        <div className="w-1/4">
          <AdminMenu />
        </div>
        <div className="w-3/4 p-4">
          <h1 className="text-center text-3xl font-semibold mb-4">All Orders</h1>
          {orders?.map((o, i) => (
            <div className="border shadow rounded-lg p-4 mb-4" key={o._id}>
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="py-2">#</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Buyer</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Payment</th>
                    <th className="py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-left">
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">
                      <Select
                        options={status.map((s) => ({
                          value: s,
                          label: s,
                        }))}
                        onChange={(selectedOption) =>
                          handleChange(o._id, selectedOption.value)
                        }
                        defaultValue={{ value: o?.status, label: o?.status }}
                        className="w-32"
                      />
                    </td>
                    <td className="py-2">{o?.buyer?.name}</td>
                    <td className="py-2">{moment(o?.createAt).fromNow()}</td>
                    <td className="py-2">{o?.payment.success ? "Success" : "Failed"}</td>
                    <td className="py-2">{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4">
                {o?.products?.map((p, index) => (
                  <div className="flex items-center p-4 border rounded-lg mb-2" key={p._id}>
                    <div className="w-1/4">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="w-full h-auto"
                        alt={p.name}
                      />
                    </div>
                    <div className="w-3/4 pl-4">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm mb-1">{p.description.substring(0, 30)}</p>
                      <p className="font-semibold">Price: {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
