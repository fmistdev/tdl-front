# tdl front (To Do List)

## Structure de base d'un projet Angular

source chatGPT

/src
  /app
    /core
      auth.service.ts
      http.interceptor.ts
    /shared
      /components
      /directives
      /pipes
    /features
      /user
        /components
        /services
        /models
        user.module.ts
        user-routing.module.ts
      /dashboard
        /components
        /services
        /models
        dashboard.module.ts
        dashboard-routing.module.ts
    /layouts
      auth-layout.component.ts
      main-layout.component.ts
    app.module.ts
    app-routing.module.ts

  /environments
    environment.ts
    environment.prod.ts
  /styles
    variables.scss
    global.scss

/public
  /images
  /icons
  /fonts