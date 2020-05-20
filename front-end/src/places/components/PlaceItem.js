import React, { Fragment, useState, useContext } from 'react';
import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = ({
  place: { id, imageUrl, title, address, description, creator, location },
}) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmDeletePlace = () => {
    setShowConfirmModal(false);
    console.log('DELETING....');
  };
  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={() => setShowMap(false)}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={() => setShowMap(false)}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={location} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        header='Are you sure ?'
        footerClass='place-item__modal-actions'
        footer={
          <Fragment>
            <Button inverse onClick={() => setShowConfirmModal(false)}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeletePlace}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place ? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={imageUrl} alt={title}></img>
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={() => setShowMap(true)}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Fragment>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger onClick={() => setShowConfirmModal(true)}>
                  DELETE
                </Button>
              </Fragment>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
