import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { Modal } from '@iamyth/web-ui/core/Modal';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { withUncontrolledModal } from '../util/withUncontrolledModal';

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
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
