import { Box, Heading, Flex } from '@chakra-ui/layout';
import React from 'react';

export interface DemoHelperGroup {
    title: string;
    components: (React.ReactElement | '-' | ' ')[];
    showPropsHint?: boolean;
    style?: React.CSSProperties;
}

interface Props {
    groups: DemoHelperGroup[];
}

export const DemoHelper = React.memo(({ groups }: Props) => {
    return (
        <>
            {groups.map(({ title, components, showPropsHint, style: GroupStyle }) => (
                <Box key={title}>
                    <Heading fontSize="26px" mb="5px">
                        {title}
                    </Heading>
                    <Flex flexWrap="wrap" alignItems="center" backgroundColor="white" borderRadius="10px">
                        {components.map((component, index) =>
                            component === '-' ? (
                                <Box key={index} h="15px" />
                            ) : component === ' ' ? (
                                <Box key={index} w="20px" />
                            ) : (
                                <Box>{component}</Box>
                            ),
                        )}
                    </Flex>
                </Box>
            ))}
        </>
    );
});
