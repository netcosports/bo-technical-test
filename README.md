# BACK-OFFICE TECHNICAL TEST

## Preliminary configuration steps

- Install dependencies
```
required : node v15.10.0

nvm use or use node v15.10.0
npm install
```
## Launch application 
Assets uploading requires to have a .env file : REACT_APP_AWS_KEY

### Run local 
```
npm start
```

## Stack :
Our application is based on React/ContextAPI.

See https://fr.reactjs.org/docs/context.html

### Generals standards :
  We tend to follow the AirBnB React Styleguide We also used Prettier an eslint for our code's linting Nearly all components are functions with Hooks. Our variables are written in camelCase. Components are written in PascalCase.

 * **WARNING** use destructured props (...props) with parsimony. Nested components with multiple destructured props can be difficult to track.
 * **WARNING** use ternary operator with parsimony. Avoid nesting ternary operators they can be difficult to track.

### Commits :
  We are using commitLint and commitZen to perform commits
  ```
  npm run commit
  ```

### npm :
 To update a package you should :
  * npm uninstall ```<pkg>```
  * delete manually the package in shrinkwrap
  * npm i ```<pkg>```

### Components standards :
 * <component_name>.view.jsx : the view ---> **MUST** be a stateless component
 * <component_name>.container.jsx : the container ---> connected to the store
 * <component_name>.module.scss : We use Sass module and try to avoid inline style unless necessary
 * <component_name>.constants.js : All constants used by the component are there.

#### The view :

The view is a *dumb* component (also called element) that **MUST** be a stateless component.
There is an example of a minimal view :

```
export default function <Component_name>View(props){
  return (
    <div>
      Your component view
    </div>
  );
}
```

#### The container :

The container is a *smart* component.
It provides all props that the view need.
This practice ensure that each time a props change, the view make a new render.
If you need to prevent a render on some props, you need to use memoization.

#### The style :

Each component is having his own stylesheet, this ensure more readibility and easier updating.

### File Structure

Src directory contains all the components.


```bash
src
├── Forms # All forms components
├── Layout 
├── Pages # Main components
├── Renderers # Input adapters for final forms
├── assets # Pictures and logos for the website
├── constants # Global app constants
├── context # Global app context
├── models 
│   └── User # Class representing the current app user
├── utils
│   ├── Session # Class representing a Session stored in the localstorage
│   ├── api # Api endpoints constructor
│   └── hooks # Custom react hooks 
└── widgets # UI Components

```



