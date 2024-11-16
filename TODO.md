# tdl - TODO

clean up/refacto setlist

prettier / vscode

# after angular update, prettier seems broken

$ npx prettier --config .prettierrc.json --write \"src/**/*.{ts,html,scss, json}
sh: 1: prettier: Permission denied

fix
    ls -l node_modules/.bin/prettier
    lrwxrwxrwx 1 node node 28 Oct  4 13:43 node_modules/.bin/prettier -> ../prettier/bin/prettier.cjs

    ls -l node_modules/prettier/bin/prettier.cjs
    -rw-r--r-- 1 node node 2105 Nov 16 13:25 node_modules/prettier/bin/prettier.cjs

    chmod +x node_modules/prettier/bin/prettier.cjs

