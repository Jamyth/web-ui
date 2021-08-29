import React from 'react';
import { EnumSelect } from '../EnumSelect';
import type { BaseProps } from '../EnumSelect';
import { ControlledInput } from '../../type';
import { i18n } from '../../internal/i18n/core';

type NullType = '@@NULL';

export interface Props<Enum extends string | boolean | number> extends BaseProps<Enum>, ControlledInput<Enum | null> {
    nullText?: React.ReactChild;
    nullPositionIndex?: number;
}

export class Nullable<Enum extends string | boolean | number> extends React.PureComponent<Props<Enum>> {
    private readonly nullValue: NullType = '@@NULL';

    render() {
        const { value, onChange, nullText, nullPositionIndex, list, translator, ...restProps } = this.props;
        const t = i18n();

        const wrappedValue = value === null ? this.nullValue : value;
        const wrappedOnChange = (value: Enum | NullType) => onChange(value === this.nullValue ? null : value);
        const wrappedList: Array<Enum | NullType> = [...list];
        wrappedList.splice(nullPositionIndex || 0, 0, this.nullValue);
        const wrappedTranslator = (value: Enum | NullType) =>
            value === this.nullValue ? nullText ?? t.all : translator ? translator(value) : value.toString();

        return (
            <EnumSelect
                value={wrappedValue}
                onChange={wrappedOnChange}
                list={wrappedList}
                translator={wrappedTranslator}
                {...restProps}
            />
        );
    }
}
