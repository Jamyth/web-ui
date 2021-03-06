import React from 'react';
import { AdminPage } from '@iamyth/web-ui/admin/AdminPage';
import { Form } from '@iamyth/web-ui/core/Form';
import { DemoHelper } from '../util/DemoHelper';
import type { DemoHelperGroup } from '../util/DemoHelper';
import { withUncontrolledInitialValue } from '../util/withUncontrolledInitialValue';
import { Input } from '@iamyth/web-ui/core/Input';
import { useToast } from '@chakra-ui/toast';

const DefaultInput = withUncontrolledInitialValue(Input);

export const FormPage = React.memo(() => {
    const toast = useToast();
    const submit = (type: number) => {
        toast({
            position: 'top',
            title: 'Success',
            status: 'success',
            description: `Submitting Form ${type}`,
        });
    };
    const groups: DemoHelperGroup[] = [
        {
            title: 'Basic',
            components: [
                <Form onFinish={() => submit(1)}>
                    <Form.Item label="Input 1">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </Form>,
            ],
        },
        {
            title: 'Admin Filter',
            fullWidth: true,
            components: [
                <AdminPage.Filter
                    onFinish={() => {}}
                    onReset={() => {}}
                    extraButtons={[
                        {
                            btnText: '下載',
                        },
                    ]}
                >
                    <Form.Item label="Input 1">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 1">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 1">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 1">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 1">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </AdminPage.Filter>,
            ],
        },
        {
            title: 'With Validator',
            components: [
                <Form onFinish={() => submit(2)}>
                    <Form.Item label="Input 1" validator={() => 'Custom Error Message'}>
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2" validator={() => 'Custom Error Message'}>
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </Form>,
            ],
        },
        {
            title: 'Horizontal Layout',
            components: [
                <Form onFinish={() => submit(2)} layout="horizontal">
                    <Form.Item label="Input 1" validator={() => 'Custom Error Message'}>
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2" validator={() => 'Custom Error Message'}>
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </Form>,
            ],
        },
        {
            title: 'With Placeholder',
            components: [
                <Form onFinish={() => submit(3)}>
                    <Form.Item label="Input 1" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </Form>,
            ],
        },
        {
            title: 'Custom Submit Text',
            components: [
                <Form onFinish={() => submit(3)} submitText="登入">
                    <Form.Item label="Input 1" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </Form>,
            ],
        },
        {
            title: 'Custom Submit Button Position',
            components: [
                <Form onFinish={() => submit(3)} submitText="登入">
                    <Form.Item label="Input 1" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </Form>,
                ' ',
                <Form onFinish={() => submit(3)} submitText="登入" submitButtonPosition="center">
                    <Form.Item label="Input 1" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </Form>,
                ' ',
                <Form onFinish={() => submit(3)} submitText="登入" submitButtonPosition="right">
                    <Form.Item label="Input 1" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                    <Form.Item label="Input 2" placeholder="this is placeholder">
                        <DefaultInput initialValue="" />
                    </Form.Item>
                </Form>,
                ' ',
            ],
        },
    ];

    return (
        <AdminPage>
            <DemoHelper groups={groups} />
        </AdminPage>
    );
});
