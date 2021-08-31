import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export interface Props {
    space?: BoxProps['width'];
}

export const Space = React.memo(({ space }: Props) => {
    return <Box w={space} />;
});
