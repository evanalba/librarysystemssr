# Library Management System Server-side Rendering
A library management system that uses server-side rendering. (See [paper]())

## Table of Contents
* [Software Stack](#Software-Stack)
* [Environment Setup](#Environment-Setup)
* [Standards](#Standards)

## Software Stack
Bootstrap, Express.js, MySQL, Embedded JavaScript, and Node.js. (BEMEN) 

## Environment Setup
1. Install [Docker](https://www.docker.com/)

2. Clone this repository and navigate to it:
    ```bash
    git clone git@github.com:ChicoState/StaySafe.git
    cd StaySafe
    ```

3. Build and start the containers.
    ```bash
    docker compose up 
    ```

4. Access the app via a web browser:
    <!-- * Frontend at http://localhost:3000/
    * Backend at http://localhost:8080/ -->


## Standards
ECMAScript: [ES6 (2015)](https://262.ecma-international.org/6.0/)  
Linter: [ESLint](https://eslint.org/) (Using the recommended config from @eslint/js)  
Code Formatter: [Prettier](https://prettier.io/) (Using the recommended config)   
In order to work together, Linter + Code Formatter: [Eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
