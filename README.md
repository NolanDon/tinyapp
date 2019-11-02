# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

!["screenshot description"](#)
![Screenshot from 2019-11-01 21-24-33](https://user-images.githubusercontent.com/48977789/68065858-bd520680-fcf4-11e9-98d8-74f554eadf48.jpg)(#)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.
- ``` npm start ```
- browse to http://localhost:808

## Main Features

- Allows for account-based shortened URL links
- Useful for apps such as twitter where your maximum letter count is limited.
- Long URLS are able to be edited after creation.

All urls are exclusive to your account - only viewable by you, but useable publicly if shared.

