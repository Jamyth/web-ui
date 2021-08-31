import { i18n } from '../../internal/i18n/core';
import React from 'react';
import type { BaseProps } from './index';
import { EnumSelect } from './index';

export type InitialNullableKey = '@@INITIAL_NULLABLE_KEY';

export interface Props<Enum extends string | boolean | number> extends BaseProps<Enum> {
    value: Enum | null;
    onChange: (newValue: Enum) => void;
}

export class InitialNullable<Enum extends string | boolean | number> extends React.PureComponent<Props<Enum>> {
    static readonly nullValue: InitialNullableKey = '@@INITIAL_NULLABLE_KEY';

    render() {
        const { value, list, translator, ...restProps } = this.props;

        const t = i18n();
        const wrappedValue = (value === null ? InitialNullable.nullValue : value) as Enum;
        const wrappedList: Array<Enum | InitialNullableKey> = [InitialNullable.nullValue, ...list];
        const wrappedTranslator = (value: Enum | InitialNullableKey) =>
            value === InitialNullable.nullValue ? t.select : translator ? translator(value) : value.toString();

        return (
            <EnumSelect
                value={wrappedValue}
                list={wrappedList as Enum[]}
                translator={wrappedTranslator}
                {...restProps}
            />
        );
    }
}
