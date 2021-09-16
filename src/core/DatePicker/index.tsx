import { Flex } from '@chakra-ui/react';
import React from 'react';
import { DatePickerUtil } from '../../internal/DatePickerUtil';
import { ControlledInput } from '../../type';
import { InputWrapper } from './component/InputWrapper';
import { RenderType } from './type';
import { Header } from './component/Header';
import { DateSelector } from './component/DateSelector';
import { OtherSelector } from './component/OtherSelector';

export interface Props extends ControlledInput<Date> {}

interface State {
    renderType: RenderType;
    renderingDate: Date;
}

export class DatePicker extends React.PureComponent<Props, State> {
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

    renderSelector = () => {
        const renderType = this.state.renderType;
        switch (renderType) {
            case 'date':
                return (
                    <DateSelector
                        {...this.props}
                        onRenderTypeChange={this.onRenderTypeChange}
                        onRenderingDateChange={this.onRenderingDateChange}
                        renderingDate={this.state.renderingDate}
                    />
                );
            default:
                return (
                    <OtherSelector
                        renderType={renderType}
                        onRenderTypeChange={this.onRenderTypeChange}
                        onRenderingDateChange={this.onRenderingDateChange}
                        renderingDate={this.state.renderingDate}
                    />
                );
        }
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
                    {this.renderSelector()}
                </Flex>
            </InputWrapper>
        );
    }
}
