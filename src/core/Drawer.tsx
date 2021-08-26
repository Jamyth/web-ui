import {
    Drawer as ChakraDrawer,
    DrawerContent,
    DrawerProps,
    DrawerContentProps,
    DrawerOverlay,
    DrawerCloseButton,
} from '@chakra-ui/react';
import React from 'react';
import type { SafeReactChildren } from '../type';

export interface Props extends DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: SafeReactChildren;
    nested?: boolean;
    contentProps?: DrawerContentProps;
    showDrawerCloseButton?: boolean;
}

export const Drawer = React.memo(
    ({ isOpen, onClose, children, nested = false, contentProps, showDrawerCloseButton = true, ...props }: Props) => {
        const overlayZIndex = nested ? 1400 : 1300;
        return (
            <ChakraDrawer isOpen={isOpen} onClose={onClose} {...props}>
                <DrawerOverlay zIndex={overlayZIndex} css={{ backdropFilter: 'blur(2px)' }} />
                <DrawerContent p={4} {...contentProps}>
                    {showDrawerCloseButton && <DrawerCloseButton />}
                    {children}
                </DrawerContent>
            </ChakraDrawer>
        );
    },
);
