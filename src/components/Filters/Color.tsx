import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ApplyArrayFilter, COLOR_FILTERS } from '@/lib/filters'

interface ColorProps {
  applyArrayFilter: (args: ApplyArrayFilter) => void
  filterColor: string[]
}

const Color = ({ applyArrayFilter, filterColor }: ColorProps) => {
  return (
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
                checked={filterColor.includes(option.value)}
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

export default Color
