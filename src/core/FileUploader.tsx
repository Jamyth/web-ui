import React from 'react';
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { i18n } from '../internal/i18n/core';

interface Props {
    value: File | null;
    onChange: (imageURL: File | null) => void;
    accept?: string;
}

export const FileUploader = React.memo(({ value, onChange, accept }: Props) => {
    const t = i18n();
    const ref = React.useRef<HTMLInputElement>(null);
    const onClick = () => {
        ref.current?.click();
    };
    const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? undefined;
        if (!file) {
            return;
        }
        onChange(file);
    };
    return (
        <Box textAlign="center">
            <InputGroup onClick={onClick}>
                <Input value={value?.name || ''} color="transparent" textShadow="0 0 0 #000" cursor="pointer" />
                <InputRightAddon children={t.browse} cursor="pointer" />
            </InputGroup>
            <Input accept={accept} type="file" ref={ref} onChange={onSelectFile} d="none" />
        </Box>
    );
});
