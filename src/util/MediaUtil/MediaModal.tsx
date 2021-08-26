import { SafeReactChildren } from '../../type';
import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
    onClose: () => void;
    children: SafeReactChildren;
}

export const MediaModal = React.memo(({ onClose, children }: Props) => {
    return (
        <Box
            onClick={onClose}
            width="100vw"
            height="100vh"
            position="fixed"
            zIndex="1500"
            top="0"
            left="0"
            backgroundColor="rgba(0,0,0,0.7)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            css={{
                '> img, > video': {
                    maxWidth: '98%',
                    maxHeight: '98%',
                },
            }}
        >
            {children}
        </Box>
    );
});
