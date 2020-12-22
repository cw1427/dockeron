
![](./docs/Dockeron.png)

[![Build Status](https://travis-ci.org/dockeron/dockeron.svg?branch=master)](https://travis-ci.org/dockeron/dockeron)
[![AppVeyor](https://img.shields.io/appveyor/ci/gruntjs/grunt.svg)](https://ci.appveyor.com/project/fluency03/dockeron)
[![Tag](https://img.shields.io/github/tag/dockeron/dockeron.svg)](https://github.com/dockeron/dockeron/tags)
[![GitHub (pre-)release](https://img.shields.io/github/release/dockeron/dockeron/all.svg)](https://github.com/dockeron/dockeron/releases)
[![Version npm](https://img.shields.io/npm/v/dockeron.svg)](https://www.npmjs.com/package/dockeron)
[![Downloads npm](https://img.shields.io/npm/dt/dockeron.svg)](https://www.npmjs.com/package/dockeron)
[![MIT license](https://img.shields.io/npm/l/dockeron.svg)](https://opensource.org/licenses/MIT)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/dockeron-project)
[![GitHub stars](https://img.shields.io/github/stars/dockeron/dockeron.svg?style=social&label=Star)](https://github.com/dockeron/dockeron)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A dockeron project, built on Electron + Vue.js for Docker.
  - Template generator: [electron-vue](https://github.com/SimulatedGREG/electron-vue)
  - Docker Engine API: [dockerode](https://github.com/apocas/dockerode).
  - UI components: [iView](https://github.com/iview/iview)

*I am only using Mac version, which means that the Windows and Linux versions are to be tested.*

*Notice that, this project is still under active development, many functionalities or features are not implemented yet, and some parts are still buggy.*

*Since this is my first front-end project, there might be some bad practices BUT I want to make Dockeron better. This is why I would really appriciate the help from you and the community.*

Welcome PR and [issues](https://github.com/dockeron/dockeron/issues/new).


## TODOs and progress

Please refer to [project dockeron](https://github.com/dockeron/dockeron/projects/1).


## Development

Make sure you have Node.js installed (node@^6.5.0 or higher is recommended).

- Clone the repo to your machine (or fork it to your github account then clone from there)
```
git clone git@github.com:dockeron/dockeron.git
cd dockeron
```

- Make your branch from `develop`

- Install all dependencies then `npm run dev`

```
npm install
npm run dev
```

## Contributing

[Contributing to Dockeron](https://github.com/dockeron/dockeron/blob/master/CONTRIBUTING.md)

## Screenshots

![engines](./docs/dockeron-engines.png)
![containers](./docs/dockeron-containers.png)

![](./docs/dockeron-screenshot1.png)
![](./docs/dockeron-screenshot2.png)
![](./docs/dockeron-screenshot3.png)
![](./docs/dockeron-screenshot4.png)
![](./docs/dockeron-screenshot5.png)
![](./docs/dockeron-screenshot6.png)


## Alternatives

- [Docker Station](https://dockstation.io/)
- [Kitematic](https://kitematic.com/)
- [Weave Scope](https://github.com/weaveworks/scope) (Web Application)
- [Portainer](https://github.com/portainer/portainer) (Web Application)


*This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue).*
