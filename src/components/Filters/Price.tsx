import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'
import { DEFAULT_CUSTOM_PRICE, PRICE_FILTERS } from '@/lib/filters'
import { cn } from '@/lib/utils'
import { ProductState } from '@/lib/validators/product-validator'

interface PriceProps {
  handlePriceChange: (
    value: ProductState['price']['range'],
    isCustom?: boolean
  ) => void
  filterPrice: ProductState['price']
  minPrice: number
  maxPrice: number
}

const Price = ({
  handlePriceChange,
  filterPrice,
  minPrice,
  maxPrice,
}: PriceProps) => {
  return (
    <AccordionItem value="price">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900">{PRICE_FILTERS.name}</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {PRICE_FILTERS.options.map((option, idx) => (
            <li key={option.label} className="flex items-center">
              <input
                type="radio"
                id={`price-${idx}`}
                onChange={() =>
                  handlePriceChange(
                    option.value as ProductState['price']['range']
                  )
                }
                checked={
                  !filterPrice.isCustom &&
                  filterPrice.range[0] === option.value[0] &&
                  filterPrice.range[1] === option.value[1]
                }
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
          <li className="flex justify-center flex-col gap-2">
            <div>
              <input
                type="radio"
                id={`price-${PRICE_FILTERS.options.length}`}
                onChange={() =>
                  handlePriceChange(
                    [0, 100] as ProductState['price']['range'],
                    true
                  )
                }
                checked={filterPrice.isCustom}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`color-${PRICE_FILTERS.options.length}`}
                className="ml-3 text-sm text-gray-600"
              >
                Custom
              </label>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Price</p>
              <div>
                {filterPrice.isCustom
                  ? minPrice.toFixed(0)
                  : filterPrice.range[0].toFixed(0)}
                $ -{' '}
                {filterPrice.isCustom
                  ? maxPrice.toFixed(0)
                  : filterPrice.range[1].toFixed(0)}
                ${' '}
              </div>
            </div>

            <Slider
              className={cn({
                'opcity-50': !filterPrice.isCustom,
              })}
              disabled={!filterPrice.isCustom}
              onValueChange={(range) => {
                const [newMin, newMax] = range
                handlePriceChange([newMin, newMax], true)
              }}
              value={
                filterPrice.isCustom ? filterPrice.range : DEFAULT_CUSTOM_PRICE
              }
              min={DEFAULT_CUSTOM_PRICE[0]}
              max={DEFAULT_CUSTOM_PRICE[1]}
              defaultValue={DEFAULT_CUSTOM_PRICE}
              step={5}
            />
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export default Price
