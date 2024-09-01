// @ts-check

// Referenced: https://typescript-eslint.io/getting-started/

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
);
