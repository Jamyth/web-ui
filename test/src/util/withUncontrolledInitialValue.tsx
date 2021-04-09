import React from 'react';
import type { ControlledInput } from '@iamyth/web-ui/type';

type ExtractValueType<F extends ControlledInput<any>> = F['value'] extends infer V ? V : never;

export const withUncontrolledInitialValue = <T extends ControlledInput<any>>(
    WrappedComponent: React.ComponentType<T>,
) => {
    const Injected = ({
        initialValue,
        ...rest
    }: Omit<T, keyof ControlledInput<ExtractValueType<T>>> & { initialValue: ExtractValueType<T> }) => {
        const [value, setValue] = React.useState(initialValue);
        return <WrappedComponent {...((rest as unknown) as T)} value={value} onChange={setValue} />;
    };

    return Injected;
};
