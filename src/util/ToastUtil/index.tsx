import React from 'react';
import ReactDOM from 'react-dom';
import { extendTheme, Theme, theme, ChakraProvider, UseToastOptions } from '@chakra-ui/react';
import { ToastContainer } from './ToastContainer';

interface SimpleToastOptions {
    message: string;
    title?: string;
    duration?: number;
}

export class ToastUtil {
    private static theme: Theme = theme;
    private static options: UseToastOptions = {
        duration: 5000,
        position: 'top',
    };

    static setTheme(theme: Partial<Theme>) {
        this.theme = extendTheme(theme);
    }

    static createSync(options: UseToastOptions) {
        const bodyElement = document.body;
        const divElement = document.createElement('div');
        const onComplete = options.onCloseComplete;

        options.onCloseComplete = () => {
            bodyElement.removeChild(divElement);
            onComplete?.();
        };

        ReactDOM.render(
            <ChakraProvider theme={this.theme}>
                <ToastContainer options={options} />
            </ChakraProvider>,
            divElement,
            () => bodyElement.appendChild(divElement),
        );
    }

    static createAsync(options: UseToastOptions) {
        return new Promise<void>((resolve) => {
            const onComplete = options.onCloseComplete;
            options.onCloseComplete = () => {
                onComplete?.();
                resolve();
            };

            this.createSync(options);
        });
    }

    static success(message: string, title: string = 'Success') {
        return this.createAsync({
            status: 'success',
            description: message,
            isClosable: true,
            title,
            ...this.options,
        });
    }

    static error(message: string, title: string = 'Error') {
        return this.createAsync({
            status: 'error',
            description: message,
            isClosable: true,
            title,
            ...this.options,
        });
    }

    static warning(message: string, title: string = 'Warning') {
        return this.createAsync({
            status: 'warning',
            description: message,
            isClosable: true,
            title,
            ...this.options,
        });
    }

    static info(message: string, title: string = 'Info') {
        return this.createAsync({
            status: 'info',
            description: message,
            isClosable: true,
            title,
            ...this.options,
        });
    }
}
