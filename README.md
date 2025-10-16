# MFE Webpack Demo – Host

## Overview
This is the **Host** application for a Micro Frontend (MFE) architecture using Webpack Module Federation. It dynamically loads remote modules at runtime and serves as the shell for the demo.

## Author
- **Ravindra Solanke** ([GitHub](https://github.com/ravisolanke1407))

## Live Demo
- Host: [https://mfe-host-yourvercel.vercel.app](https://mfe-host-yourvercel.vercel.app)
- Remote1: [https://mfe-remote1-yourvercel.vercel.app](https://mfe-remote1-yourvercel.vercel.app)
- Remote2: [https://mfe-remote2-yourvercel.vercel.app](https://mfe-remote2-yourvercel.vercel.app)

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
		"url": "https://mfe-remote1-yourvercel.vercel.app/remoteEntry.js",
		"scope": "remote1",
		"module": "./UserButton"
	},
	"remote2": {
		"url": "https://mfe-remote2-yourvercel.vercel.app/remoteEntry.js",
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
