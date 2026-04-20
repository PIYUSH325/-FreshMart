# FreshMart

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

## Project Overview

FreshMart is a fully functional, responsive grocery e-commerce platform built as a front-end portfolio project. Using pure vanilla technologies, it simulates a complete online grocery shopping experience—from browsing fresh produce to order confirmation. Key highlights include LocalStorage-powered cart persistence, form validations, and a multi-step checkout flow, showcasing modern web development best practices in a production-like static site.

FreshMart is a modern, responsive grocery e-commerce web application designed as a portfolio project. Built with vanilla HTML5, CSS3, and JavaScript, it provides a seamless shopping experience for browsing fresh produce, adding items to cart, managing delivery details, and completing purchases. The app leverages LocalStorage for cart persistence and features a smooth checkout flow, making it ideal for demonstrating front-end development skills.

## Purpose of the Project

To demonstrate proficiency in vanilla front-end development by creating a realistic e-commerce application that handles user interactions, state management, and responsive UI without frameworks. Ideal for portfolios to highlight skills in DOM manipulation, event handling, and browser APIs.

## Target User Persona

- **Busy Working Professionals**: Quick grocery shopping during lunch breaks or after work.
- **Students**: Budget-friendly essentials ordering for dorm life.
- **Families**: Bulk buying for weekly meal planning.
- **Online Grocery Shoppers**: Tech-savvy users preferring contactless, fast delivery.

## Problem the Project Solves

Traditional grocery shopping involves time-consuming trips to stores. FreshMart solves this by providing a digital alternative for browsing, selecting, and "ordering" groceries with a familiar e-commerce interface, reducing decision fatigue and enabling anytime access on any device.

## Features

- Product catalog browsing with high-quality images and details.
- Dynamic shopping cart with add/remove/update quantity functionality.
- Persistent cart storage using LocalStorage.
- Multi-step checkout: cart review, login, address input, payment demo.
- Form validation and error handling.
- Responsive design for desktop, tablet, and mobile.
- Smooth navigation between pages.
- Order confirmation with summary.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Vercel
- **Version Control**: GitHub
- **Storage**: Browser LocalStorage

## Project Structure

```
FreshMart/
├── index.html         # Homepage & product browsing
├── login.html         # User login
├── checkout.html      # Cart review, delivery address, payment demo
├── confirmation.html  # Order success page
├── style.css          # Responsive styling
├── script.js          # App logic (cart, forms, validation)
├── ads.txt            # Ad configuration
├── .gitignore         # Git exclusions
├── TODO.md            # Task tracker
├── LICENSE.md         # MIT License
└── README.md          # Documentation
```

## Installation / Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/freshmart.git
   cd freshmart
   ```

2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, etc.).

No additional setup or dependencies required – it's a fully static site!

## Deployment (Vercel)

1. Push your code to GitHub.
2. Connect your GitHub repo to [Vercel](https://vercel.com).
3. Deploy with one click – Vercel handles HTTPS, CDN, and custom domains automatically.

Live Demo: [freshmart.vercel.app](https://freshmart.vercel.app) *(Replace with your deployed URL)*

## How the Project Works (Complete User Flow)

1. **Homepage** → Land on `index.html` to browse product catalog.
2. **Browse Products** → View grocery items, click "Add to Cart".
3. **Add to Cart** → Items saved in LocalStorage, cart updates dynamically.
4. **Cart** → Review cart totals and proceed to checkout.
5. **Checkout** → `checkout.html` for initial review.
6. **Login** → Redirect to `login.html` for authentication (demo).
7. **Delivery Address** → Enter and validate shipping details.
8. **Payment (Demo)** → Mock payment processing.
9. **Order Confirmation** → `confirmation.html` shows success with order summary.

The flow uses vanilla JavaScript for seamless page transitions, data persistence, and real-time UI updates.

## Screenshots

### Homepage
![Homepage](./screenshots/homepage.png)

### Product Grid
![Products](./screenshots/products.png)

### Checkout Flow
![Checkout](./screenshots/checkout.png)

### Mobile View
![Mobile](./screenshots/mobile.png)

*(Add screenshots to `/screenshots/` folder for best results)*

## Future Enhancements

- Integrate real payment gateway (Stripe/PayPal).
- Add user accounts with Firebase backend.
- Implement search and filtering for products.
- Email notifications for order confirmation.
- Admin dashboard for inventory management.
- PWA support for offline shopping.



## Challenges Faced

- Managing cart state across multiple HTML pages without backend or framework.
- Responsive layouts with CSS Grid/Flexbox for dynamic product cards.
- Pure JS form validation and error handling.
- LocalStorage synchronization on page navigation/refresh.
- Simulating smooth multi-step checkout UX.

## Learning Outcomes

- Expert DOM manipulation and event handling.
- Client-side state with LocalStorage.
- Mobile-first responsive design.
- Vanilla JS form processing.
- E-commerce flow implementation.
- Vercel static deployment.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

