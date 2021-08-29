import React from 'react';
import { Form } from '../../core/Form';
import type { Props as TableProps } from '../../core/Form';
import { Box } from '@chakra-ui/react';

interface Props extends Omit<TableProps, 'layout' | 'submitButtonPosition' | 'submitText'> {}

export const Filter = React.memo(({ children, ...props }: Props) => {
    return (
        <Box
            css={{
                '.chakra-form-control': {
                    maxWidth: '240px',
                },
            }}
        >
            <Form {...props} id="admin-page-filter" layout="inline" submitText="搜尋">
                {children}
            </Form>
        </Box>
    );
});
