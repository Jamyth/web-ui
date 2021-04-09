import React from 'react';

export type SafeReactChild = React.ReactChild | boolean | null;
export type SafeReactChildren = SafeReactChild | SafeReactChild[];

export interface ControlledInput<T> {
    value: T;
    onChange: (value: T) => void;
}
