import React from 'react';
import { ModalFooter, ModalProps } from '@chakra-ui/react';
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react';
import { Loader } from './Loader';
import type { SafeReactChild, SafeReactChildren } from '../type';

export interface Props extends Omit<ModalProps, 'isOpen'> {
    isOpen?: boolean;
    onClose: () => void;
    children: SafeReactChildren;
    title?: SafeReactChild;
    loading?: boolean;
    nested?: boolean;
    showCloseButton?: boolean;
    footer?: SafeReactChildren;
}

export const Modal = React.memo(
    ({
        title,
        children,
        onClose,
        loading = false,
        nested,
        showCloseButton = true,
        isOpen = true,
        footer,
        ...props
    }: Props) => {
        const overlayZIndex = nested ? 1400 : 1300;
        return (
            <ChakraModal isOpen={isOpen} onClose={onClose} {...props}>
                <ModalOverlay zIndex={overlayZIndex} css={{ backdropFilter: 'blur(2px)' }} />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    {showCloseButton && <ModalCloseButton />}
                    <Loader loading={loading}>
                        <ModalBody pb={8}>{children}</ModalBody>
                    </Loader>
                    {footer && <ModalFooter>{footer}</ModalFooter>}
                </ModalContent>
            </ChakraModal>
        );
    },
);
