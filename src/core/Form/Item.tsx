import React from 'react';
import { FormControl, FormLabel, FormHelperText, Flex } from '@chakra-ui/react';
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
    labelRef: React.RefObject<HTMLLabelElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            errorMessage: null,
        };
        this.labelRef = React.createRef<HTMLLabelElement>();
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
        const isInline = this.context.layout === 'inline';
        const isVertical = this.context.layout === 'vertical';
        const isHorizontal = this.context.layout === 'horizontal';

        return (
            <FormControl mr={isInline ? 4 : undefined} mb={2}>
                <Flex alignItems={isVertical ? undefined : 'center'} flexDirection={isVertical ? 'column' : 'row'}>
                    <FormLabel whiteSpace="nowrap" ref={this.labelRef}>
                        {label}
                    </FormLabel>
                    {children}
                </Flex>
                {placeholder && (
                    <FormHelperText
                        pl={isHorizontal ? 3 : undefined}
                        ml={isHorizontal ? `${this.labelRef?.current?.scrollWidth}px` : undefined}
                    >
                        {placeholder}
                    </FormHelperText>
                )}
                {errorMessage && (
                    <FormHelperText
                        pl={isHorizontal ? 3 : undefined}
                        color="red.500"
                        ml={isHorizontal ? `${this.labelRef?.current?.scrollWidth}px` : undefined}
                    >
                        {errorMessage}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
}
