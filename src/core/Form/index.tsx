import React from 'react';
import { ButtonGroup } from '@chakra-ui/button';
import type { SafeReactChildren } from '../../type';
import { Button } from '../Button';
import type { FormValidationContextType } from './context';
import { FormValidationContext } from './context';
import { Item } from './Item';

interface Props {
    children: SafeReactChildren;
    onFinish: () => void;
    className?: string;
    id?: string;
    onValidationStatusChange?: (isValidating: boolean) => void;
    loading?: boolean;
    submitText?: string;
    submitButtonPosition?: 'left' | 'right' | 'center';
}

export class Form extends React.PureComponent<Props> {
    static Item = Item;

    private readonly validationContext: FormValidationContextType;
    private validators: (() => Promise<boolean>)[] = [];

    constructor(props: Props) {
        super(props);
        this.validationContext = {
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
        const { id, children, loading, submitText, submitButtonPosition } = this.props;
        return (
            <form id={id} onSubmit={this.onSubmit}>
                <FormValidationContext.Provider value={this.validationContext}>
                    <div>{children}</div>
                    <ButtonGroup w="100%" justifyContent={this.getJustifyContent()}>
                        <Button type="submit" colorScheme="blue" isLoading={loading}>
                            {submitText ?? '提交'}
                        </Button>
                    </ButtonGroup>
                </FormValidationContext.Provider>
            </form>
        );
    }
}
