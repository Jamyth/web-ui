import React from 'react';
import { Form } from '../../core/Form';
import type { Props as TableProps } from '../../core/Form';
import { Box } from '@chakra-ui/react';
import { i18n } from '../../internal/i18n/admin';

interface Props extends Omit<TableProps, 'layout' | 'submitButtonPosition' | 'submitText'> {}

export const Filter = React.memo(({ children, ...props }: Props) => {
    const t = i18n();
    return (
        <Box
            css={{
                '.chakra-form-control': {
                    maxWidth: '240px',
                },
            }}
        >
            <Form {...props} id="admin-page-filter" layout="inline" submitText={t.search}>
                {children}
            </Form>
        </Box>
    );
});
