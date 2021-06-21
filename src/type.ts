import React from 'react';

export type SafeReactChild = React.ReactChild | boolean | null;
export type SafeReactChildren = SafeReactChild | SafeReactChild[];

export interface ControlledInput<T> {
    value: T;
    onChange: (value: T) => void;
}

export type StringKey<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];
