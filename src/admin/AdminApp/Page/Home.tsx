import { Center, Heading } from '@chakra-ui/react';
import { i18n } from '../../../internal/i18n/admin';
import React from 'react';
import { AdminPage } from '../../AdminPage';
import { TextUtil } from '../../../internal/TextUtil';

export const Home = React.memo(() => {
    const t = i18n();
    return (
        <AdminPage>
            <Center h="30vh" color="gray.700" flexDir="column">
                <Heading size="lg" mb={4}>
                    {TextUtil.interpolate(t.welcome, t.homePageTitle)}
                </Heading>
                <Heading size="md">{t.homePageSubtitle}</Heading>
            </Center>
        </AdminPage>
    );
});
