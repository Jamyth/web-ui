import React from 'react';
import type { SafeReactChildren, StringKey } from '../type';
import { Table as ChakraTable, Th, Tr, Thead, Tbody, Td, Box } from '@chakra-ui/react';
import { AiOutlineFileExclamation } from 'react-icons/ai';
import { Flex } from '@chakra-ui/layout';

export interface TableColumn<RowType extends object> {
    title: React.ReactElement | React.ReactChild;
    renderData: (record: RowType, index: number) => SafeReactChildren | undefined;
    align?: 'left' | 'right' | 'center';
    colSpan?: number;
    className?: string;
    fixed?: 'left' | 'right';
    display?: 'default' | 'hidden';
}

export type TableColumns<RowType extends object> = TableColumn<RowType>[];

export interface TableProps<RowType extends object> {
    columns: TableColumns<RowType>;
    dataSource: RowType[];
    rowKey: StringKey<RowType> | ((record: RowType, index?: number) => string) | 'index';
    loading?: boolean;
    emptyText?: string;
}

export class Table<RowType extends object> extends React.PureComponent<TableProps<RowType>> {
    rowKeyByIndex = (record: RowType) => this.props.dataSource.indexOf(record);

    renderHeader = (column: TableColumn<RowType>, index: number) => {
        return (
            <Th key={index} textAlign={column.align ?? 'left'}>
                {column.title}
            </Th>
        );
    };

    renderTd = (record: RowType) => (column: TableColumn<RowType>, index: number) => {
        const isSticky = column.fixed ? 'sticky' : undefined;
        const style = column.fixed ? { [column.fixed]: 0 } : {};
        return (
            <Td position={isSticky} {...style} textAlign={column.align}>
                {column.renderData(record, index)}
            </Td>
        );
    };

    renderRow = (record: RowType, index: number) => {
        const rowKey = this.props.rowKey;
        const key =
            rowKey === 'index'
                ? this.rowKeyByIndex(record)
                : typeof rowKey === 'function'
                ? rowKey(record, index)
                : rowKey;
        const columns = this.props.columns;
        return <Tr key={key as any}>{columns.map(this.renderTd(record))}</Tr>;
    };

    render() {
        const { loading, columns, emptyText, dataSource } = this.props;

        const emptyTextNode = loading ? (
            <Box />
        ) : (
            <Tr>
                <Td colSpan={columns.length}>
                    <Flex alignItems="center" py="50px" justifyContent="center">
                        <AiOutlineFileExclamation fontSize="28px" />
                        <Box as="h2" ml={2}>
                            {emptyText ?? '沒有數據'}
                        </Box>
                    </Flex>
                </Td>
            </Tr>
        );

        return (
            <ChakraTable>
                <Thead>
                    <Tr>{columns.map(this.renderHeader)}</Tr>
                </Thead>
                <Tbody>{dataSource.length ? dataSource.map(this.renderRow) : emptyTextNode}</Tbody>
            </ChakraTable>
        );
    }
}
