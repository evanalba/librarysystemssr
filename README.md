# Library Management System
A library management system that uses server-side rendering. (See [paper]())

## Table of Contents
* [Accessibility](#Accessibility)
* [Software Stack](#Software-Stack)
* [Environment Setup](#Environment-Setup)
* [Standards](#Standards)

## Accessibility
This application has been designed to conform to the Web Content Accessibility Guidelines.

### Color Contrast Conformance
We have assessed the primary color combination used in this project (Foreground: #000000 on Background: #889E70) against the Web Content Accessibility Guidelines (WCAG) standards.

| Element Type | WCAG Level AA | WCAG Level AAA |
| :--- | :--- | :--- |
| **Normal Text** | **Pass** | **Pass** |
| **Large Text** | **Pass** | **Pass** |
| **Graphical Objects and UI Components** | **Pass** | **N/A** |

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
