import api from './index';
import { Property } from '@/types';

async function getAllProperties(): Promise<Property[]> {
  return api
    .get('/api/properties')
    .then(res => res.data)
    .catch(error => {
      console.log(error);
      return [];
    });
}

export { getAllProperties };
