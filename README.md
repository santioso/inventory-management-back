# Perishable Inventory Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>

## Description

A backend application to manage perishable product inventories, built with the [NestJS](https://nestjs.com/) framework.

## Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- MySql database

## Installation

1. Clone the repository:

```bash
git clone https://github.com/santioso/inventory-management-back
cd perishable-inventory-backend
```

### Install dependencies:
npm install


## Configure environment variables:
Create a .env file in the root of the project and add the following variables:
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=your-database-name

## Running the app
Compile the project:
npm run build

## Start the application:
npm run start

The application will be available at http://localhost:3000.

### Endpoints
POST /products/create: Create a new product.
GET /products: List all products.
GET /products/:id: Get a product by ID.
PATCH /products/:id/entry: Add quantity to a product.
PATCH /products/:id/exit: Subtract quantity from a product.
GET /products/search/:name: Search products by name.


## Contributions
Contributions are welcome. Please open an issue or a pull request to discuss any changes you would like to make.

