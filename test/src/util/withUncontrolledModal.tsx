import React from 'react';
import { Button } from '@iamyth/web-ui/core/Button';

export const withUncontrolledModal = <T extends { isOpen?: boolean; onClose: () => void }>(
    WrappedComponent: React.ComponentType<T>,
) => {
    const Injected = ({
        initialValue,
        buttonText,
        ...rest
    }: Omit<T, 'isOpen' | 'onClose'> & { initialValue: boolean; buttonText?: string }) => {
        const [value, setValue] = React.useState(initialValue);
        const onClose = () => setValue(false);
        return (
            <React.Fragment>
                <Button onClick={() => setValue(true)}>{buttonText ?? 'Open'}</Button>
                <WrappedComponent {...(rest as unknown as T)} isOpen={value} onClose={onClose} />
            </React.Fragment>
        );
    };

    return Injected;
};
