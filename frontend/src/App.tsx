import './App.css';
import MainLayout from '@/components/MainLayout';
import SearchBar from './components/SearchBar';
import { Button } from './components/ui/button';
import PropertyImage from '@/assets/property_view.png';
import RecommendedImage from '@/assets/recommended.png';
import { ArrowDownRight, Heart, Star } from 'lucide-react';

const accommodationTypes = ['Hotels', 'Apartments', 'Barns', 'Villas', 'Chalets', 'Cottages', 'Hostels'];
const lastTrips = [
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
        <div className="flex flex-row gap-8 items-center justify-center h-auto flex-wrap">
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
    </MainLayout>
  );
}

type LastTripCardProps = {
  imageUrl?: string;
  location: string;
  title: string;
  rating?: number;
  dateFrom: Date;
  dateTo: Date;
};

const LastTripCard = ({ location, title, dateFrom, dateTo }: LastTripCardProps) => {
  function formatDateToDayMonth(date: Date) {
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  }

  return (
    <div className="flex flex-row gap-2 bg-primary-foreground rounded-[25px] shadow-lg p-1.5 w-96">
      <img /* TODO: User uploaded image url */ src={PropertyImage} alt="Property View" className="rounded-[20px] flex-1" />
      <div className="flex flex-col gap-1">
        {/* Location */}
        <p className="text-xs font-semibold text-muted-foreground/50 pt-2">{location}</p>
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
          <p className="text-xs text-muted-foreground/50 font-medium">
            {formatDateToDayMonth(dateFrom)} - {formatDateToDayMonth(dateTo)}
          </p>
        </div>
      </div>
    </div>
  );
};

const RecommendationCard = () => {
  return (
    <div className="flex shadow-xl bg-primary-foreground p-1">
      <div>
        <img src={RecommendedImage} alt="Cliffs of Moher" />
        <div className="bg-primary-foreground flex flex-col">
          <div className="p-6 flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Cliffs of Moher</h1>
            <p className="text-sm font-normal text-muted-foreground/75">10 variants</p>
          </div>
          <div className="flex justify-end gap-1">
            <Button variant="link" size="icon" className="rounded-full bg-primary">
              <Heart className="text-primary-foreground" />
            </Button>
            <Button variant="link" size="icon" className="rounded-full bg-primary">
              <ArrowDownRight className="text-primary-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
