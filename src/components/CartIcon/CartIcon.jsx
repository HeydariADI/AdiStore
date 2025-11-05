// برای سبد خرید
import { ShoppingBagIcon } from '@heroicons/react/24/outline'; 

function Cart({ itemCount }) {
  return (
    <button aria-label="سبد خرید">
      <ShoppingBagIcon className="h-6 w-6" /> 
      {/* می‌توانید تعداد آیتم‌ها را نمایش دهید */}
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{itemCount}</span>
    </button>
  );
}

export default Cart;