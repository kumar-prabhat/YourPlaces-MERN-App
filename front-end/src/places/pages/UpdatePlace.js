import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlaceForm.css';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';

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

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const updatePlaceHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card className='p-1'>
          <h1>Could not find place!</h1>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <form className='place-form' onSubmit={updatePlaceHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (at least 5 characters).'
        onInput={() => {}}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />

      <Button type='submit' disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
