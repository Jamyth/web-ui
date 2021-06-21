import React from 'react';
import type { ControlledInput } from '../../type';
import type { StackDirection } from '@chakra-ui/react';
import { Stack, CheckboxGroup, Checkbox } from '@chakra-ui/react';

export interface Props<Enum extends string | number> extends ControlledInput<Enum[]> {
    list: Enum[];
    translator?: (option: Enum) => string | number;
    direction?: StackDirection;
}

export class EnumCheckbox<Enum extends string | number> extends React.PureComponent<Props<Enum>> {
    render() {
        const { list, translator = (_) => _, direction = 'row', value, onChange } = this.props;
        return (
            <CheckboxGroup value={value} onChange={(val) => onChange(val as Enum[])}>
                <Stack direction={direction}>
                    {list.map((val, i) => (
                        <Checkbox value={val} key={val}>
                            {translator(val)}
                        </Checkbox>
                    ))}
                </Stack>
            </CheckboxGroup>
        );
    }
}
