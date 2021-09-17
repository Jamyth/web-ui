import React from 'react';
import { RenderType } from '../type';
import type { ControlledInput } from '../../../type';
import { Flex } from '@chakra-ui/layout';
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Button, ButtonProps } from '@chakra-ui/button';
import { DatePickerUtil } from '../../../internal/DatePickerUtil';
import { Space } from '../../Space';

export interface Props extends ControlledInput<Date> {
    renderType: RenderType;
    onRenderTypeChange: (renderType: RenderType) => void;
}

const baseButtonProps: ButtonProps = {
    variant: 'link',
    minW: '1rem',
    css: {
        '&:hover': {
            textDecoration: 'none',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    },
};

const buttonProps: ButtonProps = {
    ...baseButtonProps,
    css: {
        '&:hover': {
            color: '#000',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    },
};

const activeButtonProps: ButtonProps = {
    ...baseButtonProps,
    css: {
        color: '#000',
        '&:hover': {
            color: '#4299E1',
            textDecoration: 'none',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    },
};

export const Header = React.memo(({ value, onChange, renderType, onRenderTypeChange }: Props) => {
    const onFastBackward = () => {
        switch (renderType) {
            case 'date':
            case 'month':
                return onChange(new Date(value.getFullYear() - 1, value.getMonth()));
            case 'year':
                return onChange(new Date(value.getFullYear() - 10, value.getMonth()));
            case 'decade':
                return onChange(new Date(value.getFullYear() - 100, value.getMonth()));
        }
    };
    const onBackward = () => {
        const { month, year } = DatePickerUtil.getPreviousMonth(value.getMonth(), value.getFullYear());
        const date = new Date(year, month);
        console.info(date.toDateString());
        onChange(date);
    };

    const onFastForward = () => {
        switch (renderType) {
            case 'date':
            case 'month':
                return onChange(new Date(value.getFullYear() + 1, value.getMonth()));
            case 'year':
                return onChange(new Date(value.getFullYear() + 10, value.getMonth()));
            case 'decade':
                return onChange(new Date(value.getFullYear() + 100, value.getMonth()));
        }
    };
    const onForward = () => {
        const { month, year } = DatePickerUtil.getNextMonth(value.getMonth(), value.getFullYear());
        onChange(new Date(year, month));
    };

    const getYears = (multiplier: 10 | 100) => {
        const year = Math.floor(value.getFullYear() / multiplier) * multiplier;
        return `${year} - ${year + (multiplier === 10 ? 9 : 99)}`;
    };

    const renderHeader = () => {
        switch (renderType) {
            case 'date':
                return (
                    <Flex alignItems="center">
                        <Button
                            className="g-date-picker"
                            {...activeButtonProps}
                            onClick={() => onRenderTypeChange('month')}
                        >
                            {DatePickerUtil.zeroPad(value.getMonth() + 1, 2)}
                        </Button>
                        <Space space="5px" />
                        <Button
                            {...activeButtonProps}
                            // element.closest somehow cannot search upward while the element is not the first child
                            className="g-date-picker"
                            onClick={() => onRenderTypeChange('year')}
                        >
                            {value.getFullYear()}
                        </Button>
                    </Flex>
                );
            case 'month':
                return (
                    <Flex alignItems="center">
                        <Button {...activeButtonProps} onClick={() => onRenderTypeChange('year')}>
                            {value.getFullYear()}
                        </Button>
                    </Flex>
                );
            case 'year':
                return (
                    <Flex alignItems="center">
                        <Button {...activeButtonProps} onClick={() => onRenderTypeChange('decade')}>
                            {getYears(10)}
                        </Button>
                    </Flex>
                );
            case 'decade':
                return (
                    <Flex alignItems="center">
                        <Button {...baseButtonProps} color="#4299E1">
                            {getYears(100)}
                        </Button>
                    </Flex>
                );
        }
    };

    return (
        <Flex
            py={3}
            justifyContent="center"
            borderBottomWidth="1px"
            alignItems="center"
            position="relative"
            minW="240px"
            w="100%"
        >
            <Flex alignItems="center" position="absolute" top="50%" transform="translateY(-50%)" left={3}>
                <Button {...buttonProps} onClick={onFastBackward}>
                    <BsChevronDoubleLeft />
                </Button>
                {renderType === 'date' && (
                    <Button {...buttonProps} onClick={onBackward}>
                        <BsChevronLeft />
                    </Button>
                )}
            </Flex>
            {renderHeader()}
            <Flex alignItems="center" position="absolute" top="50%" transform="translateY(-50%)" right={3}>
                {renderType === 'date' && (
                    <Button {...buttonProps} onClick={onForward}>
                        <BsChevronRight />
                    </Button>
                )}
                <Button {...buttonProps} onClick={onFastForward}>
                    <BsChevronDoubleRight />
                </Button>
            </Flex>
        </Flex>
    );
});
