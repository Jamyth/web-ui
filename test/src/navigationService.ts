import type { NavigationService as Props } from '@iamyth/web-ui/admin/AdminApp/type';

import { InputPage } from './core/InputDemo';
import { ButtonPage } from './core/ButtonDemo';
import { CheckboxPage } from './core/CheckboxDemo';
import { FormPage } from './core/FormDemo';
import { TablePage } from './core/TableDemo';
import { DrawerPage } from './core/DrawerDemo';
import { ModalPage } from './core/ModalDemo';
import { ToastPage } from './core/ToastDemo';
import { TypedTabPage } from './core/TypedTabsDemo';
import { DatePickerPage } from './core/DatePickerDemo';

export const NavigationService: Props[] = [
    {
        title: 'Input',
        modules: [
            {
                name: 'Default',
                path: '/input',
                component: InputPage,
            },
            {
                name: 'DatePicker',
                path: '/datepicker',
                component: DatePickerPage,
            },
        ],
    },
    {
        title: 'Button',
        modules: [
            {
                name: 'Default',
                path: '/button',
                component: ButtonPage,
            },
        ],
    },
    {
        title: 'Checkbox',
        modules: [
            {
                name: 'Default',
                path: '/checkbox',
                component: CheckboxPage,
            },
        ],
    },
    {
        title: 'Form',
        modules: [
            {
                name: 'Default',
                path: '/form',
                component: FormPage,
            },
        ],
    },
    {
        title: 'Table',
        modules: [
            {
                name: 'Default',
                path: '/table',
                component: TablePage,
            },
        ],
    },
    {
        title: 'Typed Tabs',
        modules: [
            {
                name: 'Default',
                path: '/typed-tabs',
                routeParameter: '/:tab(a|b)?',
                component: TypedTabPage,
            },
        ],
    },
    {
        title: 'Overlay',
        modules: [
            {
                name: 'Drawer',
                path: '/overlay/drawer',
                component: DrawerPage,
            },
            {
                name: 'Modal',
                path: '/overlay/modal',
                component: ModalPage,
            },
        ],
    },
    {
        title: 'Util',
        modules: [
            {
                name: 'Toast',
                path: '/util/toast',
                component: ToastPage,
            },
        ],
    },
];
