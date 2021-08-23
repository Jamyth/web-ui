import { Box } from '@iamyth/web-ui/native';
import React from 'react';
import { Switch } from '@iamyth/web-ui/core/Switch';

interface Props {
    value: boolean;
    onChange: (val: boolean) => void;
}

export const Header = React.memo(({ value, onChange }: Props) => {
    return (
        <Box background="white" shadow="md" p={2} px={4}>
            Is Light Mode <Switch value={value} onChange={onChange} />
        </Box>
    );
});
