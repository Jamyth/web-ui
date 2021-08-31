import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { Input } from '@iamyth/web-ui/core/Input';
import { withUncontrolledInitialValue } from '../util/withUncontrolledInitialValue';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { Switch } from '@iamyth/web-ui/core/Switch';
import { RichTextEditor } from '@iamyth/web-ui/core/RichTextEditor';
import { EnumSelect } from '@iamyth/web-ui/core/EnumSelect';

const DefaultInput = withUncontrolledInitialValue(Input);
const ReadonlyInput = withUncontrolledInitialValue(Input.Readonly);
const NullableInput = withUncontrolledInitialValue(Input.Nullable);
const PasswordInput = withUncontrolledInitialValue(Input.Password);
const TextareaInput = withUncontrolledInitialValue(Input.Textarea);
const DefaultSwitch = withUncontrolledInitialValue(Switch);
const DefaultEditor = withUncontrolledInitialValue(RichTextEditor);
const DefaultEnumSelect = withUncontrolledInitialValue(EnumSelect);
const NullableEnumSelect = withUncontrolledInitialValue(EnumSelect.Nullable);
const InitialNullableEnumSelect = withUncontrolledInitialValue(EnumSelect.InitialNullable);

export const InputPage = React.memo(() => {
    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [<DefaultInput initialValue="" />],
        },
        {
            title: 'Basic Switch',
            components: [<DefaultSwitch initialValue={true} />],
        },
        {
            title: 'Basic Editor',
            components: [<DefaultEditor method="POST" uploadURL="test" formDataFields={{}} initialValue={''} />],
        },
        {
            title: 'Default Enum Select',
            components: [<DefaultEnumSelect initialValue={1} list={[1, 2, 3, 4, 5]} />],
        },
        {
            title: 'Nullable Enum Select',
            components: [<NullableEnumSelect initialValue={null} list={[1, 2, 3, 4, 5]} />],
        },
        {
            title: 'Initial Nullable Enum Select',
            components: [<InitialNullableEnumSelect initialValue={null} list={[1, 2, 3, 4, 5]} />],
        },
        {
            title: 'Readonly',
            components: [<ReadonlyInput initialValue="Readonly" />],
        },
        {
            title: 'Nullable',
            components: [<NullableInput initialValue={null} />],
        },
        {
            title: 'Password',
            components: [<PasswordInput initialValue="" />],
        },
        {
            title: 'Textarea',
            components: [<TextareaInput initialValue="" />],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
