import React from 'react';
import type { AspectRatioProps } from '@chakra-ui/react';
import { AspectRatio as ChakraAspectRatio } from '@chakra-ui/react';
import type { SafeReactChild } from '../type';

interface Props extends AspectRatioProps {
    children: SafeReactChild;
}

export const AspectRatio = React.memo(({ children, ...props }: Props) => {
    return <ChakraAspectRatio {...props}>{children}</ChakraAspectRatio>;
});
