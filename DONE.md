# tdl front - DONE

## setup project directory

    mkdir ./node_modules

    make -C docker/devenv up

enter the devenv container
/project $ ng new project --style scss --directory ./ --ssr false --dry-run
(warning: - override README.md - all files present will be commited)

## start angular app inside a container

    just add the host:
    "start": "ng serve --host 0.0.0.0",

## init repo git

    # create (empty) repo online on github: fmistdev/quckoo-front

    git config --local user.name fmistdev
    git config --local user.email fmistdev@example.com
    # git remote add origin git@github.com:fmistdev/quckoo-front.git
    git config -l --show-origin

    git push --set-upstream origin master

## add es lint

https://dev.to/seanbh/how-to-setup-eslint-and-prettier-in-an-angular-project-30bd
ng add @angular-eslint/schematics

## add prettier

    https://prettier.io/docs/en/install
    npm install prettier -D --save-exact

## Adding Prettier ESLint Config

Some ESLint rules conflict with Prettier ones, so Prettier has published an eslint-config that disables those rules. Run the following

    npm install -D eslint-config-prettier


## persistance

Todo in indexed DB

Bloc note persistence in local storage

no persistence for set list


## version management

version should be set manually in package.json

pre-build script (launched on build) extract version from package.json and update the file public/version.json
which is retrieved by dedicated service to be injected and displayed in the app


## init repo git

    create (empty) repo online on github: fmistdev/quckoo-front
    echo "# quckoo-front" >> README.md

    git config --local user.name fmistdev
    git config --local user.email fmistdev@example.com
    git remote add origin git@github.com:fmistdev/quckoo-front.git
    git config -l --show-origin

    git push --set-upstream origin master


## update angular version 2024-11

ng --version
npm install -g @angular/cli
npm install @angular/cli
ng update @angular/core @angular/cli
ng update

trick to force update when hanged:
rm -rf ./node_modules/*
npm install --verbose

lot of issues, need to restart the same command twice to have it work


## set app as PWA

https://angular.dev/ecosystem/service-workers/getting-started

ng add @angular/pwa

need same version than angular/cli
lot of issues, need to restart the same command twice to have it work


# after angular update, prettier seems broken

$ npx prettier --config .prettierrc.json --write \"src/**/*.{ts,html,scss, json}
sh: 1: prettier: Permission denied

fix
    ls -l node_modules/.bin/prettier
    lrwxrwxrwx 1 node node 28 Oct  4 13:43 node_modules/.bin/prettier -> ../prettier/bin/prettier.cjs

    ls -l node_modules/prettier/bin/prettier.cjs
    -rw-r--r-- 1 node node 2105 Nov 16 13:25 node_modules/prettier/bin/prettier.cjs

    chmod +x node_modules/prettier/bin/prettier.cjs