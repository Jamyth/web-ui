!(function (i) {
    const n = (i.gu = i.gu || {});
    (n.dictionary = Object.assign(n.dictionary || {}, {
        Bold: 'ઘાટુ - બોલ્ડ્',
        Italic: 'ત્રાંસુ - ઇટલિક્',
        Strikethrough: '',
        Subscript: '',
        Superscript: '',
        Underline: 'નીચે લિટી - અન્ડરલાઇન્',
    })),
        (n.getPluralForm = function (i) {
            return 1 != i;
        });
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
