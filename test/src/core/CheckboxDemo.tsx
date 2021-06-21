import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { Checkbox } from '@iamyth/web-ui/core/CheckBox';
import { EnumCheckbox } from '@iamyth/web-ui/core/EnumCheckbox';
import { withUncontrolledInitialValue } from '../util/withUncontrolledInitialValue';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';

const DefaultCheckbox = withUncontrolledInitialValue(Checkbox);
const EnumCheckboxInput = withUncontrolledInitialValue(EnumCheckbox);

export const CheckboxPage = React.memo(() => {
    const enumCheckboxList = ['A', 'B', 'C'];

    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [<DefaultCheckbox initialValue={false}>Checkbox</DefaultCheckbox>],
        },
        {
            title: 'Enum Checkbox',
            components: [<EnumCheckboxInput list={enumCheckboxList} initialValue={['A']} />],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
