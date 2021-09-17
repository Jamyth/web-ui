import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { SafeReactChild, SafeReactChildren } from '../../../type';
import { RenderType } from '../type';

interface Props {
    value: SafeReactChild | ((showPicker: boolean) => SafeReactChild);
    children: SafeReactChildren;
    renderType: RenderType;
    allowToggle?: boolean;
    onPickerClose?: () => void;
}

const inputStyle = {
    zIndex: 1,
    borderColor: '#3182ce',
    boxShadow: ' 0 0 0 1px #3182ce',
};

export const InputWrapper = React.memo(({ value, children, renderType, onPickerClose, allowToggle = true }: Props) => {
    const [showPicker, setShowPicker] = React.useState(false);
    const [picker, setPicker] = React.useState<HTMLDivElement | null>(null);
    const [height, setHeight] = React.useState<string | number>(0);

    const registerPicker = React.useCallback(
        (picker: HTMLDivElement) => {
            setPicker(picker);
        },
        [renderType],
    );

    const onInputClick = () => {
        if (!allowToggle) {
            setShowPicker(true);
            return;
        }
        if (showPicker) {
            onPickerClose?.();
        }
        setShowPicker(!showPicker);
    };

    const onWindowClick = (e: MouseEvent) => {
        if (e.target instanceof Element) {
            const isClicked = !!e.target.closest('.g-date-picker');
            if (!isClicked) {
                setShowPicker(false);
                onPickerClose?.();
            }
        }
    };

    React.useEffect(() => {
        window.addEventListener('click', onWindowClick);

        return () => {
            window.removeEventListener('click', onWindowClick);
        };
    }, [picker]);

    React.useEffect(() => {
        if (!picker || !showPicker) {
            setHeight(0);
            return;
        }
        setHeight(`${picker.scrollHeight}px`);
    }, [renderType, showPicker]);

    return (
        <Box position="relative" className="g-date-picker">
            <Flex
                alignItems="center"
                lineHeight="1.15"
                px="1rem"
                h="10"
                borderWidth="1px"
                borderRadius="0.375rem"
                style={showPicker ? inputStyle : {}}
                onClick={onInputClick}
                cursor="pointer"
                w="100%"
                userSelect="none"
            >
                {typeof value === 'function' ? value(showPicker) : value}
            </Flex>
            <Box
                zIndex="1000"
                top="110%"
                position="absolute"
                transition="max-height 0.15s ease-out"
                overflow="hidden"
                ref={registerPicker}
                maxH={height}
                boxShadow="0 0 10px rgba(0,0,0,0.3)"
                backgroundColor="white"
            >
                {children}
            </Box>
        </Box>
    );
});
