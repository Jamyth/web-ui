import React from 'react';
import { Grid, GridItem, Flex } from '@chakra-ui/react';
import { DatePickerUtil, CALENDAR_MONTHS } from '../../../internal/DatePickerUtil';
import { RenderType } from '../type';
import { i18n } from '../../../internal/i18n/core';
import { LocaleUtil } from '../../../util/LocaleUtil';

export interface Props {
    renderType: Exclude<RenderType, 'date'>;
    renderingDate: Date;
    onRenderingDateChange: (renderingDate: Date) => void;
    onRenderTypeChange: (renderingType: RenderType) => void;
}

export const OtherSelector = React.memo(
    ({ renderType, renderingDate, onRenderingDateChange, onRenderTypeChange }: Props) => {
        const t = i18n();

        const onClick = (rawValue: number) => {
            const date = renderingDate.getDate();
            let value: Date;
            switch (renderType) {
                case 'month': {
                    const year = renderingDate.getFullYear();
                    value = DatePickerUtil.toDate([
                        `${year}`,
                        DatePickerUtil.zeroPad(rawValue + 1, 2),
                        DatePickerUtil.zeroPad(date, 2),
                    ]);
                    onRenderTypeChange('date');
                    break;
                }
                case 'decade':
                case 'year': {
                    const isYear = renderType === 'year';
                    const month = renderingDate.getMonth() + 1;
                    const range = DatePickerUtil.getYearRange(renderingDate, isYear ? 10 : 100);
                    const year = range[rawValue];
                    value = DatePickerUtil.toDate([
                        `${year}`,
                        DatePickerUtil.zeroPad(month, 2),
                        DatePickerUtil.zeroPad(date, 2),
                    ]);
                    onRenderTypeChange(isYear ? 'month' : 'year');
                    break;
                }
            }

            onRenderingDateChange(value);
        };

        const renderCells = React.useCallback(
            (_: any, index: number) => {
                let value: string | number;
                let isActive = false;
                const inRange = index !== 0 && index !== 11;

                if (renderType === 'month') {
                    const months = Object.values(DatePickerUtil.CALENDAR_MONTHS);
                    isActive = renderingDate.getMonth() === index;

                    value = t.month[months[index] as keyof CALENDAR_MONTHS];
                    if (LocaleUtil.current() === 'en') {
                        value = value.substr(0, 3);
                    }
                } else {
                    const isDecade = renderType === 'decade';
                    const range = DatePickerUtil.getYearRange(renderingDate, isDecade ? 100 : 10);
                    const year = renderingDate.getFullYear();
                    const min = range[index];
                    const max = min + 9;
                    if (isDecade) {
                        value = `${min}-${max}`;
                        isActive = year >= min && year <= max;
                    } else {
                        value = min;
                        isActive = year === min;
                    }
                }

                return (
                    <GridItem
                        className="g-date-picker"
                        borderWidth="1px"
                        borderColor={isActive ? 'blue.400' : 'transparent'}
                        backgroundColor={isActive ? 'blue.400' : undefined}
                        color={isActive ? 'white' : renderType !== 'month' && !inRange ? 'gray.500' : undefined}
                        borderRadius="5px"
                        key={index}
                        onClick={() => onClick(index)}
                        cursor="pointer"
                        transition="background-color 0.15s ease-in-out"
                        _hover={{
                            backgroundColor: isActive ? undefined : 'rgba(0,0,0,0.15)',
                        }}
                        userSelect="none"
                    >
                        <Flex alignItems="center" justifyContent="center" whiteSpace="nowrap">
                            {value}
                        </Flex>
                    </GridItem>
                );
            },
            [renderType, renderingDate],
        );

        return (
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                {[...new Array(12)].map(renderCells)}
            </Grid>
        );
    },
);
