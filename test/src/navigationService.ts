import type { NavigationService as Props } from '@iamyth/web-ui/admin/AdminApp/type';

import { InputPage } from './core/InputDemo';
import { ButtonPage } from './core/ButtonDemo';
import { CheckboxPage } from './core/CheckboxDemo';
import { FormPage } from './core/FormDemo';
import { TablePage } from './core/TableDemo';

export const NavigationService: Props[] = [
    {
        title: 'Input',
        modules: [
            {
                name: 'Default',
                path: '/input',
                component: InputPage,
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
];
