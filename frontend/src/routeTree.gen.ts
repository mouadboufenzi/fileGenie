/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CreatefileImport } from './routes/createfile'

// Create Virtual Routes

const TypefileLazyImport = createFileRoute('/typefile')()
const RegisterLazyImport = createFileRoute('/register')()
const ProfileLazyImport = createFileRoute('/profile')()
const LoginLazyImport = createFileRoute('/login')()
const CsvLazyImport = createFileRoute('/csv')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TypefileLazyRoute = TypefileLazyImport.update({
  id: '/typefile',
  path: '/typefile',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/typefile.lazy').then((d) => d.Route))

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const ProfileLazyRoute = ProfileLazyImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const CsvLazyRoute = CsvLazyImport.update({
  id: '/csv',
  path: '/csv',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/csv.lazy').then((d) => d.Route))

const CreatefileRoute = CreatefileImport.update({
  id: '/createfile',
  path: '/createfile',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/createfile': {
      id: '/createfile'
      path: '/createfile'
      fullPath: '/createfile'
      preLoaderRoute: typeof CreatefileImport
      parentRoute: typeof rootRoute
    }
    '/csv': {
      id: '/csv'
      path: '/csv'
      fullPath: '/csv'
      preLoaderRoute: typeof CsvLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/typefile': {
      id: '/typefile'
      path: '/typefile'
      fullPath: '/typefile'
      preLoaderRoute: typeof TypefileLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/createfile': typeof CreatefileRoute
  '/csv': typeof CsvLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/typefile': typeof TypefileLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/createfile': typeof CreatefileRoute
  '/csv': typeof CsvLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/typefile': typeof TypefileLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/createfile': typeof CreatefileRoute
  '/csv': typeof CsvLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/typefile': typeof TypefileLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/createfile'
    | '/csv'
    | '/login'
    | '/profile'
    | '/register'
    | '/typefile'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/createfile'
    | '/csv'
    | '/login'
    | '/profile'
    | '/register'
    | '/typefile'
  id:
    | '__root__'
    | '/'
    | '/createfile'
    | '/csv'
    | '/login'
    | '/profile'
    | '/register'
    | '/typefile'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  CreatefileRoute: typeof CreatefileRoute
  CsvLazyRoute: typeof CsvLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  ProfileLazyRoute: typeof ProfileLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  TypefileLazyRoute: typeof TypefileLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  CreatefileRoute: CreatefileRoute,
  CsvLazyRoute: CsvLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  ProfileLazyRoute: ProfileLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  TypefileLazyRoute: TypefileLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/createfile",
        "/csv",
        "/login",
        "/profile",
        "/register",
        "/typefile"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/createfile": {
      "filePath": "createfile.tsx"
    },
    "/csv": {
      "filePath": "csv.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/profile": {
      "filePath": "profile.lazy.tsx"
    },
    "/register": {
      "filePath": "register.lazy.tsx"
    },
    "/typefile": {
      "filePath": "typefile.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
