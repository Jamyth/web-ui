import React from 'react';
import type { TypedTabMap, Props } from '@iamyth/web-ui/core/TypedTabs';

type TabProps<T extends string> = {
    activeKey: T;
    onChange: (tab: T) => void;
};

type ExtractValueType<F extends TabProps<any>> = F['activeKey'] extends infer V ? V : never;

export const withUncontrolledInitialTabs = <T extends TabProps<any>>(WrappedComponent: React.ComponentType<T>) => {
    const Injected = ({
        initialValue,
        ...rest
    }: Omit<T, keyof TabProps<any>> & { initialValue: ExtractValueType<T> }) => {
        const [value, setValue] = React.useState(initialValue);
        return <WrappedComponent {...(rest as unknown as T)} value={value} onChange={setValue} />;
    };

    return Injected;
};
