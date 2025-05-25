
import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterDropdownProps {
  title: string;
  options: (string | number)[];
  selected: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
}

const FilterDropdown = ({ title, options, selected, onChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (option: string | number) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          {title}
          {selected.length > 0 && (
            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
              {selected.length}
            </Badge>
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-4 bg-white" align="end">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">Filter by {title}</span>
          {selected.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="h-6 px-2">
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${title}-${option}`}
                checked={selected.includes(option)}
                onCheckedChange={() => handleToggle(option)}
              />
              <label
                htmlFor={`${title}-${option}`}
                className="text-sm cursor-pointer flex-1"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
