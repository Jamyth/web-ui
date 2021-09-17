import { Flex } from '@chakra-ui/react';
import React from 'react';
import { DatePickerUtil } from '../../internal/DatePickerUtil';
import { ControlledInput } from '../../type';
import { InputWrapper } from './component/InputWrapper';
import { RenderType } from './type';
import { Header } from './component/Header';
import { Range } from './Range';
import { Selector } from './component/Selector';

export interface Props extends ControlledInput<Date> {}

interface State {
    renderType: RenderType;
    renderingDate: Date;
}

export class DatePicker extends React.PureComponent<Props, State> {
    static Range = Range;

    constructor(props: Props) {
        super(props);
        this.state = {
            renderType: 'date',
            renderingDate: props.value,
        };
    }

    onRenderTypeChange = (renderType: RenderType) => {
        this.setState({ renderType });
    };

    onRenderingDateChange = (renderingDate: Date) => {
        this.setState({ renderingDate });
    };

    render() {
        return (
            <InputWrapper
                renderType={this.state.renderType}
                value={DatePickerUtil.getDateTimeString(this.props.value, false)}
            >
                <Header
                    value={this.state.renderingDate}
                    onChange={this.onRenderingDateChange}
                    renderType={this.state.renderType}
                    onRenderTypeChange={this.onRenderTypeChange}
                />
                <Flex px={3} py={2} borderBottomWith="1" flexDir="column">
                    <Selector
                        {...this.props}
                        renderType={this.state.renderType}
                        onRenderTypeChange={this.onRenderTypeChange}
                        onRenderingDateChange={this.onRenderingDateChange}
                        renderingDate={this.state.renderingDate}
                    />
                </Flex>
            </InputWrapper>
        );
    }
}
