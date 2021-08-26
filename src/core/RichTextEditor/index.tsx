import React from 'react';
import { RawCKEditor } from './RawCKEditor';
import type { Props as RawCKEditorProps } from './RawCKEditor';
// @ts-ignore -- untyped module
import ClassicEditor from './custom-editor/ckeditor';
import { Uploader } from './Plugin/Uploader';
import type { CKEditorConfigType } from './type';
import './index.scss';

interface Props {
    value: string;
    onChange: (value: string) => void;
    uploadURL: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    formDataFields: Record<string, (file: File) => any>;
    imageSizeLimitKB?: number;
}

export const RichTextEditor = React.memo(
    ({ value, onChange, imageSizeLimitKB, uploadURL, method, formDataFields }: Props) => {
        const config: CKEditorConfigType = {
            language: 'zh-cn',
            // prettier-ignore
            toolbar: [
            "undo", "redo", "alignment", "fontFamily", "fontSize", "|",
            "bold", "italic", "underline", "fontColor", "fontBackgroundColor", "strikethrough", "superscript", "subscript", "|",
            "link", "bulletedList", "numberedList", "horizontalLine", "|",
            "imageInsert", "insertTable",
        ],
            fontSize: {
                options: [10, 14, 18, 24, 30, 36],
                supportAllValues: true,
            },
            image: {
                toolbar: ['imageResize', 'imageTextAlternative'],
                upload: { types: ['png', 'jpeg', 'gif', 'svg'] },
            },
            link: {
                addTargetToExternalLinks: false,
                defaultProtocol: 'https://',
                decorators: {
                    isExternal: {
                        mode: 'automatic',
                        callback: (url) => /^https?:/i.test(url),
                        // Note: List of allowed attributes on <a> tags are hard-coded. Make sure to communicate with backend before modifying any attributes.
                        // https://github.com/pinnacle0/ub-project/blob/a39873a0c29b57fef1a8422d21fa68e9d4d8c3aa/backend/common-library/src/main/java/app/content/ContentParser.java#L21
                        // https://github.com/jhy/jsoup/blob/f1b885d238d8576d91d71a09f8658358dd846921/src/main/java/org/jsoup/safety/Whitelist.java#L124
                        attributes: { target: '_blank', rel: 'nofollow' },
                    },
                },
            },
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                    'tableCellProperties',
                    'tableProperties',
                ],
            },
            extraPlugins: [
                Uploader({
                    uploadURL,
                    method,
                    formDataFields,
                    imageSizeLimitKB,
                }),
            ],
        };

        const onEditorChange: RawCKEditorProps['onChange'] = (event, editor) => {
            const data = (editor as any).getData();
            onChange(data);
        };

        const onError: RawCKEditorProps['onError'] = (error) => {
            throw error;
        };

        return (
            <RawCKEditor
                editor={ClassicEditor}
                config={config}
                data={value}
                onChange={onEditorChange}
                onError={onError}
            />
        );
    },
);
