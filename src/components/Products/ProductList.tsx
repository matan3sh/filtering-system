import Product from '@/components/Products/Product'
import ProductSkeleton from '@/components/Products/ProductSkeleton'
import { Product as ProductType } from '@/db'
import { QueryResult } from '@upstash/vector'

interface ProductListProps {
  products: QueryResult<ProductType>[] | undefined
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products
        ? products?.map((product) => (
            <Product key={product.id} product={product.metadata!} />
          ))
        : new Array(12).fill(null).map((_, i) => <ProductSkeleton key={i} />)}
    </ul>
  )
}

export default ProductList
