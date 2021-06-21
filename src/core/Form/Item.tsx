import React from 'react';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import type { SafeReactChild } from '../../type';
import { FormValidationContext } from './context';

export type FormValidator = () => string | null | Promise<string | null>;

interface Props {
    children: SafeReactChild;
    label?: SafeReactChild;
    placeholder?: string;
    validator?: FormValidator;
}

interface State {
    errorMessage: string | null;
}

export class Item extends React.PureComponent<Props, State> {
    static contextType = FormValidationContext;
    declare context: React.ContextType<typeof FormValidationContext>;

    constructor(props: Props) {
        super(props);
        this.state = {
            errorMessage: null,
        };
    }

    componentDidMount() {
        this.context.registerValidator(this.validate);
    }

    componentWillUnmount() {
        this.context.unregisterValidator(this.validate);
    }

    validate = async (): Promise<boolean> => {
        const { validator } = this.props;
        if (validator) {
            const errorMessage = await validator();
            this.setState({ errorMessage });
            return errorMessage === null;
        } else {
            return true;
        }
    };

    render() {
        const { label, children, placeholder } = this.props;
        const { errorMessage } = this.state;

        return (
            <FormControl mb={2}>
                <FormLabel>{label}</FormLabel>
                {children}
                {placeholder && <FormHelperText>{placeholder}</FormHelperText>}
                {errorMessage && <FormHelperText color="red.500">{errorMessage}</FormHelperText>}
            </FormControl>
        );
    }
}
