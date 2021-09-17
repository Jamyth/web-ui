import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { DatePicker } from '@iamyth/web-ui/core/DatePicker';
import { withUncontrolledInitialValue } from '../util/withUncontrolledInitialValue';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';

const DefaultDatePicker = withUncontrolledInitialValue(DatePicker);
const DateRangePicker = withUncontrolledInitialValue(DatePicker.Range);

export const DatePickerPage = React.memo(() => {
    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [<DefaultDatePicker initialValue={new Date()} />],
        },
        {
            title: 'Date Range Picker',
            components: [<DateRangePicker initialValue={[new Date(), new Date()]} />],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
