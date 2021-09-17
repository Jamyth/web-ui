import React from 'react';
import { ControlledInput } from '../../../type';
import { RenderType } from '../type';
import { DateSelector } from './DateSelector';
import type { Props as DateSelectorProps } from './DateSelector';
import { OtherSelector } from './OtherSelector';

export interface Props extends ControlledInput<Date> {
    renderType: RenderType;
    onRenderTypeChange: (renderType: RenderType) => void;
    onRenderingDateChange: (date: Date) => void;
    renderingDate: Date;
    range?: DateSelectorProps['range'];
    disableDays?: DateSelectorProps['disabled'];
}

export const Selector = React.memo((props: Props) => {
    if (props.renderType === 'date') {
        return <DateSelector {...props} disabled={props.disableDays} />;
    }

    return <OtherSelector {...props} renderType={props.renderType as Exclude<RenderType, 'date'>} />;
});
