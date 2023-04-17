# Entrega Final Backend CoderHouse 👾

## Introduccion

Este proyecto es mi entrega final para el curso Programacion Backend de CoderHouse. En este caso es un eccommerce trabajado con el modelo "vista controlador", centrado mas en la parte de peticiones , CRUD , persistencia de datos que en el diseño de las vistas.

## Herramientas y tecnologias utilizadas 🔧

1- Node js

2- Express js

3- MongoDB

4- JavaScript

5- Mongoose

6- Nodemailer

7- Formidable

8- Passport

9- Connect-mongo

10- Connect-flash

11- Dotenv

12- Bcryptjs

13- Pino

14- Express-handlebars

15- Express-session

## Levantar Proeycto

1- git clone https://github.com/TomasCerdeyra/DesafioFinalBackend.git

2- npm install

3- npm start

## Documentacion 📒

### Rutas inicio
🔘 GET. Traer todos los productos:   `http://localhost:8080`

🔘 GET. Añadir producto al carrito: `http://localhost:8080/api/carrito/:id`

### Rutas carrito

🔘 GET. Traer productos del productos: `http://localhost:8080/api/carrito`

🔘 DELETE. Eliminar producto del carrito: `http://localhost:8080/api/carrito/:id`

🔘 DELETE. Mandar mail con productos: `http://localhost:8080/api/compra-terminada`

### Rutas inicio sesion y registro

🔘 POST. Registrar cuenta nueva: `http://localhost:8080/api/register`

🔘 POST. Iniciar sesion: `http://localhost:8080/api/login`

🔘 POST. Iniciar sesion: `http://localhost:8080/api/login`

🔘 GET. Cerrar sesion: `http://localhost:8080/api/logout`

### Rutas perfil

🔘 GET. Traer datos del perfil: `http://localhost:8080/api/perfil`

🔘 POST. Cambiar foto de perfil: `http://localhost:8080/api/perfil`

