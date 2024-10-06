# MCFOLIO

<img src="https://github.com/mcc1461/mcfolio/blob/main/musco.png" width="250px"> 

## Description

This is a dynamic portfolio website developed using modern technologies. The website is divided into two parts: a public-facing portfolio and an admin dashboard that allows the owner to manage and update the content.

## Installation

### Frontend

```bash
    npx create-react-app client
    npm install -D tailwindcss
    npx tailwindcss init
    npm install --save-dev @babel/plugin-proposal-private-property-in-object
    npm i react-router-dom
    npm install @headlessui/react @heroicons/react

```

### Backend

```bash
    npm init -y
    npm i express cors fs path dotenv
    npm i mongoose
    npm i bcrypt
    npm i jsonwebtoken
    npm i nodemon
```

## Features

- Dynamic Content: The admin has exclusive access to the dashboard, where they can instantly update sections like Intro, About, Experiences, Projects, and Contact without needing to upload changes.

- Admin Dashboard: The dashboard is securely accessible through login, making the site highly dynamic and customizable in real-time.

- Real-Time Updates: All changes made in the admin dashboard are reflected immediately on the live site, ensuring the content stays current.

- Secure Authentication: JWT (JSON Web Token) is used to provide robust authentication. For added security, a special admin code is required for registration, making access highly secure.

- Responsive Design: The website is fully responsive and optimized for all devices—whether you're on desktop, tablet, or mobile, it adapts seamlessly.

- Email Integration: The contact form is powered by EmailJS, enabling visitors to send emails directly from the site with confirmation notifications.

- Tailored UI: Styled with Tailwind CSS, the frontend is clean, modern, and fully responsive, offering an engaging user experience.

- Firebase Integration: Firebase is integrated for image storage, and a downloadable CV is available, ensuring accessibility and convenience.

- Canva Integration: Canva is utilized for high-quality image editing and graphic design, adding a professional touch to visuals.

- QR Code Integration: A custom QR code in the contact section provides quick access to the admin’s email and LinkedIn profile, making networking effortless.

## Technologies Used

### Frontend Side

- React.js
- Tailwind UI

### Backend Side

- Node.js
- Express.js
- MongoDB with Mongoose

### Authentication

- JWT (JSON Web Token) for secure authentication

### Deployment

- Fully hosted on a Hostinger VPS server

## How It Works

### Public Side

The website displays personal information, portfolio details, and projects in a user-friendly format. Visitors can explore the site but cannot make any changes.

### Admin Side

Admin access is restricted by a secure login. Once logged in, the admin can modify sections such as Intro, About, Experiences, Projects, and Contact. All changes are immediately reflected on the public site.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Vercel](https://vercel.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Project Status

This project is complete and can be used as a template for personal portfolio websites.

## Contact

Created by [@musco](https://musco.dev) - feel free to contact me!
