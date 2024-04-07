'use client'

import Color from '@/components/Filters/Color'
import Price from '@/components/Filters/Price'
import Size from '@/components/Filters/Size'
import Sort from '@/components/Filters/Sort'
import SubCategories from '@/components/Filters/SubCategories'
import ProductList from '@/components/Products/ProductList'
import { Accordion } from '@/components/ui/accordion'
import type { Product as ProductType } from '@/db'
import { ApplyArrayFilter, DEFAULT_CUSTOM_PRICE } from '@/lib/filters'
import { ProductState } from '@/lib/validators/product-validator'
import { useQuery } from '@tanstack/react-query'
import { QueryResult } from '@upstash/vector'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [filter, setFilter] = useState<ProductState>({
    sort: 'none',
    color: ['beige', 'blue', 'green', 'purple', 'white'],
    size: ['S', 'M', 'L'],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
  })

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.post<QueryResult<ProductType>[]>(
        'http://localhost:3000/api/products',
        { filter: { sort: filter.sort } }
      )
      return data
    },
  })

  const handleSortChange = (value: ProductState['sort']) => {
    setFilter((prev) => ({ ...prev, sort: value }))
  }

  const handlePriceChange = (
    value: ProductState['price']['range'],
    isCustom: boolean = false
  ) => {
    setFilter((prev) => ({
      ...prev,
      price: { isCustom, range: [...value] },
    }))
  }

  const applyArrayFilter = ({ category, value }: ApplyArrayFilter) => {
    const isFilterApplied = filter[category].includes(value as never)

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }))
    } else {
      setFilter((prev) => ({ ...prev, [category]: [...prev[category], value] }))
    }
  }

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1])
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1])

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          High-quality cotton selection
        </h1>

        <div className="flex items-center">
          <Sort sort={filter.sort} handleSortChange={handleSortChange} />
        </div>
      </div>

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="hidden lg:block">
            <SubCategories />
            <Accordion type="multiple" className="animate-none">
              <Color
                applyArrayFilter={applyArrayFilter}
                filterColor={filter.color}
              />
            </Accordion>
            <Accordion type="multiple" className="animate-none">
              <Size
                applyArrayFilter={applyArrayFilter}
                filterSize={filter.size}
              />
            </Accordion>
            <Accordion type="multiple" className="animate-none">
              <Price
                handlePriceChange={handlePriceChange}
                filterPrice={filter.price}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </Accordion>
          </div>

          {/* Product grid */}
          <ProductList products={products} />
        </div>
      </section>
    </main>
  )
}
