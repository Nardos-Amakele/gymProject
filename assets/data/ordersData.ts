// assets/data/ordersData.ts

export interface Order {
    name: string;
    phone: string;
    item: string;
    quantity: number;
    status: string;
  }
  
  export interface OrderStats {
    totalSales: number;
    totalOrders: number;
    delivered: number;
    pending: number;
  }
  
  export const ordersData = {
    stats: {
      totalSales: 4000,
      totalOrders: 44,
      delivered: 26,
      pending: 16,
    },
    orders: [
      { name: "Saron Mengistu", phone: "0934527587", item: "Gym bag", quantity: 1, status: "Delivered" },
      { name: "Tewodros Abebe", phone: "0987654321", item: "Strap", quantity: 1, status: "Pending" },
      { name: "Kebede Desta", phone: "0989009876", item: "Water bottle", quantity: 2, status: "Pending" },
      { name: "Sahle Selassie", phone: "0990898989", item: "Shorts", quantity: 4, status: "Delivered" },
      { name: "Betelhem Alemu", phone: "0911213344", item: "Shirt", quantity: 3, status: "Pending" },
    ],
  };
  