import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Home } from './Page/Home';
import { NotFound } from './Page/NotFound';
import type { Module, NavigationService } from './type';
import type { SafeReactChild } from '../../type';

interface Props {
    logoSrc: string;
    navigationService: NavigationService[];
    navigationColorMode?: 'light' | 'dark';
    header?: SafeReactChild;
}

export const AdminApp = React.memo(({ navigationService, logoSrc, navigationColorMode = 'dark', header }: Props) => {
    const routes = navigationService.reduce((acc, curr) => acc.concat(curr.modules), [] as Module[]);

    return (
        <Flex flex={1} overflow="hidden" h="100vh" maxH="100vh">
            <Navbar navigationService={navigationService} logoSrc={logoSrc} navigationColorMode={navigationColorMode} />
            <Flex flex={1} direction="column" h="100%" backgroundColor="gray.100">
                {header}
                <Flex flex={1} direction="column" h="100%" p={4} overflowY="scroll">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {routes.map(({ path, routeParameter, component }) => (
                            <Route
                                key={path}
                                component={component}
                                exact
                                path={routeParameter ? path + routeParameter : path}
                            />
                        ))}
                        <Route component={NotFound} />
                    </Switch>
                </Flex>
            </Flex>
        </Flex>
    );
});
