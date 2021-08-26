import React from 'react';
import { useToast, UseToastOptions } from '@chakra-ui/react';

interface Props {
    options: UseToastOptions;
}

export const ToastContainer = React.memo(({ options }: Props) => {
    const toast = useToast();

    React.useEffect(() => {
        toast(options);
    }, []);

    return null;
});
