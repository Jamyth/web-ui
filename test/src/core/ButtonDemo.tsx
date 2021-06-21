import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { Button } from '@iamyth/web-ui/core/Button';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { IoIosArrowForward } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';

export const ButtonPage = React.memo(() => {
    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [
                <Button>Button</Button>,
                ' ',
                <Button variant="outline">Button</Button>,
                ' ',
                <Button variant="ghost">Button</Button>,
                ' ',
                <Button variant="link">Button</Button>,
            ],
        },
        {
            title: 'With Icon',
            components: [
                <Button rightIcon={<IoIosArrowForward />} variant="outline" colorScheme="blue">
                    Go
                </Button>,
                ' ',
                <Button leftIcon={<MdEmail />} colorScheme="pink">
                    Email
                </Button>,
            ],
        },
        {
            title: 'With Loading',
            components: [
                <Button isLoading variant="outline" colorScheme="blue">
                    Go
                </Button>,
                ' ',
                <Button loadingText="Submitting" isLoading colorScheme="pink">
                    Email
                </Button>,
            ],
        },
        {
            title: 'Button Group',
            components: [
                <Button.Group>
                    <Button>Button 1</Button>
                    <Button>Button 2</Button>
                </Button.Group>,
                ' ',
                <Button.Group isAttached variant="outline">
                    <Button>-</Button>
                    <Button>Button 2</Button>
                    <Button>+</Button>
                </Button.Group>,
            ],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
