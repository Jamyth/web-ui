import React from 'react';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Flex, Image, Link } from '@chakra-ui/react';
import type { NavigationService } from './type';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
    logoSrc: string;
    navigationService: NavigationService[];
}

export const Navbar = React.memo(({ logoSrc, navigationService }: Props) => {
    const location = useLocation();

    const activeIndex = navigationService.findIndex((_) => _.modules.map((_) => _.path).includes(location.pathname));

    const renderAccordion = (service: NavigationService, index: number) => (
        <AccordionItem border="none" key={index}>
            <AccordionButton>
                <Flex flex={1} textAlign="left" fontSize="lg">
                    {service.title}
                </Flex>
            </AccordionButton>
            <AccordionPanel p={0}>
                {service.modules.map((_) => (
                    <Link
                        as={NavLink}
                        to={_.path}
                        p={2}
                        pl={8}
                        d="block"
                        backgroundColor="gray.800"
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
            backgroundColor="gray.700"
            color="white"
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
