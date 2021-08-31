import { ControlledInput } from '../../type';
import React from 'react';
import { Select } from '@chakra-ui/react';
import { InitialNullable } from './InitialNullable';
import { Nullable } from './Nullable';
import { Map } from './Map';

export interface BaseProps<Enum extends string | boolean | number> {
    list: readonly Enum[];
    translator?: (enumValue: Enum) => React.ReactChild;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    suffixIcon?: React.ReactElement;
}

export interface Props<Enum extends string | boolean | number> extends BaseProps<Enum>, ControlledInput<Enum> {}

export class EnumSelect<Enum extends string | boolean | number> extends React.PureComponent<Props<Enum>> {
    static InitialNullable = InitialNullable;
    static Nullable = Nullable;
    static Map = Map;

    getValue = () => {
        const value = this.props.value as Enum;

        if (value === null) {
            return undefined;
        }
        return value.toString();
    };

    onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const enumValue = value === 'true' ? true : value === 'false' ? false : value;
        this.props.onChange(enumValue as any);
    };

    render() {
        const { list, translator, disabled, className, style, placeholder, suffixIcon } = this.props;
        return (
            <Select
                disabled={disabled}
                icon={suffixIcon}
                value={this.getValue()}
                className={className}
                style={style}
                placeholder={placeholder}
                onChange={this.onChange}
            >
                {list.map((_) => (
                    <option key={_.toString()} disabled={_ === InitialNullable.nullValue} value={_.toString()}>
                        {translator?.(_) ?? _.toString()}
                    </option>
                ))}
            </Select>
        );
    }
}
