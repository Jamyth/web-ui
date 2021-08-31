import { theme, Theme, extendTheme, ChakraProvider, Flex } from '@chakra-ui/react';
import { ModalContainer } from './ModalContainer';
import React from 'react';
import ReactDOM from 'react-dom';
import { SafeReactChild, SafeReactChildren } from '../../type';
import { i18n } from '../../internal/i18n/util';

export interface ModalOptions {
    body: SafeReactChildren;
    centered?: boolean;
    title?: React.ReactChild;
    okayText?: string;
    cancelText?: string;
    onClose?: (byClose: boolean) => void;
    onOk?: () => void;
    closable?: boolean;
}

export class ModalUtil {
    private static theme: Theme = theme;
    static modalQueue: HTMLDivElement[] = [];

    static setTheme(theme: Partial<Theme>) {
        this.theme = extendTheme(theme);
    }

    static destroyAll() {
        const bodyElement = document.body;
        while (ModalUtil.modalQueue.length) {
            const divElement = ModalUtil.modalQueue.pop();
            divElement && bodyElement.removeChild(divElement);
        }
    }

    static createSync({ onClose, onOk, ...props }: ModalOptions) {
        const bodyElement = document.body;
        const divElement = document.createElement('div');

        ModalUtil.modalQueue.push(divElement);

        const closeModal = (byClose: boolean = true) => {
            onClose?.(byClose);
            bodyElement.removeChild(divElement);
            ModalUtil.modalQueue.splice(ModalUtil.modalQueue.indexOf(divElement), 1);
        };

        const onOkay = () => {
            onOk?.();
            bodyElement.removeChild(divElement);
            ModalUtil.modalQueue.splice(ModalUtil.modalQueue.indexOf(divElement), 1);
        };

        ReactDOM.render(
            <ChakraProvider theme={this.theme}>
                <ModalContainer {...props} onOk={onOkay} onClose={closeModal} />
            </ChakraProvider>,
            divElement,
            () => bodyElement.appendChild(divElement),
        );
    }

    static createAsync(options: Omit<ModalOptions, 'onOk' | 'onClose'>) {
        return new Promise<'ok' | 'cancel' | 'close'>((resolve) => {
            this.createSync({
                ...options,
                onOk: () => resolve('ok'),
                onClose: (byClose) => resolve(byClose ? 'close' : 'cancel'),
            });
        });
    }

    static confirm(body: SafeReactChildren, title?: string) {
        const t = i18n();
        return this.createAsync({
            title: title || t.systemMessage,
            body,
        });
    }
}
