import Image from '@/assets/property_view.png';
import { Star } from 'lucide-react';
import { CardFooter } from './ui/card';

function LastTripCard() {
  return (
    <div className="flex flex-row gap-2 bg-primary-foreground rounded-[25px] shadow-lg p-1">
      {/* Image */}
      <img src={Image} alt="Property View" className="rounded-[20px] w-full h-auto flex-1" />
      <div className="flex flex-col gap-1">
        {/* Location */}
        <p className="text-xs font-semibold text-muted-foreground/50 pt-2">New York, USA</p>
        {/* Title */}
        <h1 className="text-lg text-secondary-foreground font-bold leading-6">Pod Times Square</h1>
        {/* Rating */}
        <div className="flex items-center py-2">
          <Star className="size-6 text-yellow-300 fill-yellow-300" />
          <Star className="size-6 text-yellow-300 fill-yellow-300" />
          <Star className="size-6 text-yellow-300 fill-yellow-300" />
        </div>
        {/* Date */}
        <CardFooter className="p-0 pt-1">
          <p className="text-sm text-muted-foreground/50 font-medium">12 Aug - 15 Aug</p>
        </CardFooter>
      </div>
    </div>
  );
}

export default LastTripCard;
