# Jack's Garden

Jack's Garden is an online plant store

[![Product Name Screen Shot][product-screenshot]](https://github.com/2016lisali/lisali/blob/main/public/assets/lisas_portfolio.png)

## Features

- PWA site, load fast, and can be installed as a mobile app
- with dark mode
- responsive design, display well on mobiles, tablets, laptops and desktops
- all input data will be sanitized in frontend and validated at backend before inserted into database.
- the password will be hashed before inserted into database.

<p align="right">(<a href="#top">back to top</a>)</p>

## Build With

- Mysql database
- Express.js
- React
- Node.js
- Redux
- Serviceworkers
- React-bootstrap
- Sass
- JWT
- React-hook-form
- parcel

<p align="right">(<a href="#top">back to top</a>)</p>

## How to run the app

1. Either clone or download the app and open the folder in the CLI

```sh
git clone https://github.com/2016lisali/jacks_garden
```

2. Install all dependencies
   ```sh
   npm install
   ```
3. Create an `.env` file and enter following fields
   ```env
    REACT_APP_STRIPE_KEY = YOUR STRIPE KEY
    PORT = YOUR PORT NUMBER
    REACT_APP_BASE_URL = https://jacks-garden-server.herokuapp.com this is the address of the server
   ```
4. Cd to client folder in terminal and start client server
   ```sh
   npm start
   ```

The webpage will be served at http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>

// command

1. npx parcel build ./public/index.html
2. npx serve -s dist
