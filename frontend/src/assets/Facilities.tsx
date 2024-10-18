import { Bone, Dumbbell, Eye, ForkKnife, Snowflake, Wifi } from 'lucide-react';
import { ReactNode } from 'react';

interface FacilityT {
  name: string;
  icon: ReactNode;
}

export const Facilities: Record<string, FacilityT> = {
  breakfast: {
    name: 'Breakfast',
    icon: <ForkKnife />,
  },
  freewifi: {
    name: 'Freewifi',
    icon: <Wifi />,
  },
  petsallowed: {
    name: 'Pets Allowed',
    icon: <Bone />,
  },
  airconditioner: {
    name: 'Air Conditioner',
    icon: <Snowflake />,
  },
  gym: {
    name: 'Gym',
    icon: <Dumbbell />,
  },
  view: {
    name: 'View',
    icon: <Eye />,
  },
};
