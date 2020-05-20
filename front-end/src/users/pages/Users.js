import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Prabhat',
      image:
        '//www.gravatar.com/avatar/f935db9ae0cce7dd979c7e7e2b658397?s=200&r=pg&d=mm',
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
