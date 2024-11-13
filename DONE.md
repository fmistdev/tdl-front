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