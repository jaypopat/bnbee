import MainLayout from '@/components/MainLayout.tsx';
import { Accordion } from '@radix-ui/react-accordion';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx';
import { Check, ChevronRight, DollarSign, Settings2 } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { ReactNode, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { getAllProperties } from '@/api/property.ts';
import { Property } from '@/types';

const searchFacilities = [
  {
    name: 'Ensuite',
    count: 503,
  },
  {
    name: 'Air conditioner',
    count: 378,
  },
  {
    name: 'Balcony',
    count: 79,
  },
  {
    name: 'Kitchen',
    count: 201,
  },
  {
    name: 'Jacuzzi',
    count: 102,
  },
];

export default function SearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchData = () => {
    getAllProperties().then(response => {
      setProperties(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="flex gap-6">
        {/*  Filters section*/}
        <div className="basis-1/4">
          <div className="rounded-3xl shadow-md w-full pb-2">
            <div className="flex items-center gap-4 p-4 shadow-md rounded-3xl">
              <Settings2 />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Filters</h4>
            </div>
            <div className="m-2">
              <div className="text-lg font-semibold">Your budget per night</div>
              <div className="text-sm text-gray-400 mb-1">Between:</div>
              <div className="flex gap-2 items-center">
                <div className="flex items-center">
                  <DollarSign className="text-sm text-gray-400" />
                  <Input className="bg-transparent h-8 pl-1" placeholder="200.00" />
                </div>
                <span className="text-gray-400">and</span>
                <div className="flex items-center">
                  <DollarSign className="text-sm text-gray-400" />
                  <Input className="bg-transparent h-8 pl-1" placeholder="600.00" />
                </div>
              </div>
            </div>
          </div>

          <FilterAccordion headerText={'Review Score'} open={true}>
            <div className="flex gap-2 items-center">
              <div className="text-sm text-gray-400 mb-1">Between:</div>
              <Input className="bg-transparent h-8" placeholder="0" />
              <span className="text-gray-400">and</span>
              <Input className="bg-transparent h-8" placeholder="10" />
            </div>
          </FilterAccordion>
          <FilterAccordion headerText={'Star Rating'} open={true}>
            <div className="flex flex-col gap-1">
              {[1, 2, 3, 4, 5].map(num => (
                <div className="flex justify-between" key={num}>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="border-gray-400" id={num + 'star rating'} />
                    <label
                      htmlFor={num + 'star rating'}
                      className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {num} star rating
                    </label>
                  </div>
                  <span className="text-sm text-gray-400">{num * 24}</span>
                </div>
              ))}
            </div>
          </FilterAccordion>
          <FilterAccordion headerText="Facilities">
            <div className="flex flex-col gap-1">
              {searchFacilities.map(facility => (
                <div className="flex justify-between" key={facility.name}>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="border-gray-400" id={facility.name} />
                    <label
                      htmlFor={facility.name}
                      className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {facility.name}
                    </label>
                  </div>
                  <span className="text-sm text-gray-400">{facility.count}</span>
                </div>
              ))}
            </div>
          </FilterAccordion>
          <FilterAccordion headerText="Accommodation Type">Coming soon</FilterAccordion>
          <FilterAccordion headerText="Distance from Centre">Coming soon</FilterAccordion>
        </div>
        {/*  Search Results*/}
        <div className="basis-3/4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">New York</h1>
          <h3 className="scroll-m-20 text-2xl font-semibold text-gray-400 " style={{ marginTop: 10 }}>
            {properties.length} results
          </h3>
          {properties.map(property => (
            <SearchResultCard {...property} key={property.id} />
          ))}
          <div className="w-full text-center my-4">
            <Button className="rounded-3xl">Load more</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const SearchResultCard = (props: Property) => {
  return (
    <div className="w-full flex gap-2 rounded-3xl shadow-lg relative my-4 border border-gray-200">
      <Badge className="absolute right-0 top-0 px-2 text-sm m-3">{props.rating || 0}/10</Badge>
      <div className="basis-1/3">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/2f/1a/50/hotel-exterior.jpg?w=1000&h=-1&s=1"
          className="rounded-3xl shadow-lg w-full h-full"
          alt="Image of property"
        />
      </div>
      {/* Header text - name, location, distance from centre */}
      <div className="basis-2/3 p-2">
        <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">{props.name}</h3>
        <h4 className="scroll-m-20 text-xl tracking-tight text-gray-400">{props.address}</h4>
        <small className="text-sm font-medium leading-none text-gray-400">320m from centre</small>

        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-2 h-full justify-end">
            <Badge className="bg-green-200 text-black flex justify-between gap-1">
              Free Cancellation
              <Check className="text-primary" />
            </Badge>
            <Badge className="bg-green-200 text-black flex justify-between gap-1">
              No dog people
              <Check className="text-primary" />
            </Badge>
          </div>
          <div className="text-right">
            <small className="text-sm font-medium leading-none text-gray-400">1 night | 2 adults</small>
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">$ {props.pricePerNight}</h3>
            <Button size="lg" className="rounded-3xl mt-4">
              <span className="text-lg">Book</span> <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterAccordion = ({ headerText, open, children }: { headerText?: string; open?: boolean; children: ReactNode }) => {
  const _headerText = headerText || 'Filter';

  return (
    // defaultValue is usually meant for accordions with multiple items in it, so it takes an array or items as args
    // so it can have those items open by default. the search page has multiple accordions with one item in each.
    <Accordion type="multiple" className="w-full shadow-md rounded-3xl p-2 px-4" defaultValue={open ? [_headerText] : []}>
      <AccordionItem value={_headerText} className="border-0">
        <AccordionTrigger className="text-lg">{_headerText}</AccordionTrigger>
        <AccordionContent className="py-2 px-1">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
