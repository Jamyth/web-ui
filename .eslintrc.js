/** @type {import('eslint').Linter.Config} */
const config = {
    ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/test/**"],
    extends: ['iamyth/preset/react']
}

module.exports = config;