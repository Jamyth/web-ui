import React from 'react';
import { ButtonGroup } from '@chakra-ui/button';
import type { SafeReactChildren } from '../../type';
import { Button } from '../Button';
import type { FormValidationContextType } from './context';
import { FormValidationContext } from './context';
import { Item } from './Item';
import { Flex } from '@chakra-ui/react';
import type { Props as ButtonProps } from '../Button';
import { SafeReactChild } from '../../type';
import { i18n } from '../../internal/i18n/core';

interface ExtraButtonProps {
    btnText: string | SafeReactChild;
    colorScheme?: ButtonProps['colorScheme'];
    disabled?: boolean;
    variant?: ButtonProps['variant'];
    onClick?: () => {};
}

export interface Props {
    children: SafeReactChildren;
    onFinish: () => void;
    onReset?: () => void;
    layout?: 'horizontal' | 'vertical' | 'inline';
    className?: string;
    id?: string;
    onValidationStatusChange?: (isValidating: boolean) => void;
    loading?: boolean;
    submitText?: string;
    submitButtonPosition?: 'left' | 'right' | 'center';
    extraButtons?: ExtraButtonProps[];
}

export class Form extends React.PureComponent<Props> {
    static Item = Item;

    private readonly validationContext: FormValidationContextType;
    private validators: (() => Promise<boolean>)[] = [];

    constructor(props: Props) {
        super(props);
        this.validationContext = {
            layout: props.layout ?? 'vertical',
            registerValidator: (validator) => this.validators.push(validator),
            unregisterValidator: (validator) => {
                const index = this.validators.indexOf(validator);
                if (index >= 0) {
                    this.validators.splice(index, 1);
                }
            },
        };
    }

    triggerSubmit = async () => {
        const { onFinish, onValidationStatusChange } = this.props;
        try {
            onValidationStatusChange?.(true);
            const validatorResults = await Promise.all(this.validators.map((_) => _()));
            if (validatorResults.every((_) => _)) {
                onFinish();
                return true;
            }
            return false;
        } catch (error) {
            onValidationStatusChange?.(false);
        }
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        this.triggerSubmit();
    };

    getJustifyContent = (): string | undefined => {
        const submitButtonPosition = this.props.submitButtonPosition;
        switch (submitButtonPosition) {
            case 'left':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';
        }
    };

    render() {
        const { id, children, loading, submitText, layout = 'vertical', extraButtons, onReset } = this.props;
        const t = i18n();
        return (
            <Flex as="form" id={id} onSubmit={this.onSubmit as any}>
                <FormValidationContext.Provider value={this.validationContext}>
                    <Flex w="100%" flexWrap="wrap" flexDirection={layout === 'vertical' ? 'column' : 'row'}>
                        {children}
                        <ButtonGroup
                            mt={layout === 'vertical' ? 2 : undefined}
                            w={layout === 'inline' ? undefined : '100%'}
                            justifyContent={this.getJustifyContent()}
                        >
                            <Button type="submit" colorScheme="blue" isLoading={loading}>
                                {submitText ?? t.submit}
                            </Button>
                            {onReset && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    colorScheme="blue"
                                    onClick={onReset}
                                    isLoading={loading}
                                >
                                    {t.reset}
                                </Button>
                            )}
                            {extraButtons?.map(
                                ({ btnText, variant = 'outline', colorScheme = 'blue', ...props }, i) => (
                                    <Button {...props} variant={variant} colorScheme={colorScheme} key={i}>
                                        {btnText}
                                    </Button>
                                ),
                            )}
                        </ButtonGroup>
                    </Flex>
                </FormValidationContext.Provider>
            </Flex>
        );
    }
}
