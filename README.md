# MCFOLIO

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

```

### Backend

```bash
    npm init -y
    npm i express
    npm i mongoose dotenv cors
    npm i bcrypt
    npm i jsonwebtoken
    npm i nodemon
```

## Features

- Dynamic Content: Only the admin can access the dashboard, allowing them to make changes such as updating the portfolio's Intro, About, Experiences, Projects, and Contact sections.

- Admin Dashboard: The dashboard is secured and accessible via login, making the site dynamic and easily customizable.

- Real-Time Updates: Any changes made in the admin dashboard are reflected in real-time on the public site.

- Secure Authentication: JWT (JSON Web Token) is used for secure authentication, ensuring that only the admin can access the dashboard. Also it includes a special admin code for admin registration as an extra layer of security.

- Responsive Design: The website is fully responsive and works on all devices, including desktops, tablets, and mobile phones.

- Email Integration: The contact form is integrated with EmailJS, allowing users to send emails directly from the website.

- Tailored UI: The frontend is styled with Tailwind CSS to provide a clean, responsive design.

- Firebase Integration: The project is integrated with Firebase for image storage. Also CV download is available.

- Canva Integration: The project is integrated with Canva for image editing and graphic design.

- QR Code Integration: There is a QR code in contact section for easy access to email and linkedin profile of the owner.

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

- Vercel for the frontend
- Backend hosted on a server

## How It Works

### Public Side

The website displays personal information and portfolio details in a structured manner. Users can explore the website but cannot make any changes.

### Admin Side

Only the admin has access to the dashboard. Once logged in, the admin can modify sections like Intro, About, Experiences, Projects, and Contact. All changes are reflected in real-time on the public site.

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

This project is realized and can be used as a template for personal portfolio websites.

## Contact

Created by [@musco](https://musco.com) - feel free to contact me!
