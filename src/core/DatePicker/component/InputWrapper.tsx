import React from 'react';
import { Input, Box } from '@chakra-ui/react';
import { SafeReactChildren } from '../../../type';
import { RenderType } from '../type';

interface Props {
    value: string;
    children: SafeReactChildren;
    renderType: RenderType;
}

const inputStyle = {
    zIndex: 1,
    borderColor: '#3182ce',
    boxShadow: ' 0 0 0 1px #3182ce',
};

export const InputWrapper = React.memo(({ value, children, renderType }: Props) => {
    const [showPicker, setShowPicker] = React.useState(false);
    const [picker, setPicker] = React.useState<HTMLDivElement | null>(null);
    const [height, setHeight] = React.useState<string | number>(0);

    const registerPicker = React.useCallback(
        (picker: HTMLDivElement) => {
            setPicker(picker);
        },
        [renderType],
    );

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const onWindowClick = (e: MouseEvent) => {
        if (e.target instanceof Element) {
            const isClicked = !!e.target.closest('.g-date-picker');
            if (!isClicked) {
                setShowPicker(false);
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
            <Input
                style={showPicker ? inputStyle : {}}
                onClick={togglePicker}
                value={value}
                color="transparent"
                textShadow="0 0 0 #000"
                _focus={{ boxShadow: 'none' }}
                cursor="pointer"
            />
            <Box
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
