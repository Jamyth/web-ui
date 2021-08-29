import { Button, Box, Heading, Code } from '@chakra-ui/react';
import React from 'react';
import { AdminPage } from '../../AdminPage';
import { useHistory, useLocation } from 'react-router-dom';
import { i18n } from '../../../internal/i18n/admin';

export const NotFound = React.memo(() => {
    const location = useLocation();
    const history = useHistory();
    const t = i18n();

    const backToHome = () => {
        history.replace('/');
    };

    return (
        <AdminPage textAlign="center" py={10}>
            <Heading size="lg">{t.notFound}</Heading>
            <Code w="initial">{location.pathname}</Code>
            <Box>
                <Button onClick={backToHome}>{t.goHome}</Button>
            </Box>
        </AdminPage>
    );
});
