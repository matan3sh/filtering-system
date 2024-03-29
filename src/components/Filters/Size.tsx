import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ApplyArrayFilter, SIZE_FILTERS } from '@/lib/filters'

interface SizeProps {
  applyArrayFilter: (args: ApplyArrayFilter) => void
  filterSize: string[]
}

const Size = ({ applyArrayFilter, filterSize }: SizeProps) => {
  return (
    <AccordionItem value="size">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900">{SIZE_FILTERS.name}</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {SIZE_FILTERS.options.map((option, idx) => (
            <li key={option.value} className="flex items-center">
              <input
                type="checkbox"
                id={`color-${idx}`}
                onChange={() =>
                  applyArrayFilter({
                    category: 'size',
                    value: option.value,
                  })
                }
                checked={filterSize.includes(option.value)}
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

export default Size
