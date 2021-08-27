import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { Modal } from '@iamyth/web-ui/core/Modal';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { withUncontrolledModal } from '../util/withUncontrolledModal';
import { ModalUtil } from '@iamyth/web-ui/util/ModalUtil';
import { Button } from '@iamyth/web-ui/core/Button';

const UncontrolledModal = withUncontrolledModal(Modal);

export const ModalPage = React.memo(() => {
    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [<UncontrolledModal initialValue={false}>Hello</UncontrolledModal>],
        },
        {
            title: 'Hide Close Button',
            components: [
                <UncontrolledModal showCloseButton={false} initialValue={false}>
                    Hello
                </UncontrolledModal>,
            ],
        },
        {
            title: 'Nested Modal',
            components: [
                <UncontrolledModal initialValue={false}>
                    <UncontrolledModal buttonText="Open Nested" nested initialValue={false}>
                        <UncontrolledModal buttonText="Open Nested 1" nested initialValue={false}>
                            <UncontrolledModal buttonText="Open Nested 2" isCentered nested initialValue={false}>
                                Nested
                            </UncontrolledModal>
                        </UncontrolledModal>
                    </UncontrolledModal>
                </UncontrolledModal>,
            ],
        },
        {
            title: 'Imperative Call Async',
            components: [
                <Button
                    onClick={async () => {
                        await ModalUtil.createAsync({
                            body: 'hello',
                        });
                        await ModalUtil.createAsync({
                            body: 'hello 2',
                        });
                        await ModalUtil.createAsync({
                            body: 'hello 3',
                        });
                    }}
                >
                    Open
                </Button>,
            ],
        },
        {
            title: 'Imperative Call Without Close Button',
            components: [
                <Button
                    onClick={async () => {
                        await ModalUtil.createAsync({
                            body: 'hello',
                            closable: false,
                            title: 'This is title',
                        });
                    }}
                >
                    Open
                </Button>,
            ],
        },
        {
            title: 'Imperative Call -- Confirm',
            components: [
                <Button
                    onClick={async () => {
                        const exitType = await ModalUtil.confirm('Confirm me');
                        ModalUtil.confirm(`Exit Type: ${exitType}`);
                    }}
                >
                    Open
                </Button>,
            ],
        },
        {
            title: 'Imperative Call Sync',
            components: [
                <Button
                    onClick={async () => {
                        ModalUtil.createSync({
                            body: 'hello',
                        });
                        ModalUtil.createSync({
                            body: 'hello 2',
                        });
                        ModalUtil.createSync({
                            body: <Button onClick={ModalUtil.destroyAll}>Close All Modal</Button>,
                        });
                    }}
                >
                    Open
                </Button>,
            ],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
