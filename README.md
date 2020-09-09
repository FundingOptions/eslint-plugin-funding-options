# eslint-plugin-funding-options

## How to use

In .eslintrc.js

```js
module.exports = {
  plugins: ["eslint-plugin-funding-options"],
  rules: {
    "funding-options/classNaming": 2,
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
