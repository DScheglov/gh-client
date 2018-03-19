# GitHub Observer

Tutorial React / Redux project

## Installation

```shell
git clone git@github.com:DScheglov/gh-client.git
cd gh-client
npm install
```

## Running in local environment

```shell
npm start
```

## Building

```shell
env NODE_ENV=production \ 
    CDN=//dscheglov.github.io/gh-client/ \
    MOUNT_PATH=/gh-client \
    npm run build
```