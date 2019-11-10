# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs.

## Final Interface Visuals

![Screenshot from 2019-11-01 21-23-44](https://user-images.githubusercontent.com/48977789/68065856-bcb97000-fcf4-11e9-95dc-b5032ef39b50.jpg)
![Screenshot from 2019-11-01 21-24-56](https://user-images.githubusercontent.com/48977789/68065857-bd520680-fcf4-11e9-942e-2f0c410dad1f.jpg)
![Screenshot from 2019-11-01 21-24-33](https://user-images.githubusercontent.com/48977789/68065858-bd520680-fcf4-11e9-98d8-74f554eadf48.jpg)
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
- browse to http://localhost:8082

## Main Features

- Allows for account-based shortened URL links
- Useful for apps such as twitter where your maximum letter count is limited.
- Long URLS are able to be edited after creation.

## Secure
- Secure password encryption
- Cookie encryption
## Exclusivity
- All links you generate will be shown on your homepage, only viewable by you.
- However useable publicly if desired.

