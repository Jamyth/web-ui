import React from 'react';
import type { CheckboxProps } from '@chakra-ui/react';
import { Checkbox as ChakraCheckbox, CheckboxGroup } from '@chakra-ui/react';
import type { ControlledInput } from '../../type';

type ExcludedChakraCheckboxKey = 'checked' | 'isChecked' | '_checked' | 'value' | 'onChange';

export interface Props extends Omit<CheckboxProps, ExcludedChakraCheckboxKey>, ControlledInput<boolean> {}

export class Checkbox extends React.PureComponent<Props> {
    static Group = CheckboxGroup;

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.checked);
    };

    render() {
        const { value, ...props } = this.props;
        return <ChakraCheckbox checked={value} {...props} onChange={this.onChange} />;
    }
}
