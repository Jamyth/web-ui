import type * as ck from '@ckeditor/ckeditor5-core';
import type { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

/**
 * A non-exhaustive list of toolbar items available to use. May be incorrect.
 * From calling `console.log(Array.from(editor.ui.componentFactory.names()))` in `onReady()` of CKEditor
 */
export type CKEditorToolbarItem =
    | 'alignment:left'
    | 'alignment:right'
    | 'alignment:center'
    | 'alignment:justify'
    | 'alignment'
    | 'bold'
    | 'italic'
    | 'strikethrough'
    | 'subscript'
    | 'superscript'
    | 'underline'
    | 'selectAll'
    | 'undo'
    | 'redo'
    | 'fontBackgroundColor'
    | 'fontColor'
    | 'fontFamily'
    | 'fontSize'
    | 'heading'
    | 'horizontalLine'
    | 'imageTextAlternative'
    | 'imageUpload'
    | 'imageInsert'
    | 'imageResize:original'
    | 'imageResize:25'
    | 'imageResize:50'
    | 'imageResize:75'
    | 'imageResize'
    | 'link'
    | 'numberedList'
    | 'bulletedList'
    | 'insertTable'
    | 'tableColumn'
    | 'tableRow'
    | 'mergeTableCells'
    | 'tableCellProperties'
    | 'tableProperties';

export type CKEditorPluginType = string | ck.Plugin | ((editor: CKEditorType) => void);

export interface CKEditorConfigType extends Partial<Omit<EditorConfig, 'extraPlugins' | 'image'>> {
    toolbar?: (CKEditorToolbarItem | '|')[] | { items: (CKEditorToolbarItem | '|')[]; viewportTopOffset: number };
    fontSize?: {
        options: number[]; // Use numeric values here to render inline styles (class names are stripped at the backend)
        supportAllValues?: boolean;
    };
    extraPlugins?: CKEditorPluginType[];
    image?: {
        resizeOptions?: any[];
        resizeUnit?: '%' | 'px';
        styles?: any[];
        toolbar?: CKEditorToolbarItem[];
        upload?: {
            types: string[]; // default: [ 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff' ]
        };
    };
    link?: {
        addTargetToExternalLinks?: boolean;
        defaultProtocol?: string;
        decorators?: {
            [link: string]:
                | {
                      mode: 'manual';
                      label: string;
                      defaultValue: boolean;
                      attributes: Record<string, string>;
                  }
                | {
                      mode: 'automatic';
                      callback: (url: string) => boolean;
                      attributes: Record<string, string>;
                  };
        };
    };
    simpleUpload?: {
        uploadUrl: string;
        headers: { [header: string]: string };
        withCredentials?: boolean;
    };
    table?: {
        contentToolbar?: CKEditorToolbarItem[];
        tableCellProperties?: {
            borderColors: { color: string; label: string }[];
            backgroundColors: { color: string; label: string }[];
        };
        tableProperties?: {
            borderColors: { color: string; label: string }[];
            backgroundColors: { color: string; label: string }[];
        };
        tableToolbar?: CKEditorToolbarItem[];
    };
}

export interface CKEditorType extends ck.Editor {}
