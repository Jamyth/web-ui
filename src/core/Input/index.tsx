import React from 'react';
import { Input as ChakraInput, InputProps, InputGroup } from '@chakra-ui/react';
import { ControlledInput } from '../../type';

type ExcludedChakraInputKeys = 'value' | 'onChange';

export interface InputNullableProps extends Omit<InputProps, ExcludedChakraInputKeys>, ControlledInput<string | null> {}

export interface Props extends Omit<InputProps, ExcludedChakraInputKeys>, ControlledInput<string> {}

export class Input extends React.PureComponent<Props> {
    static Group = InputGroup;

    static Nullable = ({ value, onChange, ...rest }: InputNullableProps) => (
        <Input value={value || ''} onChange={(value) => onChange(value.trim() ? value : null)} {...rest} />
    );

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    };

    render() {
        const { onChange: _, ...rest } = this.props;
        return <ChakraInput {...rest} onChange={this.onChange} />;
    }
}
