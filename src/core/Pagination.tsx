import { Box, Flex, HStack } from '@chakra-ui/layout';
import React from 'react';
import { SafeReactChild } from '../type';
import { Button } from './Button';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { Select } from '@chakra-ui/select';
import { TextUtil } from '../internal/TextUtil';
import { i18n } from '../internal/i18n/core';

interface Props {
    onSizeChange: (pageIndex: number, pageSize: number) => void;
    onPageChange: (pageIndex: number) => void;
    totalPage: number;
    totalCount: number;
    pageIndex: number;
    pageSize: number;
}

export class Pagination extends React.PureComponent<Props> {
    static PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
    static readonly BUFFER_SIZE = 1;

    renderRecords = () => {
        const { totalCount, pageIndex, totalPage } = this.props;
        const t = i18n();
        return (
            <Flex>
                {TextUtil.interpolate(
                    t.paginationSummary,
                    totalCount.toString(),
                    pageIndex.toString(),
                    totalPage.toString(),
                )}
            </Flex>
        );
    };

    renderButtons = () => {
        const { pageIndex, totalPage, pageSize, onSizeChange, onPageChange } = this.props;
        const range: SafeReactChild[] = [];
        const t = i18n();

        let left = Math.max(1, pageIndex - Pagination.BUFFER_SIZE);
        let right = Math.min(pageIndex + Pagination.BUFFER_SIZE, totalPage);

        if (pageIndex - 1 <= Pagination.BUFFER_SIZE) {
            right = Math.min(right + Pagination.BUFFER_SIZE, totalPage);
        }
        if (totalPage - pageIndex <= Pagination.BUFFER_SIZE) {
            left = Math.max(left - Pagination.BUFFER_SIZE, 1);
        }

        for (let i = left; i <= right; i++) {
            const active = pageIndex === i;
            range.push(
                <Button disabled={active} onClick={() => onPageChange(i)}>
                    {i}
                </Button>,
            );
        }

        return (
            <HStack flexWrap="wrap" alignItems="center">
                <Button disabled={pageIndex === 1} onClick={() => onPageChange(pageIndex - 1)}>
                    <GrPrevious />
                </Button>
                {left !== 1 && (
                    <Button disabled={pageIndex === 1} onClick={() => onPageChange(1)}>
                        {1}
                    </Button>
                )}
                {left > 2 && <Button disabled>...</Button>}
                {range}
                {right < totalPage - 1 && <Button disabled>...</Button>}
                {totalPage > 5 && totalPage > right && (
                    <Button onClick={() => onPageChange(totalPage)}>{totalPage}</Button>
                )}
                <Button disabled={pageIndex === totalPage} onClick={() => onPageChange(pageIndex + 1)}>
                    <GrNext />
                </Button>
                <Box>
                    <Select value={pageSize} onChange={(e) => onSizeChange(1, Number(e.target.value))}>
                        {Pagination.PAGE_SIZE_OPTIONS.map((_) => (
                            <option value={_} key={_}>
                                {_} / {t.page}
                            </option>
                        ))}
                    </Select>
                </Box>
            </HStack>
        );
    };

    render() {
        return (
            <Flex my={4} alignItems="center" flexWrap="wrap" justifyContent="space-between">
                {this.renderRecords()}
                {this.renderButtons()}
            </Flex>
        );
    }
}
