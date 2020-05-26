import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className='center'>
        <Card className='p-1'>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className='users-list'>
      {items.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UsersList;
