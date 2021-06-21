import React from 'react';
import { InputRightElement } from '@chakra-ui/react';
import type { Props as InputProps } from '../Input';
import { Input } from '../Input';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

export interface Props extends InputProps {}

export const Password = React.memo((props: Props) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputRef = React.useRef<Input>(null);

    const onClick = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Input.Group>
            <Input {...props} type={showPassword ? 'text' : 'password'} ref={inputRef} />
            <InputRightElement onClick={onClick}>{showPassword ? <FaEye /> : <FaEyeSlash />}</InputRightElement>
        </Input.Group>
    );
});
