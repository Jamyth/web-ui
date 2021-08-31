import React from 'react';
import { ModalOptions } from '../ModalUtil';
import { Modal } from '../../core/Modal';
import { ButtonGroup, Flex } from '@chakra-ui/react';
import { Button } from '../../core/Button';

export interface Props extends ModalOptions {}

export const ModalContainer = React.memo(
    ({ title, onClose, onOk, okayText = '確定', cancelText = '取消', closable = true, body, centered }: Props) => {
        const ref = React.useRef<HTMLDivElement>(null);

        const footer = (
            <Flex flex={1} justifyContent="center" alignItems="center">
                <ButtonGroup>
                    <Button onClick={onOk}>{okayText}</Button>
                    {closable && <Button onClick={() => onClose?.(false)}>{cancelText}</Button>}
                </ButtonGroup>
            </Flex>
        );

        return (
            <div ref={ref}>
                {ref !== null && (
                    <Modal
                        isOpen
                        nested
                        isCentered={centered}
                        portalProps={{
                            containerRef: ref,
                        }}
                        title={title}
                        onClose={() => onClose?.(true)}
                        showCloseButton={closable}
                        footer={footer}
                    >
                        {body}
                    </Modal>
                )}
            </div>
        );
    },
);
