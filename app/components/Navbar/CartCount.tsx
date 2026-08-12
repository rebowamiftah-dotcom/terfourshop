import Link from 'next/link'
import { CartIcon } from '../Icon';

export default function CartCount() {
  const itemCount = 3;

  return (
    <Link href="/cart" className="relative p-1 text-white">
      <CartIcon className="h-6 w-6" />

      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
