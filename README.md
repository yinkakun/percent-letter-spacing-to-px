# Percent Line Height to Px

A simple tool to convert lineheight values in percent to px. Built with Next JS and styled with Tailwind CSS. The tool uses the formula below:

<br />

```ts
const converLineHeightInPercentToPx = (
    lineHeightInPercent: number = 0,
    fontSizeInPx: number = 0
): string => {
    return ((lineHeightInPercent / 100) * fontSizeInPx).toFixed(1);
};
```

<br />

## Local Installation

```bash
# Install dependencies
$ yarn install

# Serve with hot reload at localhost:3000
$ yarn dev

# Generate static project
$ yarn build
```
