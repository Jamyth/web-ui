import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { Input } from '@iamyth/web-ui/core/Input';
import { withUncontrolledInitialValue } from '../../util/withUncontrolledInitialValue';
import { DemoHelper } from '../../util/DemoHelper';
import type { DemoHelperGroup } from '../../util/DemoHelper';

const DefaultInput = withUncontrolledInitialValue(Input);
const NullableInput = withUncontrolledInitialValue(Input.Nullable);

export const InputPage = React.memo(() => {
    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [<DefaultInput initialValue="" />],
        },
        {
            title: 'Nullable',
            components: [<NullableInput initialValue={null} />],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
