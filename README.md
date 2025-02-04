# Shopprixity

Welcome to the Shopprixity! This platform is designed to provide users with an intuitive and robust online shopping experience. It has admin section as well to manage and simply the entire shopping experience.

## Live URL : https://shopprixity.vercel.app/

```bash
   https://shopprixity.vercel.app/
```

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [Usage Instructions](#usage-instructions)
- [Contributing](#contributing)
- [Contact Information](#contact-information)
<!-- - [License](#license) -->

## Project Overview

Shopprixity is a comprehensive e-commerce platform that includes features like:

- Product catalog management
- Shopping cart and checkout process
- Payment gateway integration
- User account management
- Order tracking and shipment notifications

This project is designed to cater to both small businesses and large enterprises, with flexibility and scalability in mind.

## Features

- **Product Catalog:** Create, update, and manage your product listings with ease.
- **User Accounts:** Allow users to create accounts, track orders, and save preferences.
- **Shopping Cart:** Users can add products to their cart and proceed to checkout.
- **Payment Gateway Integration:** Process payments securely through third-party services (PayPal, Stripe, etc.).
- **Order Management:** Sellers can track and manage customer orders.
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices.
- **Search and Filters:** Easy search functionality with advanced filtering options to help users find the products they need.

## Tech Stack

Shopprixity is built using the following technologies:

- **Frontend:** HTML, CSS, JavaScript, React (for dynamic rendering)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (for storing user and product data)
- **ORM:** Prisma (for managing Database)
- **Authentication:** JWT (JSON Web Tokens) for secure user authentication
- **Payment Integration:** Stripe
<!-- - **Deployment:** Docker (for containerization), AWS (for cloud hosting) -->

## Installation Guide

To get started with Shopprixity locally, follow these steps:

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local installation or cloud-based instance like MongoDB Atlas)
<!-- - Docker (for containerization) -->

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/rajesh-ranjan-git/Shopprixity.git
   cd Shopprixity
   ```

2. For Backend

   ```bash
   cd shopprixityBackend
   ```

3. For Client

   ```bash
   cd shopprixityClient
   ```

4. Install dependencies (for both Backed and Client):

   ```bash
   npm install
   ```

5. Set up environment variables (for Backed):
   Create a .env file in the root directory and add the following:

   ```bash
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   STRIPE_API_KEY=<your-stripe-api-key>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   PAYPAL_API_CLIENT_ID=<your-paypal-api-client-id>
   PAYPAL_API_SECRET=<your-paypal-api-secret>
   CLIENT_BASE_URL=<your-client-base-url>
   ```

6. Set up environment variables (for Client):
   Create a .env file in the root directory and add the following:

   ```bash
   VITE_API_URL=<your-vite-url>
   VITE_FIREBASE_API_KEY=<your-vite-firebase-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-vite-firebase-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-vite-firebase-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-vite-firebase-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-vite-firebase-sender-id>
   VITE_FIREBASE_APP_ID=<your-vite-firebase-api-id>
   VITE_FIREBASE_MEASUREMENT_ID=<your-vite-firebase-measurement-id>
   ```

7. Start the development server (for both Backed and Client):

```bash
npm run dev
```

8. The backend for Shopprixity should now be running at http://localhost:5000
9. The client for Shopprixity should now be running at http://localhost:5173

## Usage Instructions

1. Sign Up / Log In: Create an account or log in to access personalized features.
2. Browse Products: Browse the product catalog or use the search and filter features to find items.
3. Add Items to Cart: Add products to your shopping cart and view your cart from the navigation menu.
4. Proceed to Checkout: Enter your shipping details and payment information, then complete the purchase.
5. Track Orders: View and manage your order history from your account dashboard.

<!-- ## Contributing

We welcome contributions to improve the Shopprixity project! To get started:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and descriptive messages.
4. Push your branch to your forked repository.
5. Open a pull request with a description of your changes.

Please ensure that your code follows our coding standards and includes appropriate tests. -->

<!-- ## License

This project is licensed under the MIT License - see the LICENSE file for details. -->

## Contact Information

For any questions or support, please contact us at:

- Email: rajeshranjan8271.com
- Contact Number: 9999340771
<!-- - GitHub Issues: https://github.com/rajesh-ranjan-git/Shopprixity/issues -->

We hope you enjoy using Shopprixity!

---
