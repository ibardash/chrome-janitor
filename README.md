# chrome-janitor

Entry for Lexicon Digital Hackathon 2021

Theme: Green Tech

<img width="896" alt="Screen Shot" src="https://user-images.githubusercontent.com/34414677/146991685-e3460497-300b-456f-b60e-95fc0497ee78.png">

## Development

### Setup

1. Make sure node is installed (version >= 14)
2. Install the dependencies by running `yarn`

### To run extension in your browser:

1. Run `yarn build` to build the app.
2. Go to [Chrome extensions page](chrome://extensions/) and enable developer mode (in the top right corner).
3. Click "Load unpacked" and select build folder.
4. Now you should be able to see the extension in the toolbar. If you don't, click on the jigsaw icon, find it in the list and pin it.
   Every time you rebuild your project the extension should update automatically (so you don't have to click "Load unpacked" again).

### Commands:

1. `yarn test` to test.
2. `yarn format` to format files in `./src` folder.

Staged files will also be formatted automatically on pre-commit hook.

If you're using VSCode, you can also set up formatting on save by installing Prettier extension and pasting the following in your `settings.json` file:

```
  "editor.formatOnSave": true,
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```
