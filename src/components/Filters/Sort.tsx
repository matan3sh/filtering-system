import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SORT_OPTIONS } from '@/lib/filters'
import { cn } from '@/lib/utils'
import { ChevronDown, Filter } from 'lucide-react'

interface SortProps {
  sort: string
  handleSortChange: (value: string) => void
}

const Sort = ({ sort, handleSortChange }: SortProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Sort
          <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.name}
              className={cn('text-left w-full block px-4 py-2 text-sm', {
                'text-gray-900 bg-gray-100': option.value === sort,
                'text-gray-500': option.value !== sort,
              })}
              onClick={() => handleSortChange(option.value)}
            >
              {option.name}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
        <Filter className="h-5 w-5" />
      </button>
    </>
  )
}

export default Sort
