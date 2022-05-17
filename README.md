# Jack's Garden

Jack's Garden is an online plant store which was created with react and react-bootstrap.

The customer can register, login, logout to the site, view products, add product to the cart and place online orders.

You can find the backend code of this project on [https://github.com/2016lisali/jacks_garden_server](https://github.com/2016lisali/jacks_garden_server) and the admin panel code on [https://github.com/2016lisali/jacks_garden_admin_panel](https://github.com/2016lisali/jacks_garden_admin_panel)

![Product Name Screen Shot](https://github.com/2016lisali/lisali/blob/main/public/assets/jacks_garden_responsive.jpg)

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
- React-router-dom
- Node.js
- Redux
- Redux/toolkit
- Service Workers
- React-bootstrap
- Sass
- JWT
- React-hook-form
- parcel
- parcel/service-worker
- yup
- axios
- bcrypt

<p align="right">(<a href="#top">back to top</a>)</p>

## Try it

You can find the demo [here](https://jacksgarden.netlify.app/)

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
3. Create a `.env` file and enter following fields
   ```env
    REACT_APP_STRIPE_KEY = YOUR STRIPE KEY
    PORT = YOUR PORT NUMBER
    REACT_APP_BASE_URL = https://jacks-garden-server.herokuapp.com this is the address of the server
   ```
4. Cd to client folder in terminal and start client server
   ```sh
   npm start
   ```

The webpage will be served at http://localhost:YOUR PORT NUMBER

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [x] Add 'My Account' page
- [x] Add back to top links
- [ ] Add Filter and Sort function for product page
- [ ] Add update user details funtionality
- [ ] Update Stripe
- [ ] Display more images for each product
- [ ] Add 'You may also limk' section in product page

<p align="right">(<a href="#top">back to top</a>)</p>
