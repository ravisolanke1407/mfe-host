# MFE Webpack Demo – Host

## Overview

This is the **Host** application for a Micro Frontend (MFE) architecture using Webpack Module Federation. It dynamically loads remote modules at runtime and serves as the shell for the demo.

## Author

- **Ravindra Solanke** ([GitHub](https://github.com/ravisolanke1407))

## Live Demo

- Host: [https://mfe-host-seven.vercel.app/](https://mfe-host-seven.vercel.app/)
- Remote1: [https://mfe-remote1.vercel.app](https://mfe-remote1.vercel.app)
- Remote2: [https://mfe-remote2.vercel.app](https://mfe-remote2.vercel.app)

## Github Repository

- Host: [https://github.com/ravisolanke1407/mfe-host](https://github.com/ravisolanke1407/mfe-host)
- Remote1: [https://github.com/ravisolanke1407/mfe-remote1](https://github.com/ravisolanke1407/mfe-remote1)
- Remote2: [https://github.com/ravisolanke1407/mfe-remote2](https://github.com/ravisolanke1407/mfe-remote2)

## Features

- Loads remote React components on demand
- Manifest-based remote configuration
- React 19, Webpack 5, Babel

## Setup & Development

```sh
npm install
npm run start:local
```

App runs at [http://localhost:3000](http://localhost:3000)

## Deployment

- Push code to GitHub
- Import repo to Vercel and deploy (output dir: `dist`)
- Update manifest files in `public/manifests` with Vercel remote URLs

## Manifest Example

```json
{
  "remote1": {
    "url": "https://mfe-remote1.vercel.app/remoteEntry.js",
    "scope": "remote1",
    "module": "./UserButton"
  },
  "remote2": {
    "url": "https://mfe-remote2.vercel.app/remoteEntry.js",
    "scope": "remote2",
    "module": "./OrderLabel"
  }
}
```

## Module Federation

- Host provides React as a singleton
- Remotes share React and expose components
- Manifest controls which remote modules are loaded

## License

MIT
