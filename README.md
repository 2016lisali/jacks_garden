# Jack's Garden Online Store

Jack's Garden is an online plant store created with react and react-bootstrap.

The customer can register, login, logout to the site, view products, add product to the cart and place online orders.

You can find the backend code of this project on [https://github.com/2016lisali/jacks_garden_server](https://github.com/2016lisali/jacks_garden_server) and the admin panel code on [https://github.com/2016lisali/jacks_garden_admin_panel](https://github.com/2016lisali/jacks_garden_admin_panel)

![Project Screen Shot](https://github.com/2016lisali/lisas_portfolio/blob/main/public/assets/jacks_garden_responsive.jpg)

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
3. Create a `.env` file in root folder and enter following fields
   ```env
    REACT_APP_STRIPE_KEY = YOUR STRIPE KEY
    PORT = YOUR PORT NUMBER
    REACT_APP_BASE_URL = https://jacks-garden-server.herokuapp.com this is the address of the server
   ```
4. Cd to client folder in terminal and start client server
   ```sh
   npm start
   ```

The webpage will be served at http://localhost:YOUR_PORT_NUMBER

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [x] Add 'Help' page (22/05/2022)
- [x] Add Breadcrumb (25/05/2022)
- [x] Add Sort function for product list (25-05-2022)
- [ ] Allow anonymous user to add product to shopping cart (15-07-2022)
- [ ] Add update user details functionality in 'my Account' page (15-07-2022)
- [ ] Update Stripe (31-07-2022)
- [ ] Display more images for each product (15-08-2022)
- [ ] Add 'You may also like' section in product page (15-08-2022)
- [ ] Improve site performance from 86 to above 90 (lighthouse testing) (30-08-2022)

<p align="right">(<a href="#top">back to top</a>)</p>
