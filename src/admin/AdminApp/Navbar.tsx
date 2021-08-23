import React from 'react';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Flex, Image, Link, Box } from '@chakra-ui/react';
import type { NavigationService } from './type';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
    logoSrc: string;
    navigationService: NavigationService[];
    navigationColorMode?: 'light' | 'dark';
}

export const Navbar = React.memo(({ logoSrc, navigationService, navigationColorMode }: Props) => {
    const location = useLocation();
    const isLightMode = navigationColorMode === 'light';

    const activeIndex = navigationService.findIndex((_) => _.modules.map((_) => _.path).includes(location.pathname));

    const renderAccordion = (service: NavigationService, index: number) => (
        <AccordionItem border="none" key={index}>
            <AccordionButton>
                <Box textAlign="left" fontSize="lg" pl={8}>
                    {service.title}
                </Box>
            </AccordionButton>
            <AccordionPanel p={0}>
                {service.modules.map((_) => (
                    <Link
                        as={NavLink}
                        to={_.path}
                        p={2}
                        pl={16}
                        d="block"
                        backgroundColor={isLightMode ? 'gray.50' : 'gray.800'}
                        fontSize="lg"
                        key={_.path}
                    >
                        {_.name}
                    </Link>
                ))}
            </AccordionPanel>
        </AccordionItem>
    );
    return (
        <Flex
            w="220px"
            h="100%"
            direction="column"
            backgroundColor={isLightMode ? 'white' : 'gray.700'}
            shadow="lg"
            color={isLightMode ? 'gray.700' : 'white'}
            pt={4}
            pb={8}
            justifyContent="space-between"
        >
            <Flex direction="column">
                <Flex p={2} justifyContent="center" alignItems="center" mb={4}>
                    <Image w="30%" objectFit="contain" src={logoSrc} alt="Logo" />
                </Flex>
                <Accordion allowToggle defaultIndex={activeIndex}>
                    {navigationService.map(renderAccordion)}
                </Accordion>
            </Flex>
        </Flex>
    );
});
