import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { Drawer } from '@iamyth/web-ui/core/Drawer';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { withUncontrolledModal } from '../util/withUncontrolledModal';

const UncontrolledDrawer = withUncontrolledModal(Drawer);

export const DrawerPage = React.memo(() => {
    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [<UncontrolledDrawer initialValue={false}>Hello</UncontrolledDrawer>],
        },
        {
            title: 'Hide Close Button',
            components: [
                <UncontrolledDrawer showDrawerCloseButton={false} initialValue={false}>
                    Hello
                </UncontrolledDrawer>,
            ],
        },
        {
            title: 'With Placement',
            components: [
                <UncontrolledDrawer buttonText="Top" placement="top" initialValue={false}>
                    Top
                </UncontrolledDrawer>,
                ' ',
                <UncontrolledDrawer buttonText="Left" placement="left" initialValue={false}>
                    Left
                </UncontrolledDrawer>,
                ' ',
                <UncontrolledDrawer buttonText="Bottom" placement="bottom" initialValue={false}>
                    Bottom
                </UncontrolledDrawer>,
                ' ',
                <UncontrolledDrawer buttonText="RIght" placement="right" initialValue={false}>
                    Right
                </UncontrolledDrawer>,
            ],
        },
        {
            title: 'Nested Drawer',
            components: [
                <UncontrolledDrawer placement="left" initialValue={false}>
                    <UncontrolledDrawer buttonText="Open Nested" nested placement="right" initialValue={false}>
                        <UncontrolledDrawer buttonText="Open Nested 1" nested placement="top" initialValue={false}>
                            <UncontrolledDrawer
                                buttonText="Open Nested 2"
                                nested
                                placement="bottom"
                                initialValue={false}
                            >
                                Nested
                            </UncontrolledDrawer>
                        </UncontrolledDrawer>
                    </UncontrolledDrawer>
                </UncontrolledDrawer>,
            ],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
