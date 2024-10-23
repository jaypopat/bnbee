import './App.css';
import MainLayout from '@/components/MainLayout';
import SearchBar from './components/SearchBar';
import { Button } from './components/ui/button';
import { ArrowDownRight, Heart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel';

const accommodationTypes = ['Hotels', 'Apartments', 'Barns', 'Villas', 'Chalets', 'Cottages', 'Hostels'];
const lastTrips: LastTrip[] = [
  {
    title: 'The Blue House',
    location: 'Galway, Ireland',
    rating: 4.5,
    dateFrom: new Date('2022-08-12'),
    dateTo: new Date('2022-08-15'),
  },
  {
    title: 'The Red House',
    location: 'Galway, Ireland',
    rating: 4.5,
    dateFrom: new Date('2022-08-12'),
    dateTo: new Date('2022-08-15'),
  },
  {
    title: 'The Green House',
    location: 'Galway, Ireland',
    rating: 4.5,
    dateFrom: new Date('2022-08-12'),
    dateTo: new Date('2022-08-15'),
  },
  {
    title: 'The Yellow House',
    location: 'Galway, Ireland',
    rating: 4.5,
    dateFrom: new Date('2022-08-12'),
    dateTo: new Date('2022-08-15'),
  },
];

const uniqueLocations: UniqueLocation[] = [
  {
    name: 'Maritime Freizeit Camp "MFC" Efurter Seen',
    location: 'Frankfurt, Germany',
    rating: 9,
    price: 89,
  },
  {
    name: 'Seaside Resort',
    location: 'Hamburg, Germany',
    rating: 8,
    price: 120,
  },
  {
    name: 'Mountain Retreat',
    location: 'Munich, Germany',
    rating: 10,
    price: 150,
  },
  {
    name: 'Urban Oasis',
    location: 'Berlin, Germany',
    rating: 7,
    price: 110,
  },
  {
    name: 'Countryside Escape',
    location: 'Bavaria, Germany',
    rating: 9,
    price: 95,
  },
  {
    name: 'Historic Downtown Stay',
    location: 'Cologne, Germany',
    rating: 8,
    price: 130,
  },
];

function App() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="flex justify-center">
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-4xl font-bold">Book Your Dream Getaway</h1>
          <p className="text-xl text-muted-foreground/75">Thousands of accommodation options for your trips</p>
        </div>
      </div>

      {/* Search */}
      <SearchBar />

      {/* Last Trips */}
      <div className="flex flex-col gap-10">
        {/* Heading */}
        <div className="flex justify-start">
          <h1 className="text-3xl font-semibold leading-9">Your Last Trips</h1>
        </div>
        <div className="flex flex-row gap-4">
          {lastTrips.map(trip => (
            <LastTripCard key={trip.title} {...trip} />
          ))}
        </div>
      </div>

      {/* Search by Type */}
      <div className="flex flex-col gap-10">
        <div className="flex justify-start">
          <h1 className="text-3xl font-semibold leading-9">Search by accommodation type</h1>
        </div>
        {/* Type cards */}
        <div className="flex flex-row gap-10 items-center justify-center h-auto flex-wrap">
          {accommodationTypes.map(type => (
            <div key={type}>
              {/* TODO: Link to the search results page with a property type */}
              <Button variant="secondary" className="bg-primary-foreground shadow-lg rounded-md justify-center items-center px-6 py-2">
                <p className="text-base font-medium">{type}</p>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Reccomendations */}
      <div className="flex flex-col gap-10">
        {/* Heading */}
        <div className="space-y-4 items-center">
          <h1 className="text-3xl font-semibold leading-9">Organize your journey fast and simple</h1>
          <h2 className="text-xl font-normal text-muted-foreground/75">We recommend the best places in Ireland</h2>
        </div>

        <div className="flex flex-row gap-4">
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
        </div>
      </div>

      {/* Unique Locations */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Choose a unique location</h1>
        {/* Location Cards */}
        <UniqueLocationCarousel />
      </div>

      {/* Sign Up Banner */}
      <div className="h-auto w-full bg-primary py-10 px-12 rounded-[20px]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-4xl font-semibold text-primary-foreground w-1/2">
            Sign up and get access to our loyalty programme and discounts from 10%
          </h1>
          {/* TODO: Link to Sign Up */}
          <Button variant="outline" className="rounded-sm">
            Create Account
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

type LastTrip = {
  imageUrl?: string;
  location: string;
  title: string;
  rating?: number;
  dateFrom: Date;
  dateTo: Date;
};

const LastTripCard = ({ location, title, dateFrom, dateTo }: LastTrip) => {
  function formatDateToDayMonth(date: Date) {
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  }

  return (
    <div className="flex flex-row gap-2 bg-primary-foreground rounded-[25px] shadow-lg p-1.5 w-96">
      {/* Image */}
      <div className="bg-primary w-1/2 h-full rounded-[20px]" />
      <div className="flex flex-col gap-1">
        {/* Location */}
        <p className="text-xs font-semibold text-muted-foreground/75 pt-2">{location}</p>
        {/* Title */}
        <h1 className="text-lg text-secondary-foreground font-bold leading-6">{title}</h1>
        {/* Rating */}
        <div className="flex items-center py-2 w-3/4">
          <Star className="size-6 text-yellow-300 fill-yellow-300" />
          <Star className="size-6 text-yellow-300 fill-yellow-300" />
          <Star className="size-6 text-yellow-300 fill-yellow-300" />
          <Star className="size-6 text-yellow-300 fill-yellow-300" />
        </div>
        {/* Date */}
        <div className="py-1">
          <p className="text-xs text-muted-foreground/75 font-medium">
            {formatDateToDayMonth(dateFrom)} - {formatDateToDayMonth(dateTo)}
          </p>
        </div>
      </div>
    </div>
  );
};

const RecommendationCard = () => {
  return (
    <div className="shadow-lg relative overflow-hidden rounded-[20px] transition-all duration-300 hover:scale-105 h-[19rem] w-1/4">
      {/* Image */}
      <div className="bg-primary w-full h-full" />
      <div className="bg-primary-foreground/95 rounded-t-[20px] absolute bottom-0 w-full p-1">
        {/* Name */}
        <div className="flex flex-col gap-6 p-4">
          <h1 className="text-2xl font-bold">Cliffs of Moher</h1>
          <p className="text-sm leading-6 font-normal text-muted-foreground">10 variants</p>
        </div>
        <div className="flex justify-end gap-1">
          <Button variant="link" size="icon" className="rounded-full bg-primary shadow-lg">
            <Heart className="text-primary-foreground" />
          </Button>
          <Button variant="link" size="icon" className="rounded-full bg-primary shadow-lg">
            <ArrowDownRight className="text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

type UniqueLocation = {
  imageUrl?: string;
  name: string;
  location: string;
  rating: number;
  price: number;
};

const UniqueLocationCard = ({ name, location, rating, price }: UniqueLocation) => {
  return (
    <div className="shrink-0 relative overflow-hidden rounded-[20px] h-[19rem]">
      {/* Image */}
      <div className="bg-primary w-full h-full"></div>
      {/* Content */}
      <div className="bg-primary-foreground/95 rounded-t-[20px] absolute bottom-0 w-full p-3">
        {/* Rating */}
        <div className="flex justify-end">
          <Badge>{rating}/10</Badge>
        </div>
        {/* Name & Location*/}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold line-clamp-1 overflow-hidden text-ellipsis">{name}</h1>
          <p className="text-sm leading-6 font-normal text-muted-foreground">{location}</p>
        </div>
        <div className="flex flex-row justify-between">
          {/* Price */}
          <div className="flex gap-2 items-baseline">
            <span className="text-muted-foreground text-sm leading-6 font-normal">From</span>
            <span className="text-3xl font-semibold">
              {price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
          {/* Buttons */}
          <div className="flex flex-row gap-1">
            <Button variant="link" size="icon" className="rounded-full bg-primary shadow-lg">
              <Heart className="text-primary-foreground" />
            </Button>
            <Button variant="link" size="icon" className="rounded-full bg-primary shadow-lg">
              <ArrowDownRight className="text-primary-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UniqueLocationCarousel = () => {
  return (
    <Carousel
      className="w-full"
      opts={{
        watchDrag: false,
      }}
    >
      <CarouselPrevious />
      <CarouselContent>
        {uniqueLocations.map(location => (
          <CarouselItem key={location.name} className="basis-1/3">
            <UniqueLocationCard {...location} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  );
};
export default App;
