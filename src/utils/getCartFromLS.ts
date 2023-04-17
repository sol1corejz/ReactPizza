import { CartItemType } from "../redux/slices/cartSlice";

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = items.reduce((sum: number, obj: CartItemType) => (sum += obj.price * obj.count), 0);
  return {
    totalPrice: totalPrice as number,
    items: items as CartItemType[]
  };
}