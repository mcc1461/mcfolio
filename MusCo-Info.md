# INFO

## FRONT-END

### Installations

`npx create-react-app .`
`npm i axios redux react-redux @reduxjs/toolkit`
`npm i bcrypt`

### Font Size

`To make the font size of the paragraphs adjust automatically according to screen sizes, you can use responsive typography utilities provided by Tailwind CSS. This can be achieved using the text-xs, text-sm, text-base, text-lg, text-xl, etc., classes for different screen sizes.`

`The text-xs class sets the font size to 0.75rem, text-sm sets the font size to 0.875rem, text-base sets the font size to 1rem, text-lg sets the font size to 1.125rem, and text-xl sets the font size to 1.25rem.`

`You can also use the text-2xl, text-3xl, text-4xl, text-5xl, text-6xl, and text-7xl classes to set the font size to 1.5rem, 1.875rem, 2.25rem, 3rem, 4rem, and 5rem, respectively.`

`You can also use the text-8xl, ... text-30xl ... classes to set the font size to 6rem, ... 29rem ..., respectively.`

### Tailwind Breakpoints

`The default breakpoints in Tailwind CSS are as follows:
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px`

### Custom Scrollbar CSS

`https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp`

### Icons

`https://remixicon.com/`
`https://github.com/Remix-Design/RemixIcon`

In the second link, you can find the following code to add to the head of the HTML file:
`<link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
    rel="stylesheet"
/>`

### Ant Design

`https://ant.design/docs/react/introduce`
Note: You should import react、react-dom、dayjs before using antd.js.

`npm i dayjs`

`https://ant.design/docs/react/introduce`
`https://www.npmjs.com/package/antd`

`npm install antd --save`

## BACK-END

### Installation

`npm init -y`
`npm i express`
`npm i mongoose dotenv cors`

### Gitignore

`https://www.toptal.com/developers/gitignore` for node

### JSON Formatter and Validator

`https://jsonformatter.curiousconcept.com/`

### Images

Both local images and firebase links are used.

useState Hook: It initializes the imgSrc state with the Firebase URL.
handleImageError Function: This function sets the imgSrc state to the local image (photo) when the onError event is triggered (i.e., when the image fails to load).
onError Prop in img: This triggers the handleImageError function if the image URL fails to load, thus switching to the fallback image.
This approach ensures that your image will load from Firebase if possible, and if it fails, the local image will be displayed instead.

```Info
Previous render            Next render
   ------------------------------------------------------
1. useContext                 useContext
2. useRef                     useRef
3. useCallback                useCallback
4. useRef                     useRef
5. useMemo                    useMemo
6. useSyncExternalStore       useSyncExternalStore
7. useEffect                  useEffect
8. useDebugValue              useDebugValue
9. useDebugValue              useDebugValue
10. useRef                    useRef
11. useState                  useState
12. useRef                    useRef
13. useMemo                   useMemo
14. undefined                 useEffect
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

Attention!:
`form.setFieldsValue(portfolioData.intro`
`This will not get the initial values without`

Importing favicon should be like this not to have css access problem...
`<link rel="icon" href="%PUBLIC_URL%/assets/favicon.png"/>`

Attention!:
`@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap")`

This one gives "Verify stylesheet URLs" error and it take time to solve it...
Solution: Exclude this one from index.css and add the following one to the index.html
`<link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap"
    />`
