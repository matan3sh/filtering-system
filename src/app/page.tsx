'use client'

import Sort from '@/components/Filters/Sort'
import SubCategories from '@/components/Filters/SubCategories'
import ProductList from '@/components/Products/ProductList'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Product as ProductType } from '@/db'
import { COLOR_FILTERS, DEFAULT_CUSTOM_PRICE } from '@/lib/filters'
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

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, 'price' | 'sort'>
    value: string
  }) => {
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
              {/* Color filter */}
              <AccordionItem value="color">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Color</span>
                </AccordionTrigger>

                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {COLOR_FILTERS.options.map((option, idx) => (
                      <li key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`color-${idx}`}
                          onChange={() =>
                            applyArrayFilter({
                              category: 'color',
                              value: option.value,
                            })
                          }
                          checked={filter.color.includes(option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`color-${idx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Product grid */}
          <ProductList products={products} />
        </div>
      </section>
    </main>
  )
}
