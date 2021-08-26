import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { ToastUtil } from '@iamyth/web-ui/util/ToastUtil';
import { Button } from '@iamyth/web-ui/core/Button';

export const ToastPage = React.memo(() => {
    const onClick = async () => {
        await ToastUtil.createAsync({
            isClosable: true,
            title: 1,
        });
        await ToastUtil.createAsync({
            isClosable: true,
            title: 2,
        });
        await ToastUtil.createAsync({
            isClosable: true,
            title: 3,
        });
        alert('This will appear after the toast close');
    };

    const onClick2 = async () => {
        ToastUtil.createSync({
            isClosable: true,
            title: 1,
        });
        ToastUtil.createSync({
            isClosable: true,
            title: 2,
        });
        ToastUtil.createSync({
            isClosable: true,
            title: 3,
        });
    };

    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic Async',
            components: [<Button onClick={onClick}>Toast me</Button>],
        },
        {
            title: 'Basic Sync',
            components: [<Button onClick={onClick2}>Toast me</Button>],
        },
        {
            title: 'Success | Info | Warning | Error',
            components: [
                <Button onClick={() => ToastUtil.success('yo successsss')}>Success</Button>,
                ' ',
                <Button onClick={() => ToastUtil.info('Info')}>Info</Button>,
                ' ',
                <Button onClick={() => ToastUtil.warning('Warning')}>Warning</Button>,
                ' ',
                <Button onClick={() => ToastUtil.error('Error')}>Error</Button>,
                ' ',
            ],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
