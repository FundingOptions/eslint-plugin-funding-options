# eslint-plugin-funding-options

## How to use

To install:

```
npm i @fundingoptions/eslint-plugin-funding-options --save-dev
```

In .eslintrc.js

```js
module.exports = {
  plugins: ["@fundingoptions/eslint-plugin-funding-options"],
  rules: {
    "@fundingoptions/funding-options/classNaming": 2,
  },
};
```

## Rules

### funding-options/classNaming

Ensures that component classNames are camelCased:

```tsx
// pass

function FancyProfileCard() {
  return <div className="fancyProfileCard" />;
}

// fail
function FancyProfileCard() {
  return <div className="fancy-profile-card" />;
}

function FancyProfileCard() {
  return <div className="FancyProfileCard" />;
}
```

## Pull Requests

Please run `npm run build | yarn build` before submitting a PR for the time being
