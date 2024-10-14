import MainLayout from '@/components/MainLayout.tsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Heart, MapIcon, MapPin, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { DatePickerWithRange } from '@/components/DateRangePicker.tsx';

function PropertyPage() {
  return (
    <MainLayout>
      {/* Search box */}
      <div className="bg-primary-foreground shadow-lg rounded-[20px] h-auto flex flex-wrap justify-between p-1 gap-2">
        {/* Search Fields */}
        <div className="flex flex-row items-center gap-4">
          {/* Location */}
          <div className="flex items-center rounded-[20px] border-input border-[1px] py-2 px-3 min-h-full gap-3">
            <MapPin className="size-6 text-primary" />
            <Input type="text" placeholder="Galway, Ireland"
                   className="bg-inherit rounded-lg border-none focus-visible:ring-0 p-0" />
            <X className="size-6 text-muted-foreground hover:cursor-pointer" />
          </div>

          {/* Date */}
          <div className="flex items-center rounded-[20px] border-input border-[1px] py-2 px-3">
            <DatePickerWithRange />
          </div>

          {/* Guest count */}
          <div className="flex items-center rounded-[20px] border-input border-[1px] py-2 px-3 min-h-full gap-3">
            <Users className="size-6 text-primary" />
            <Input type="number" min={1} defaultValue={2}
                   className="bg-inherit rounded-lg border-none focus-visible:ring-0 p-0" />
            <X className="size-6 text-muted-foreground hover:cursor-pointer" />
          </div>
        </div>

        {/* Search Button */}
        <button
          className="bg-primary text-primary-foreground font-medium text-2xl px-4 py-2 rounded-[20px] min-h-full flex justify-center items-center w-44">
          Search
        </button>
      </div>
      <SectionLinks />
      <div className="flex align-bottom justify-between">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Hyatt Place NYC Chelsea
          </h1>
          <h3 className="scroll-m-20 text-2xl font-semibold text-gray-400 " style={{ marginTop: 10 }}>
            140 West 24th Street, Chelsea, New York, NY 10011, USA
          </h3>
        </div>
        <div className="flex items-end gap-4">
          <Button size="icon" variant="ghost"><Heart className="text-primary" size={35} /></Button>
          <Button size="lg" className="">Book</Button>
        </div>
      </div>
      {/* Star Rating*/}
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-6xl text-yellow-400">{String.fromCodePoint(0x02605)}</span>
      ))}
      {/* Find on map btn */}
      <Link to="#" className="w-full flex justify-end text-primary gap-1">
        <span className="font-bold underline">Find on map</span>
        <MapIcon />
      </Link>

      {/*  Photo Grid */}
      <div className="w-full flex gap-2 h-96" style={{ marginTop: 5 }}>
        <div className="bg-amber-500 rounded-3xl shadow-lg w-full h-full flex-1"></div>
        <div className="flex-1 gap-2 flex-col flex">
          <div className="bg-emerald-500 rounded-3xl shadow-lg w-full basis-1/2"></div>
          <div className="flex gap-2 w-full basis-1/2">
            <div className="bg-emerald-500 rounded-3xl shadow-lg h-full basis-1/2"></div>
            <div className="bg-emerald-500 rounded-3xl shadow-lg h-full basis-1/2"></div>
          </div>
        </div>
      </div>
      <div className="w-full text-right" style={{ marginTop: 5 }}>
        <Button variant="ghost">All 34 photos<ArrowRight /></Button>
      </div>
    </MainLayout>
  );
}

export default PropertyPage;


const sectionNames = [
  'Overview', 'Information', 'Facilities', 'Conditions', 'Reviews',
];

const SectionLinks = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(0);

  return (
    <nav className="w-full flex items-center justify-between">
      {sectionNames.map((sectionName, idx) =>
        <div key={idx}>
          <Button variant="ghost" onClick={() => setActiveLinkIdx(idx)}
                className={`text-gray-400 font-bold ${activeLinkIdx === idx ? 'text-black' : ''}`}>
            {sectionName}
          </Button>
          {/* That blue line under the active section button */}
          {activeLinkIdx === idx && <div className="h-1 w-full bg-primary rounded"></div>}
        </div>,
      )}
    </nav>
  );
};
