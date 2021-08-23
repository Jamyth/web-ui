import React from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';
import type { SwitchProps } from '@chakra-ui/react';
import type { ControlledInput } from '../type';

interface Props extends Omit<SwitchProps, 'onChange' | 'value'>, ControlledInput<boolean> {}

export const Switch = React.memo(({ onChange, value, ...props }: Props) => {
    return <ChakraSwitch isChecked={value} onChange={(e) => onChange(e.target.checked)} {...props} />;
});
