import { Center, Heading } from '@chakra-ui/react';
import React from 'react';
import { AdminPage } from '../../AdminPage';

export const Home = React.memo(() => {
    return (
        <AdminPage>
            <Center h="30vh" color="gray.700">
                <Heading size="lg">Welcome to Admin Panel</Heading>
            </Center>
        </AdminPage>
    );
});
