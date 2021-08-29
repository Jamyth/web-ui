import { Flex, Box } from '@iamyth/web-ui/native';
import React from 'react';
import { Switch } from '@iamyth/web-ui/core/Switch';
import { LocaleSelect } from '@iamyth/web-ui/core/LocaleSelect';

interface Props {
    value: boolean;
    onChange: (val: boolean) => void;
}

export const Header = React.memo(({ value, onChange }: Props) => {
    return (
        <Flex alignItems="center" background="white" shadow="md" zIndex={10} p={2} px={4}>
            <Box mr={4}>
                Is Light Mode <Switch value={value} onChange={onChange} />
            </Box>
            <Flex alignItems="center">
                Language <LocaleSelect />
            </Flex>
        </Flex>
    );
});
