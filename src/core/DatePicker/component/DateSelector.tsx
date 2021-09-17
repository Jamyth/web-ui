import { Grid, GridItem, Flex } from '@chakra-ui/react';
import React from 'react';
import { ControlledInput } from '../../../type';
import { DatePickerUtil, WEEK_DAYS } from '../../../internal/DatePickerUtil';
import { RenderType } from '../type';
import { i18n } from '../../../internal/i18n/core';
import { LocaleUtil } from '../../../util/LocaleUtil';

export interface Props extends ControlledInput<Date> {
    renderingDate: Date;
    onRenderingDateChange: (renderingDate: Date) => void;
    onRenderTypeChange: (renderingType: RenderType) => void;
    range?: [Date, Date];
    disabled?: ((date: Date) => boolean) | boolean;
}

export const DateSelector = React.memo(
    ({ value, onChange, renderingDate, onRenderingDateChange, onRenderTypeChange, range, disabled = false }: Props) => {
        const t = i18n();
        const dates = React.useMemo(
            () => DatePickerUtil.init(renderingDate.getMonth(), renderingDate.getFullYear()),
            [renderingDate],
        );

        const onDateChange = (date: Date) => {
            onRenderTypeChange('date');
            onChange(date);
            onRenderingDateChange(date);
        };

        const renderWeekDay = React.useCallback(() => {
            const days = Object.values(DatePickerUtil.WEEK_DAYS);
            return [...new Array(7)].map((_, i) => {
                let translate = t.days[days[i] as keyof WEEK_DAYS];
                if (LocaleUtil.current() === 'zh') {
                    translate = translate[2];
                } else {
                    translate = translate.substr(0, 3).toUpperCase();
                }
                return (
                    <GridItem key={i}>
                        <Flex
                            justifyContent="center"
                            color="gray.600"
                            fontWeight="medium"
                            fontSize="sm"
                            alignItems="center"
                            userSelect="none"
                        >
                            {translate}
                        </Flex>
                    </GridItem>
                );
            });
        }, []);

        const renderDate = (dateArray: [string, string, string], i: number) => {
            const date = DatePickerUtil.toDate(dateArray, true);
            const isToday = DatePickerUtil.isToday(date);
            const isSelected = DatePickerUtil.isSameDay(value, date);
            const isInThisMonth = DatePickerUtil.isSameMonth(date, renderingDate);
            const isInRange = Array.isArray(range)
                ? date.getTime() >= range[0].getTime() || date.getTime() <= range[1].getTime()
                : true;
            const isDisabled = !isInRange || typeof disabled === 'boolean' ? disabled : disabled(date);

            return (
                <GridItem
                    className="g-date-picker"
                    borderWidth="1px"
                    borderColor={isSelected ? 'blue.400' : 'transparent'}
                    backgroundColor={isSelected ? 'blue.400' : isDisabled ? 'rgba(0,0,0,0.15)' : undefined}
                    borderRadius="5px"
                    color={
                        isDisabled
                            ? 'gray.400'
                            : isSelected
                            ? 'white'
                            : isToday
                            ? 'blue.400'
                            : !isInThisMonth
                            ? 'gray.500'
                            : undefined
                    }
                    key={i}
                    onClick={() => !isDisabled && onDateChange(date)}
                    cursor={isDisabled ? 'not-allowed' : 'pointer'}
                    transition="background-color 0.15s ease-in-out"
                    _hover={{
                        backgroundColor: isSelected || isDisabled ? undefined : 'rgba(0,0,0,0.15)',
                    }}
                    userSelect="none"
                >
                    <Flex w="25px" h="25px" justifyContent="center" alignItems="center">
                        {dateArray[2]}
                    </Flex>
                </GridItem>
            );
        };

        return (
            <Grid templateColumns="repeat(7, 1fr)" gap={2}>
                {renderWeekDay()}
                {dates.map(renderDate)}
            </Grid>
        );
    },
);
