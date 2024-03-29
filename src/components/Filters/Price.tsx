import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PRICE_FILTERS } from '@/lib/filters'
import { ProductState } from '@/lib/validators/product-validator'

interface PriceProps {
  handlePriceChange: (value: ProductState['price']['range']) => void
  filterPrice: ProductState['price']
}

const Price = ({ handlePriceChange, filterPrice }: PriceProps) => {
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
                type="checkbox"
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
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export default Price
