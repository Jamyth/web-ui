import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabsProps } from '@chakra-ui/react';
import { SafeReactChildren } from '../type';

export interface TabData {
    title: React.ReactElement | string;
    content: SafeReactChildren;
    display?: 'default' | 'hidden';
}

export type TypedTabMap<T extends string> = Record<T, TabData>;

export type TypedTabList<T extends string> = Array<TabData & { key: T }>;

export interface Props<T extends string> extends Omit<TabsProps, 'onChange' | 'children'> {
    tabs: TypedTabMap<T> | TypedTabList<T>;
    activeKey: T;
    onChange: (tab: T) => void;
}

export class TypedTabs<T extends string> extends React.PureComponent<Props<T>> {
    render() {
        const { tabs, children, onChange, variant = 'enclosed', ...restProps } = this.props;
        const tabList = Array.isArray(tabs)
            ? tabs
            : Object.entries<TabData>(tabs).map(([key, item]) => ({ key, ...item }));

        return (
            <Tabs variant={variant} onChange={(_) => onChange(tabList[_].key as T)} {...restProps}>
                <TabList>
                    {tabList
                        .filter((_) => _.display !== 'hidden')
                        .map((_) => (
                            <Tab key={_.key}>{_.title}</Tab>
                        ))}
                </TabList>
                <TabPanels>
                    {tabList
                        .filter((_) => _.display !== 'hidden')
                        .map((_) => (
                            <TabPanel key={_.key}>{_.content}</TabPanel>
                        ))}
                </TabPanels>
            </Tabs>
        );
    }
}
