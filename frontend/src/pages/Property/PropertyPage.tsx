import MainLayout from '@/components/MainLayout.tsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Heart, MapIcon, MapPin, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { DatePickerWithRange } from '@/components/DateRangePicker.tsx';
import { Facilities } from '@/assets/Facilities.tsx';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';

const description =
  'Hyatt Place NYC Chelsea is a hotel located in New York City. It features a fitness centre, a shared lounge, a terrace and a restaurant. The 4-star hotel offers free Wi-Fi, a 24-hour front desk and a business centre. A bar is also available.' +
  '\n' +
  'At Hyatt Place NYC Chelsea, each air-conditioned room features a flat-screen cable TV and a safe. Other amenities include a seating area and a private bathroom with a shower, free toiletries and a hairdryer. A refrigerator is at the disposal of all guests.\n' +
  '\n' +
  'A breakfast buffet is available daily.\n' +
  '\n' +
  'Popular atractions such as Penn Station, High Line Park and Macy’s Department Store are close to Hyatt Place NYC Chelsea. LaGuardia Airport is 13 kilometers away.';

const facilities = ['breakfast', 'freewifi', 'petsallowed', 'airconditioner', 'gym', 'view'];

const reviews: PropertyReview[] = [
  {
    id: 1,
    reviewerName: 'Alice Smith',
    bookingStartDate: new Date('2023-08-10'),
    bookingEndDate: new Date('2023-08-15'),
    message: 'The property was clean, and the location was excellent. Would definitely stay again!',
    score: 5,
  },
  {
    id: 2,
    reviewerName: 'John Doe',
    bookingStartDate: new Date('2023-07-01'),
    bookingEndDate: new Date('2023-07-05'),
    message: 'Good stay overall, but the Wi-Fi was unreliable. Great host though!',
    score: 4,
  },
  {
    id: 3,
    reviewerName: 'Sophia Liu',
    bookingStartDate: new Date('2023-09-12'),
    bookingEndDate: new Date('2023-09-16'),
    message: 'Amazing views and cozy interior. However, the kitchen lacked some basic utensils.',
    score: 4,
  },
  {
    id: 4,
    reviewerName: 'David Martinez',
    bookingStartDate: new Date('2023-10-05'),
    bookingEndDate: new Date('2023-10-10'),
    message: 'Not quite what I expected. The photos made the place look bigger than it is.',
    score: 3,
  },
  {
    id: 5,
    reviewerName: 'Emma Brown',
    bookingStartDate: new Date('2023-11-20'),
    bookingEndDate: new Date('2023-11-25'),
    message: 'Perfect place for a relaxing getaway! The host was very accommodating.',
    score: 5,
  },
];

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
      <SectionLinks />
      <div className="flex align-bottom justify-between">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Hyatt Place NYC Chelsea</h1>
          <h3 className="scroll-m-20 text-2xl font-semibold text-gray-400 " style={{ marginTop: 10 }}>
            140 West 24th Street, Chelsea, New York, NY 10011, USA
          </h3>
        </div>
        <div className="flex items-end gap-4">
          <Button size="icon" variant="ghost">
            <Heart className="text-primary" size={35} />
          </Button>
          <Button size="lg" className="">
            Book
          </Button>
        </div>
      </div>

      {/* Star Rating*/}
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-5xl text-yellow-400">
          {String.fromCodePoint(0x02605)}
        </span>
      ))}

      {/* Find on map btn */}
      <Link to="#" className="w-full flex justify-end text-primary gap-1" style={{ marginTop: 10 }}>
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
        <Button variant="ghost">
          All 34 photos
          <ArrowRight />
        </Button>
      </div>

      {/* Facilities buttons */}
      <div className="w-full flex flex-wrap gap-3">
        {facilities.map(facility => (
          <div key={facility} className="flex items-center gap-2 rounded-2xl shadow-lg px-6 py-3 text-gray-400">
            {Facilities.get(facility)?.icon}
            {Facilities.get(facility)?.name}
          </div>
        ))}
      </div>

      {/*  Description */}
      <div className="w-full flex gap-10">
        <div className="basis-2/3">{description}</div>
        <div className="text-center bg-primary rounded-3xl text-white px-16 py-10 max-h-96">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Create an account to get 20% off.</h2>
          <p className="leading-7 mt-3 mb-10">Join our loyalty programme</p>
          <Button variant="secondary">Create Account</Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">Reviews</h1>
        <div className="flex items-center gap-4">
          <Badge className="text-2xl px-5 py-1">8/10</Badge>
          <span className="text-gray-400">from 174 reviews</span>
        </div>

        <ReviewsCarousel />
        <div className="w-full text-right">
          <Button variant="ghost">
            All reviews
            <ArrowRight />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

export default PropertyPage;

const sectionNames = ['Overview', 'Information', 'Facilities', 'Conditions', 'Reviews'];

const SectionLinks = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(0);

  return (
    <nav className="w-full flex items-center justify-between">
      {sectionNames.map((sectionName, idx) => (
        <div key={idx}>
          <Button
            variant="ghost"
            onClick={() => setActiveLinkIdx(idx)}
            className={`text-gray-400 font-bold ${activeLinkIdx === idx ? 'text-black' : ''}`}
          >
            {sectionName}
          </Button>
          {/* That blue line under the active section button */}
          {activeLinkIdx === idx && <div className="h-1 w-full bg-primary rounded"></div>}
        </div>
      ))}
    </nav>
  );
};

const ReviewsCarousel = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })]}
      className="w-full mt-6"
    >
      <CarouselContent>
        {reviews.map(review => (
          <CarouselItem key={review.id} className="basis-1/3 md:basis1/4">
            <ReviewsCarouselCard {...review} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

interface PropertyReview {
  id: number;
  reviewerName: string;
  bookingStartDate: Date;
  bookingEndDate: Date;
  message: string;
  score: number;
}

function formatDateToDayMonth(date: Date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const ReviewsCarouselCard = (props: PropertyReview) => {
  return (
    // mb-4 is to make the card's shadow "show over the carousel"
    <Card className="relative rounded-3xl shadow-lg h-60 mb-4">
      <Badge className="absolute right-0 top-0 px-2 text-sm m-3">{props.score}/10</Badge>
      <CardHeader>
        <div className="flex items-start">
          <Avatar className="mr-2">
            {/* Add Profile Icon here */}
            <AvatarFallback>{props.reviewerName.split(' ').map(name => name.at(0))}</AvatarFallback>
          </Avatar>
          <div>
            {props.reviewerName}
            <div className="flex text-gray-400">
              {formatDateToDayMonth(props.bookingStartDate)} - {formatDateToDayMonth(props.bookingEndDate)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>{props.message}</CardContent>
    </Card>
  );
};
