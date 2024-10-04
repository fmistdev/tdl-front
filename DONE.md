
# tdl front - DONE

## setup project directory

    mkdir ./node_modules

    make -C docker/devenv up

enter the devenv container
    /project $ ng new project --style scss --directory ./ --ssr false --dry-run
    (warning: 
     - override README.md
     - all files present will be commited)


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