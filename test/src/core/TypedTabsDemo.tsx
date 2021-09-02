import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { TypedTabs, TypedTabMap } from '@iamyth/web-ui/core/TypedTabs';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { withUncontrolledInitialTabs } from '../util/withUncontrolledInitialTabs';

type Tab = 'A' | 'B' | 'C';

const UncontrolledTypedTabs = withUncontrolledInitialTabs(TypedTabs);

export const TypedTabPage = React.memo(() => {
    const tabs: TypedTabMap<Tab> = {
        A: {
            title: 'Title A',
            content: <p>Paragraph A</p>,
        },
        B: {
            title: 'Title B',
            content: <p>Paragraph B</p>,
        },
        C: {
            title: 'Title C',
            content: <p>Paragraph C</p>,
        },
    };

    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [<UncontrolledTypedTabs tabs={tabs} initialValue={'A'} />],
        },
        {
            title: 'Variant - Line',
            components: [<UncontrolledTypedTabs variant="line" tabs={tabs} initialValue={'A'} />],
        },
        {
            title: 'Variant - Enclosed-colored',
            components: [<UncontrolledTypedTabs variant="enclosed-colored" tabs={tabs} initialValue={'A'} />],
        },
        {
            title: 'Variant - Soft-rounded',
            components: [<UncontrolledTypedTabs variant="soft-rounded" tabs={tabs} initialValue={'A'} />],
        },
        {
            title: 'Variant - Solid-rounded',
            components: [<UncontrolledTypedTabs variant="solid-rounded" tabs={tabs} initialValue={'A'} />],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
