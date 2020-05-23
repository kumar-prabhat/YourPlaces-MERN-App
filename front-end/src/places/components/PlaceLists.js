import React from 'react';
import './PlaceLists.css';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

const PlaceLists = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='place-list center'>
        <Card className='p-1'>
          <h2>No places found.Maybe create one ?</h2>
          <Button to='/places/new'>Share Places</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className='place-list'>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          place={place}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceLists;
