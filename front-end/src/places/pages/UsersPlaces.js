import React from 'react';
import PlaceLists from '../components/PlaceLists';
import { useParams } from 'react-router-dom';

const UsersPlaces = (props) => {
  const DUMMY_PLACES = [
    {
      id: 'p1',
      imageUrl:
        'https://media.gettyimages.com/photos/the-new-urban-bangalore-city-skyline-picture-id599531522?s=2048x2048',
      title: 'Microsoft',
      address: 'Microsoft Signature Building,Bengaluru',
      description: 'Best company in bangalore',
      creator: 'u1',
      location: {
        lat: '12.973167',
        lng: '77.6798206',
      },
    },
    {
      id: 'p2',
      imageUrl:
        'https://media.gettyimages.com/photos/the-new-urban-bangalore-city-skyline-picture-id599531522?s=2048x2048',
      title: 'Amazon building',
      address: 'Microsoft Signature Building, Domlur, Bengaluru, Karnataka',
      description: 'Best company in bangalore',
      creator: 'u2',
      location: {
        lat: '12.973167',
        lng: '77.6798206',
      },
    },
  ];

  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceLists items={loadedPlaces} />;
};

export default UsersPlaces;
