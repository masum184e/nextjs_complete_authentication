# Next.js Complete Authentication
This fullstack application aims to provide a robust and secure authentication solution catering to both users and administrators. With features tailored for seamless user management, including registration, login, profile management, and password security enhancements, alongside powerful administrative capabilities such as user management and profile oversight, our system ensures a streamlined experience for all stakeholders.

# Preview
<img src="/preview.png">
<a href="https://nextjs_complete_authentication.vercel.app/" target="_blank">Live Preview</a> 

# Requirements
[Install Node On Your Device](https://nodejs.org/)

# How to Run
```
git clone https://github.com/masum184e/nextjs_complete_authentication.git
cd nextjs_complete_authentication
npm install
npm run dev
```

# Environment Variables
```
DATABASE_NAME=nextjs_complete_authentication
DATABASE_URL=mongodb://localhost:27017/

COOKIE_KEY=nextjs_complete_authentication
BCRYPT_GEN_SALT_NUMBER=10

JWT_SECRET_KEY=nextjs_complete_authentication
TOKEN_EXPIRES=5d

PROFILE_PIC_DIRECTORY=public
```
Copy and paste it from your firebase project setting.


# Libraries
|          Library          |                                           Uses                                             |
| ------------------------- |--------------------------------------------------------------------------------------------|
| axios                     | make HTTP request                                                                          |
| react                     | JavaScript library for building user interfaces.                                           |
| react-dom                 | React package for working with the DOM.                                                    |
| bcrypt                    | Hash password securely                                                                     |
| react-icons               | Library for including popular icon packs in React applications.                            |
| tailwindcss               | Utility-first CSS framework for rapid UI development.                                      |
| flowbite                  | Utility library for Tailwind CSS that provides pre-designed UI components.                 |
| jsonwebtoken              | Library for generating and verifying JSON Web Tokens (JWT).                                |
| mongoose                  | MongoDB object modeling tool for Node.js.                                                  |
| next                      | React framework for server-rendered applications.                                          |


# Key Features
### User
- Registration
- Login
- Sign Out
- Profile
- Change Password

### Admin
- Registration
- Login
- Sign Out
- View User List