# Developer Notes for MusCo Portfolio

## Font Size Adjustments

- Use **Tailwind CSS** classes to adjust font size responsively:
  - `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl` for different breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`).

## Custom Scrollbar

- For custom scrollbar styles, refer to [W3Schools Custom Scrollbar Guide](https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp).

## Icons

- Use **Remix Icons**:

  - Add this to the `<head>` of your `index.html` file:

  ```html
  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
    rel="stylesheet"
  />
  ```

## Image Handling

- Use both Firebase URLs and local fallback images:
  - **useState Hook**: Initializes the `imgSrc` state with the Firebase URL.
  - **handleImageError Function**: Switches the `imgSrc` to a local image when the Firebase image fails to load.
  - **onError Prop in img**: Triggers the `handleImageError` function if the image fails to load from the Firebase URL.

Example:

````javascript
const [imgSrc, setImgSrc] = useState(firebaseImageUrl);

const handleImageError = () => {
  setImgSrc(localImage);
};

// Usage in img tag
<img src={imgSrc} onError={handleImageError} alt="Portfolio" />


## Redux Selectors & Memoization

1. Install **reselect** to optimize your Redux selectors and prevent unnecessary rerenders:
   ```bash
   npm install reselect
   ```
2. Create memoized selectors using the createSelector function from reselect:

```javascript
// src/redux/selectors.js

import { createSelector } from "reselect";

// Input selector

const selectPortfolioData = (state) => state.root.portfolioData;

// Memoized selector

export const selectMemoizedProjects = createSelector(
  [selectPortfolioData],
  (portfolioData) => {
    return (portfolioData?.projects || []).sort((a, b) => a.order - b.order);
  }
);
```
## Sorting Arrays in Redux Selectors

- When sorting arrays in Redux selectors, always create a new array using the spread operator before sorting to adhere to Redux's immutability principles:

```javascript
return [...(portfolioData?.projects || [])].sort((a, b) => a.order - b.order);
```

## useSelector Hook & Memoized Selectors

- When using the `useSelector` hook in a component, always use memoized selectors to prevent unnecessary rerenders and improve performance.

## Custom Fonts

- To use custom fonts in your project, import the font URL in your CSS file:

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap");
```

- If you encounter a "Verify stylesheet URLs" error, exclude the font import from your CSS file and add it directly to your `index.html` file:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap"
/>
```

## Performance Optimization

- Use memoized selectors and optimize your Redux selectors with reselect to prevent unnecessary rerenders and improve performance.

## Warning: Selector unknown returned a different result

- If you encounter the warning "Selector unknown returned a different result when called with the same parameters," use memoized selectors to prevent unnecessary rerenders and optimize performance.

## Sorting Arrays in Redux Selectors

- When sorting arrays in Redux selectors, always create a new array using the spread operator before sorting to adhere to Redux's immutability principles.

## Email Integration with EmailJS

- Use **EmailJS** to integrate the contact form with email services for sending emails directly from the website.

## Deployment

- Deploy the frontend on **Vercel** and host the backend on a server.

## Acknowledgements

- **Tailwind CSS**
- **React.js**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **Vercel**
- **bcrypt**
- **jsonwebtoken**
- **nodemon**
````
