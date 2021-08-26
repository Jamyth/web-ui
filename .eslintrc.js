/** @type {import('eslint').Linter.Config} */
const config = {
    ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/test/**", "**/RichTextEditor/custom-editor/**"],
    extends: ['iamyth/preset/react']
}

module.exports = config;