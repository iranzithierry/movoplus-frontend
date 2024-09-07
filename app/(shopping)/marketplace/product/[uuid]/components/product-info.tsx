import { Product } from '@/api_';
import { Star } from 'lucide-react';
import { cn, formatMoney } from '@/lib/utils';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => (
  <div className="font-display">
    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>
    <section aria-labelledby="information-heading" className="mt-2">
      <h3 id="information-heading" className="sr-only">
        Product information
      </h3>
      <p className="text-2xl text-gray-900">{formatMoney(product.price)}</p>
      <div className="mt-6">
        <h4 className="sr-only">Reviews</h4>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Star key={rating} className={cn((product.rating ?? 0 > rating) ? 'text-gray-900 fill-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0')} aria-hidden="true" />
            ))}
          </div>
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            {product.review_count ?? 0} reviews
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default ProductInfo;
