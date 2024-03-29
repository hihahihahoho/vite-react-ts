# Vite + React + TypeScript Setup

This project is a replacement for Creat React App with React, TypeScript, Vite, React Router DOM, Zustand, React query, Tailwind CSS (With plugin tailwindcss-themer, twin.macro), Emotion and Styled Emotion, Remeda, Immer. This README provides an overview of the project setup, scripts, and deployment process.

<div>
<img align="top" src="https://iili.io/HNrTdxV.png"  width="128" height="128" style="margin:24px; ">
<img align="top" src="https://iili.io/HNrTHDQ.png"  width="128" height="128" style="margin:24px; ">
<img align="top" src="https://iili.io/HNruZ8u.png"  width="128" height="128" style="margin:24px; ">
<img align="top" src="https://iili.io/HNrT3iP.png"  width="128" height="128" style="margin:24px; ">
<img align="top" src="https://iili.io/HNrT2WB.png"  width="128" height="128" style="margin:24px; ">
<img align="top" src="https://iili.io/HNrIyRj.png"  width="128" height="128" style="margin:24px; ">
</div>

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- NODE 18.14.0

## VScode extension:

- [Editor config](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Installation

1. Clone the repository.
2. Navigate to the project directory and run `yarn` or `npm install` to install the dependencies.

## Usage

The following scripts are available for use:

- `dev`: Start the development server (`vite`).
- `build`: Compile TypeScript and build the project (`tsc && vite build`).
- `deployFtp`: Compile TypeScript, build the project in FTP mode, and deploy using FTP (`tsc && vite build --mode ftp && node deploy.config.js`).
- `test`: Run tests (`vitest`).
- `preview`: Start the Vite preview server (`vite preview`).
- `prepare`: Install Husky for Git hooks (`husky install`).

## Deployment

To deploy your project to a static host, you will need to set up two files: `.env` and `ftp.config.js`. These files contain private information and should not be pushed to your Git repository.

1. Create the `ftp.config.js` file with the following content:

```javascript
const ftpConfig = {
	host: YOUR_HOST,
	port: YOUR_HOST_PORT,
	user: YOUR_HOST_USERNAME,
	password: YOUR_HOST_PASSWORD,
};

export default ftpConfig;
```

2. Create the .env.ftp file with the following content:

```
VITE_DOMAIN=YOUR_DOMAIN // e.g. https://example.com
VITE_BASE_URL=YOUR_DOMAIN // e.g. demo/demo-vite
VITE_FTP_DIR=YOUR_FTP_LOCATION_DIR // e.g /public_html/demo/demo-vite
```

To deploy to FTP, run the deployFtp script:

```
yarn deployFtp
```
