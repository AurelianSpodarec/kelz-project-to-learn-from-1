# Introduction

The `4c-frontend` repository is the IFA-facing portion of the 4C Platform. It is the primary method by which IFAs will interact with the software.  
It is built using:

- [Create React App(CRA)](https://create-react-app.dev/), for a configless, easy-to-maintain [React](https://reactjs.org/) development and
- [Storybook](https://storybook.js.org/), for local, abstracted development and documentation of the repo's specific elements

and it uses the `4c-elements` package to implement the project-wide frontend common elements.

**Please note**: In **local** environments, updates to this file **must** be followed by a `yarn update-readme` command and a Storybook restart in order to update the `outer-scope` local `devDependency` used by the **README Story**. This is a workaround implementend due to CRA's [limitation](https://stackoverflow.com/a/56849993) of importing modules from outside the `./src` directory and in order to avoid ejecting CRA or potential issues with Symlinking on Windows. CI handles this automatically.

# Development

## All implementations must be unit tested, documented in an [MDX](https://storybook.js.org/docs/react/api/mdx) format and have stories with appropriate [Controls](https://storybook.js.org/docs/react/essentials/controls). An extensive guide is provided in [Writing Stories](/?path=/docs/info-writing-stories).

## Please note: On Windows, the below commands need to be run inside [Git Bash](https://gitforwindows.org/) shell.

## Installing dependencies

To install the dependencies, run:

```
yarn
```

## Available scripts

The scripts available in this repo are separated in 3 categories:

1. [Storybook](#storybook-scripts) specific
2. [CRA](#cra-scripts) specific (might also be referred to as **portal**)
3. [Shared](#shared-scripts) shared in between Storybook and CRA

## Storybook scripts

### Running Storybook

To bring Storybook up and execute the Jest test suites and coverage report, run:

```
yarn start:storybook
```

This also copies the `./coverage` contents to `./public/coverage` recursively. This is a workaround needed due to CRA's Jest config [limitations](https://create-react-app.dev/docs/running-tests#configuration).

### Installing dependencies and running Storybook

To install dependencies, bring Storybook up and execute the Jest test suites and coverage report, run:

```
yarn up:storybook
```

This also removes the `./node_modules` directory to ensure that the `outer-scope` local `devDependency` is updated.

### Cache busting Storybook

Sometimes, Storybook might require clearing the Manager's cache, mostly when changes have been made in the configuration files in `./.storybook`.

To clear Storybook's cache, pass `--no-manager-cache` to `yarn start:storybook` or `yarn up:storybook`.

### Building Storybook

To build Storybook for production to the `./storybook_build` folder as described in [Storybook's docs](https://storybook.js.org/docs/react/workflows/publish-storybook), run:

```
yarn build:portal
```

## CRA scripts

### Running CRA

To bring CRA up, run:

```
yarn start:portal
```

### Installing dependencies and running CRA

To install dependencies and bring CRA up, run:

```
yarn up:portal
```

This also removes the `./node_modules` directory to ensure that the `outer-scope` local `devDependency` is updated.

### Building CRA

To build CRA for production to the `./build` folder as described in [CRA's docs](https://facebook.github.io/create-react-app/docs/deployment), run:

```
yarn build:portal
```

This also removes the `./public/coverage` directory, as this is **only** required by Storybook.

## Shared scripts

### Linting

To check the `*.mdx`, `*.md` and `*.json` formatting and `*.js` linting of the entire repo, run:

```
yarn lint:check
```

To automatically fix the `*.mdx`, `*.md` and `*.json` formatting and `*.js` linting of the entire repo, run:

```
yarn lint:fix
```

### Testing

#### Generic

To execute the Jest test suites, run:

```
yarn test
```

#### Coverage report

To execute the Jest test suites coverage report, run:

```
yarn test:cover
```

#### JSON Output

To execute the Jest test suites and output the results to the `./.storybook/jest-test-results.json` file for Storybook tests display, run:

```
yarn test:output
```

#### Updating snapshots

To update the snapshots, run:

```
yarn test:update
```

**Please note**: This should be used carefully and snapshots **must only** be updated if the scope of the work involves approved appearance changes.

#### Watch mode

To execute the Jest test suites in watch mode (for all file changes), run:

```
yarn test:watch
```

#### Watch mode and Storybook or Portal in parallel

To enable live test suites results in Storybook, two separate shell instances are required.

Firstly, run:

```
yarn test:watch
```

And then, run:

```
yarn start:storybook
```

or

```
yarn start:portal
```

**Recommendation**: If using VS Code, [splitting the terminal](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-splitting) provides a nice view of both commands running simultaneously.

# `.env` Files

The variables stored in the `.env` files are not included in the git remote. These will need to be copied from `.env.example` and populated with the correct values, where appropriate.

The `.env` files contain several useful variables. They are divided into broad categories:

## Storybook variables

These variables are used by Storybook in order to allow some common stories and components to be reused from `4c-elements` but display content relevant to this repo.

**All Storybook variables must have a `STORYBOOK_` prefix, be placed in the `# Storybook variables` section of the `.env` files and be listed here.**

```
STORYBOOK_FRONTEND=true
```

## CRA variables

These are variables that are useful for how the CRA environment is [configured](https://create-react-app.dev/docs/advanced-configuration).

**All CRA variables must follow the above documentation, be placed in the `# CRA variables` section of the `.env` files and be listed here.**

```
HTTPS
SKIP_PREFLIGHT_CHECK
PORT
```

## Other application variables

**Any other variables used anywhere in application must have a `REACT_APP_` prefix, be placed in a dedicated `# Subsection Name variables` subsection under the`# Application variables` section of the `.env` files and be listed here under a `### Subsection Name variables` subsection.**

### Config Provider variables

These are variables that are used to determine the application's basic configuration. They are generally used in src > config > index.js.

```
REACT_APP_API_URL
REACT_APP_API_SCOPE
REACT_APP_TRANSLATION_NAMESPACES
```

### Pusher API variables

These are variables that allow the application to interact with the Pusher API.

```
REACT_APP_PUSHER_KEY
REACT_ALL_PUSHER_CLUSTER
```
