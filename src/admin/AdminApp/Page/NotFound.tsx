import { Button, Box, Heading, Code } from '@chakra-ui/react';
import React from 'react';
import { AdminPage } from '../../AdminPage';
import { useHistory, useLocation } from 'react-router-dom';

export const NotFound = React.memo(() => {
    const location = useLocation();
    const history = useHistory();

    const backToHome = () => {
        history.replace('/');
    };

    return (
        <AdminPage textAlign="center" py={10}>
            <Heading size="lg">Sorry, the page {"you're"} looking for does not exist.</Heading>
            <Code w="initial">{location.pathname}</Code>
            <Box>
                <Button onClick={backToHome}>Back to Home Page</Button>
            </Box>
        </AdminPage>
    );
});
