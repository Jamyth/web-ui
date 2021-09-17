import React from 'react';
import { ControlledInput } from '../../type';
import { InputWrapper } from './component/InputWrapper';
import { RenderType } from './type';
import { DatePickerUtil } from '../../internal/DatePickerUtil';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from './component/Header';
import { Selector } from './component/Selector';

export interface Props extends ControlledInput<[Date, Date]> {}

export type CurrentInputType = 'from' | 'to';

export const Range = React.memo(({ value, onChange }: Props) => {
    const [renderType, setRenderType] = React.useState<RenderType>('date');
    const [renderingDate, setRenderingDate] = React.useState(value[0]);
    const [from, setFrom] = React.useState(value[0]);
    const [to, setTo] = React.useState(value[1]);
    const [currentInputType, setCurrentInputType] = React.useState<CurrentInputType>('from');

    const toggleCurrentInputType = () => {
        if (currentInputType === 'from') {
            setCurrentInputType('to');
        } else {
            setCurrentInputType('from');
        }
    };

    const onDateChange = (date: Date) => {
        if (currentInputType === 'from') {
            setFrom(date);
            onChange([date, to]);
        } else {
            setTo(date);
            onChange([from, date]);
        }
        toggleCurrentInputType();
    };

    const renderValue = React.useCallback(
        (showPicker: boolean) => {
            const onClick = (currentInputType: CurrentInputType) => () => {
                if (!showPicker) {
                    return;
                }
                setCurrentInputType(currentInputType);
            };

            return (
                <React.Fragment>
                    <Box
                        onClick={onClick('from')}
                        transition="color 0.15s ease-in-out"
                        color={showPicker && currentInputType === 'from' ? 'blue.400' : ''}
                    >
                        {DatePickerUtil.getDateTimeString(from, false)}
                    </Box>
                    <Box mx="1"> ~ </Box>
                    <Box
                        onClick={onClick('to')}
                        transition="color 0.15s ease-in-out"
                        color={showPicker && currentInputType === 'to' ? 'blue.400' : ''}
                    >
                        {DatePickerUtil.getDateTimeString(to, false)}
                    </Box>
                </React.Fragment>
            );
        },
        [from, to, currentInputType],
    );

    const disableDays = (date: Date) => {
        const time = date.getTime();
        if (currentInputType === 'from') {
            return false;
        }
        return time < from.getTime();
    };

    return (
        <InputWrapper
            value={renderValue}
            onPickerClose={() => setCurrentInputType('from')}
            allowToggle={false}
            renderType={renderType}
        >
            <Header
                value={renderingDate}
                onChange={setRenderingDate}
                renderType={renderType}
                onRenderTypeChange={setRenderType}
            />
            <Flex px={3} py={2} borderBottomWith="1" flexDir="column">
                <Selector
                    value={currentInputType === 'from' ? from : to}
                    onChange={onDateChange}
                    renderType={renderType}
                    onRenderTypeChange={setRenderType}
                    onRenderingDateChange={setRenderingDate}
                    renderingDate={renderingDate}
                    disableDays={disableDays}
                />
            </Flex>
        </InputWrapper>
    );
});
