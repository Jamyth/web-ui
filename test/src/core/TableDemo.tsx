import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { Table } from '@iamyth/web-ui/core/Table';
import type { TableColumns } from '@iamyth/web-ui/core/Table';

interface RowItem {
    name: string;
    age: number;
    sex: 'male' | 'female';
}

export const TablePage = React.memo(() => {
    const dataSource: RowItem[] = [
        {
            name: 'Jamyth',
            age: 21,
            sex: 'male',
        },
        {
            name: 'Jenny',
            age: 21,
            sex: 'female',
        },
    ];

    const columns: TableColumns<RowItem> = [
        {
            title: 'Name',
            renderData: (_) => _.name,
        },
        {
            title: 'Age',
            align: 'right',
            renderData: (_) => _.age,
        },
        {
            title: 'Sex',
            renderData: (_) => _.sex,
        },
    ];

    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [
                <Table columns={columns} dataSource={dataSource} rowKey="name" />,
                ' ',
                <Table columns={columns} dataSource={[]} rowKey="name" />,
                ' ',
                <Table columns={columns} dataSource={[]} emptyText="Custom Empty Text" rowKey="name" />,
            ],
        },
        {
            title: 'Full Size',
            fullWidth: true,
            components: [<Table columns={columns} dataSource={dataSource} rowKey="name" />],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
