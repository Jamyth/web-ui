import React from 'react';
import { LocaleContext, LocaleUtil } from '../util/LocaleUtil';
import type { Locale } from '../util/LocaleUtil';
import { SafeReactChildren } from '../type';

export interface Props {
    locale: Locale | 'auto';
    children: SafeReactChildren;
}

export class LocaleProvider extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        LocaleUtil.setInitial(props.locale);
    }

    render() {
        const children = this.props.children;
        const locale = LocaleUtil.current();

        return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
    }
}
