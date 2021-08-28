import React from 'react';

export interface FormValidationContextType {
    layout: 'horizontal' | 'vertical' | 'inline';
    registerValidator: (validator: () => Promise<boolean>) => void;
    unregisterValidator: (validator: () => Promise<boolean>) => void;
}

export const FormValidationContext = React.createContext<FormValidationContextType>({
    layout: 'vertical',
    registerValidator: () => {},
    unregisterValidator: () => {},
});
