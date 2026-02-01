// pages/api/orders.js

export default async function handler(req, res) {
  const allOrders = [
    { id: 1, status: "ordered", product: "Laptop" },
    { id: 2, status: "delivered", product: "Mouse" },
    { id: 3, status: "cancel", product: "Keyboard" },
    { id: 4, status: "ordered", product: "Monitor" },
  ];

  const { status: requestedStatus } = req.query;

  let filteredOrders = allOrders;

  if (requestedStatus) {
    filteredOrders = allOrders.filter(
      (order) => order.status === requestedStatus
    );
  }

  res.status(200).json(filteredOrders);
}
