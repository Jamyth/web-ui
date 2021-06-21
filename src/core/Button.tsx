import React from 'react';
import type { ButtonProps } from '@chakra-ui/react';
import { Button as ChakraButton, ButtonGroup } from '@chakra-ui/react';

type ExcludedChakraButtonKeys = 'onClick';
interface OnClick {
    onClick?: () => void;
}

export interface Props extends Omit<ButtonProps, ExcludedChakraButtonKeys>, OnClick {}

export class Button extends React.PureComponent<Props> {
    static Group = ButtonGroup;

    render() {
        return <ChakraButton {...this.props} />;
    }
}
