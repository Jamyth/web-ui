import React from 'react';
import { Form } from '../../core/Form';
import type { Props as TableProps } from '../../core/Form';

interface Props extends Omit<TableProps, 'layout' | 'submitButtonPosition' | 'submitText'> {}

export const Filter = React.memo(({ children, ...props }: Props) => {
    return (
        <Form {...props} layout="inline" submitText="搜尋">
            {children}
        </Form>
    );
});
