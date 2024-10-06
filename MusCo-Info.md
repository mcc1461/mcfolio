# Developer Notes for MusCo Portfolio

## Font Size Adjustments

- **Tailwind CSS** provides flexible classes for responsive font sizes. Use:
  - `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl` for responsive breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`).
  - Tailor the design for different screen sizes with Tailwind's responsive utility classes.

## Custom Scrollbar

- **Custom scrollbar styling** can enhance UX on larger content sections. You can follow the guide provided by [W3Schools Custom Scrollbar](https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp) for detailed instructions.

## Icons

- **Remix Icons** are used for lightweight, scalable icons in the project. Add the following to the `<head>` of your `index.html`:

  ```html
  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
    rel="stylesheet"
  />
  ```

## Image Handling with Fallbacks

- Implement both Firebase URLs and local images for fallback to ensure image loading resilience:
  - Use **useState** to manage the `imgSrc`.
  - **handleImageError** triggers a fallback to a local image if the Firebase URL fails.

Example:

```javascript
const [imgSrc, setImgSrc] = useState(firebaseImageUrl);

const handleImageError = () => {
  setImgSrc(localImage);
};

<img src={imgSrc} onError={handleImageError} alt="Portfolio" />;
```

## Redux Selectors & Memoization

- **Reselect** is crucial for optimizing Redux selectors and preventing unnecessary re-renders. Install it:

  ```bash
  npm install reselect
  ```

- Use **createSelector** to memoize the results of selectors. Example:

  ```javascript
  import { createSelector } from "reselect";

  const selectPortfolioData = (state) => state.root.portfolioData;

  export const selectMemoizedProjects = createSelector(
    [selectPortfolioData],
    (portfolioData) => {
      return [...(portfolioData?.projects || [])].sort(
        (a, b) => a.order - b.order
      );
    }
  );
  ```

- Always create new arrays with the spread operator before sorting, preserving immutability.

## useSelector Hook & Memoization

- Use memoized selectors with `useSelector` to prevent unnecessary re-renders:

  ```javascript
  const memoizedProjects = useSelector(selectMemoizedProjects);
  ```

- This is crucial for improving performance, especially with large datasets or frequently updated state.

## Custom Fonts

- To include custom fonts, add the import link directly in your `index.html` file (avoiding potential "Verify stylesheet URLs" errors):

  ```html
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
  />
  ```

## Performance Optimization

- **Memoized Selectors**: Always use memoized selectors to optimize Redux state management.
- **Minimize Component Re-renders**: Use `useMemo` and `useCallback` where appropriate to prevent unnecessary re-executions of functions and re-rendering of components.
- **Lazy Loading**: Consider implementing lazy loading for heavy assets (such as images) to improve the site's performance, especially on slower networks or mobile devices.

## Error Handling in React

- **Error Boundaries**: Use error boundaries to catch JavaScript errors in any child component tree and display fallback UI.

  Example:

  ```javascript
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      console.log("Error:", error, "Error Info:", errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children;
    }
  }
  ```

## Email Integration with EmailJS

- Use **EmailJS** for connecting the contact form with email services. It sends messages directly from the website, with an automated confirmation for the sender.

  ```javascript
  emailjs
    .sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      form.current,
      "YOUR_USER_ID"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  ```

## Deployment Notes

- **Hosting**: The portfolio is entirely hosted on a **VPS server via Hostinger**.
- **SSL Certification**: Ensure the VPS is properly configured for SSL certification to maintain security across the site.
- **Auto Updates**: Any updates pushed to GitHub are automatically reflected on the live site via a GitHub-Hostinger sync, ensuring quick deployment without manual intervention.

## JWT Implementation Tips

- **Token Storage**: Store JWT tokens in **localStorage** or **sessionStorage**. Use a secure way to handle them, ensuring the security of the admin dashboard.
- **Session Expiry**: Make sure JWTs have proper expiry times, and handle token refresh for long sessions.

## QR Code Integration

- For quick access to contact details, a **QR Code** is integrated into the site. Use Canva for generating professional-looking QR codes that lead to your email or LinkedIn profile.

## Handling Large Files with Git LFS

- **Git LFS (Large File Storage)** is used to manage large files such as images or media that exceed GitHub's 100 MB file size limit. Git LFS ensures that these large files are efficiently handled in the repository.

### Steps to Use Git LFS

- **Install Git LFS**

  ```bash
  brew install git-lfs
  ```

- **Initialize Git LFS in your project**

  ```bash
  git lfs install
  ```

- **Track large files (e.g., for .gif files):**

  ```bash
  git lfs track "*.gif"
  ```

- **Add and commit the tracked files::**

  ```bash
   git add .gitattributes mucoPortfolio.gif
   git commit -m "Track large files with Git LFS"
  ```

- **Push the changes to the repository:**

  ```bash
   git push origin main
  ```

- **Verify that the large files are being tracked by Git LFS:**

  ```bash
   git lfs ls-files
  ```

**Important Note**
If a large file, such as mucoPortfolio.gif, was previously committed to Git, it must be removed from Git history before tracking with Git LFS. You can use tools like BFG Repo-Cleaner to remove large files from the Git history and then re-track them properly using Git LFS.
