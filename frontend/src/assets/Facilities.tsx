import { Bone, Dumbbell, Eye, ForkKnife, Snowflake, Wifi } from 'lucide-react';

interface FacilityT {
  name: string;
  icon: React.ReactNode;
}

export const Facilities: Map<string, FacilityT> = new Map([
  [
    'breakfast',
    {
      name: 'Breakfast',
      icon: <ForkKnife />,
    },
  ],
  [
    'freewifi',
    {
      name: 'Freewifi',
      icon: <Wifi />,
    },
  ],
  [
    'petsallowed',
    {
      name: 'Pets Allowed',
      icon: <Bone />,
    },
  ],
  [
    'airconditioner',
    {
      name: 'Air Conditioner',
      icon: <Snowflake />,
    },
  ],
  [
    'gym',
    {
      name: 'Gym',
      icon: <Dumbbell />,
    },
  ],
  [
    'view',
    {
      name: 'View',
      icon: <Eye />,
    },
  ],
]);
