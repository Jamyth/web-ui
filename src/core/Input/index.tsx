import React from 'react';
import type { InputProps, TextareaProps } from '@chakra-ui/react';
import { Input as ChakraInput, InputGroup, Textarea } from '@chakra-ui/react';
import type { ControlledInput } from '../../type';
import { Password } from './Password';

type ExcludedChakraInputKeys = 'value' | 'onChange';

export interface InputTextAreaProps extends Omit<TextareaProps, ExcludedChakraInputKeys>, ControlledInput<string> {}

export interface InputReadonlyProps
    extends Omit<
        InputProps,
        ExcludedChakraInputKeys | 'readonly' | 'disabled' | 'allowClear' | 'isDisabled' | 'isReadonly'
    > {
    value: string;
}

export interface InputNullableTextareaProps
    extends Omit<TextareaProps, ExcludedChakraInputKeys>,
        ControlledInput<string | null> {}

export interface InputNullableProps extends Omit<InputProps, ExcludedChakraInputKeys>, ControlledInput<string | null> {}

export interface Props extends Omit<InputProps, ExcludedChakraInputKeys>, ControlledInput<string> {}

export class Input extends React.PureComponent<Props> {
    static Group = InputGroup;
    static Password = Password;

    static Readonly = (props: InputReadonlyProps) => <Input onChange={() => {}} isDisabled isReadOnly {...props} />;

    static Textarea = ({ onChange, ...rest }: InputTextAreaProps) => (
        <Textarea onChange={(e) => onChange(e.target.value)} {...rest} />
    );

    static Nullable = ({ value, onChange, ...rest }: InputNullableProps) => (
        <Input value={value || ''} onChange={(value) => onChange(value.trim() ? value : null)} {...rest} />
    );

    static NullableTextarea = ({ value, onChange, ...rest }: InputNullableTextareaProps) => (
        <Input.Textarea value={value || ''} onChange={(value) => onChange(value.trim() ? value : null)} {...rest} />
    );

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    };

    render() {
        const { onChange: _, ...rest } = this.props;
        return <ChakraInput {...rest} onChange={this.onChange} />;
    }
}
