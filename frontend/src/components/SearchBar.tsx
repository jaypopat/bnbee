import { MapPin, Users, X } from 'lucide-react';
import { DatePickerWithRange } from './DateRangePicker';
import { Input } from './ui/input';

function SearchBar() {
  return (
    <div>
      {/* Property Search */}
      <div className="bg-primary-foreground shadow-lg rounded-[20px] h-auto flex flex-wrap justify-between p-1 gap-2">
        {/* Search Fields */}
        <div className="flex flex-row items-center gap-4">
          {/* Location */}
          <div className="flex items-center rounded-[20px] border-input border-[1px] py-2 px-3 min-h-full gap-3">
            <MapPin className="size-6 text-primary" />
            <Input type="text" placeholder="Galway, Ireland" className="bg-inherit rounded-lg border-none focus-visible:ring-0 p-0" />
            <X className="size-6 text-muted-foreground hover:cursor-pointer" />
          </div>

          {/* Date */}
          <div className="flex items-center rounded-[20px] border-input border-[1px] py-2 px-3">
            <DatePickerWithRange />
          </div>

          {/* Guest count */}
          <div className="flex items-center rounded-[20px] border-input border-[1px] py-2 px-3 min-h-full gap-3">
            <Users className="size-6 text-primary" />
            <Input type="number" min={1} defaultValue={2} className="bg-inherit rounded-lg border-none focus-visible:ring-0 p-0" />
            <X className="size-6 text-muted-foreground hover:cursor-pointer" />
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-primary text-primary-foreground font-medium text-2xl px-4 py-2 rounded-[20px] min-h-full flex justify-center items-center w-44">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
