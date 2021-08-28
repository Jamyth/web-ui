import React from 'react';
import type { SafeReactChildren } from '../../type';
import type { StackProps } from '@chakra-ui/react';
import { Box, VStack } from '@chakra-ui/react';
import { Filter } from './Filter';

interface Props extends StackProps {
    children: SafeReactChildren;
}

export class AdminPage extends React.PureComponent<Props> {
    static Filter: typeof Filter = Filter;

    render() {
        const { children, ...props } = this.props;
        return (
            <Box backgroundColor="white" shadow="md" p={8}>
                <VStack
                    spacing={6}
                    css={{
                        '&>*': {
                            width: '100%',
                        },
                    }}
                    {...props}
                >
                    {children}
                </VStack>
            </Box>
        );
    }
}
