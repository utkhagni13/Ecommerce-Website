import React from "react";
import { Link } from "react-router-dom";

const Items = ({ itemList, setItemList }) => {
  const deleteItem = async (itemId) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: itemId,
      }),
    };
    const result = await (await fetch("/deleteItem", requestOptions)).json();
    if (result.response) {
      itemList = itemList.filter((itemElement) => itemElement._id !== itemId);
      setItemList(itemList);
    } else {
      alert("Could not delete Item");
    }
  };
  return (
    <div className="adminPanel">
      <h1>Items</h1>
      <Link to="/admin/addItem" className="text-white">
        <button className="btn btn-primary addItemButton">+ Add an Item</button>
      </Link>
      <table>
        <tbody>
          <tr>
            <th>Item Name</th>
            <th>Item ID</th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
        {itemList.map((item, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>
                  <h3>{item.itemName}</h3>
                </td>
                <td>
                  <h5 className="m-2"> {item._id}</h5>
                </td>
                <td>
                  <Link
                    to={`/admin/editItem/${item._id}`}
                    className="text-white"
                  >
                    <button className="btn btn-primary float-right mr-3 shadow">
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger float-right shadow"
                    onClick={() => {
                      deleteItem(item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Items;
