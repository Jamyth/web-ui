import React from 'react';
import ReactDOM from 'react-dom';
import { extendTheme, Theme, theme, ChakraProvider, UseToastOptions } from '@chakra-ui/react';
import { ToastContainer } from './ToastContainer';
import { i18n } from '../../internal/i18n/util';

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

    static success(message: string, title?: string) {
        const t = i18n();
        return this.createAsync({
            status: 'success',
            description: message,
            isClosable: true,
            title: title || t.success,
            ...this.options,
        });
    }

    static error(message: string, title?: string) {
        const t = i18n();
        return this.createAsync({
            status: 'error',
            description: message,
            isClosable: true,
            title: title || t.error,
            ...this.options,
        });
    }

    static warning(message: string, title?: string) {
        const t = i18n();
        return this.createAsync({
            status: 'warning',
            description: message,
            isClosable: true,
            title: title || t.warning,
            ...this.options,
        });
    }

    static info(message: string, title?: string) {
        const t = i18n();
        return this.createAsync({
            status: 'info',
            description: message,
            isClosable: true,
            title: title || t.info,
            ...this.options,
        });
    }
}
