/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
// @ts-ignore  -- unsafe
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';

// @ts-ignore  -- unsafe
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';

// @ts-ignore  -- unsafe
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
// @ts-ignore  -- unsafe
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
// @ts-ignore  -- unsafe
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
// @ts-ignore  -- unsafe
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
// @ts-ignore  -- unsafe
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
// @ts-ignore  -- unsafe
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

// @ts-ignore  -- unsafe
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';

// @ts-ignore  -- unsafe
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
// @ts-ignore  -- unsafe
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
// @ts-ignore  -- unsafe
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
// @ts-ignore  -- unsafe
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';

// @ts-ignore  -- unsafe
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';

// @ts-ignore  -- unsafe
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';

// @ts-ignore  -- unsafe
import Image from '@ckeditor/ckeditor5-image/src/image.js';
// @ts-ignore  -- unsafe
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
// @ts-ignore  -- unsafe
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
// @ts-ignore  -- unsafe
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
// @ts-ignore  -- unsafe
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';

// @ts-ignore  -- unsafe
import Link from '@ckeditor/ckeditor5-link/src/link.js';

// @ts-ignore  -- unsafe
import List from '@ckeditor/ckeditor5-list/src/list.js';
// @ts-ignore  -- unsafe
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle.js';

// @ts-ignore  -- unsafe
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';

// @ts-ignore  -- unsafe
import Table from '@ckeditor/ckeditor5-table/src/table.js';
// @ts-ignore  -- unsafe
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
// @ts-ignore  -- unsafe
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
// @ts-ignore  -- unsafe
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
// @ts-ignore  -- unsafe
Editor.builtinPlugins = [
    Alignment,

    Bold,
    Italic,
    Strikethrough,
    Subscript,
    Superscript,
    Underline,

    Essentials,

    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,

    Heading,

    HorizontalLine,

    Image,
    ImageInsert,
    ImageResize,
    ImageToolbar,
    ImageUpload,

    Link,

    List,
    ListStyle,

    Paragraph,

    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
];

export default Editor;
