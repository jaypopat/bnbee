import api from './index';
import { Property, PropertyReview } from '@/types';

async function getAllProperties(): Promise<Property[]> {
  return api
    .get('/api/properties')
    .then(res => res.data)
    .catch(error => {
      console.log(error);
      return [];
    });
}

async function getPropertyById(id: string): Promise<Property> {
  return api
    .get(`/api/properties/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error('Error getting property with id:', id, err);
    });
}

async function getPropertyReviews(id: string): Promise<PropertyReview[]> {
  return api
    .get(`/api/properties/${id}/reviews`)
    .then(res => res.data)
    .catch(err => console.error(err));
}

export { getAllProperties, getPropertyById, getPropertyReviews };
