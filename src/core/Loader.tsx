import React from 'react';
import { Spinner, Box } from '@chakra-ui/react';
import type { SafeReactChildren } from '../type';

interface Props {
    loading: boolean;
    children: SafeReactChildren;
}

export const Loader = React.memo(({ loading, children }: Props) => {
    return <Box textAlign={loading ? 'center' : undefined}>{loading ? <Spinner /> : children}</Box>;
});
