import React from 'react';
import { SafeReactChildren } from '../../type';
import { Box, VStack, StackProps } from '@chakra-ui/react';

interface Props extends StackProps {
    children: SafeReactChildren;
}

export class AdminPage extends React.PureComponent<Props> {
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
