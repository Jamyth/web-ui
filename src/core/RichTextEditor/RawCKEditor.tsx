import type React from 'react';
// @ts-ignore -- UnTypedModule
import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { CKEditorConfigType, CKEditorType } from './type';

export interface EventInfo<EventName extends string> {
    readonly name: EventName;
    readonly path: any[];
    readonly source: any;
    return?: any;

    off(): void;
    stop(): void;
}

export interface Props {
    editor: any;
    data: string;
    config?: CKEditorConfigType;
    id?: string;
    disabled?: boolean;
    onReady?: (editor: CKEditorType) => void;
    onChange?: (event: EventInfo<any>, editor: CKEditorType) => void;
    onFocus?: (event: EventInfo<any>, editor: CKEditorType) => void;
    onBlur?: (event: EventInfo<any>, editor: CKEditorType) => void;
    onError?: (error: Error, details: { phase: 'initialization' | 'runtime'; willEditorRestart: boolean }) => void;
}
export const RawCKEditor = CKEditor as React.ComponentType<Props>;
