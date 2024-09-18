import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Flex } from 'antd';

const Business = () => {
  const { userData } = useSelector((state) => state.auth);

  return (
    <>
      <div>Business</div>
      <Flex gap="10px">
        {userData?.userData?.privilegeName?.includes('create_bu') && <Button type='primary'>Add</Button>}
        {userData?.userData?.privilegeName?.includes('modify_bu') && <Button color='green'>Edit</Button>}
        {userData?.userData?.privilegeName?.includes('delete_bu') && <Button danger>Delete</Button>}
      </Flex>
    </>
  );
};

export default Business;
