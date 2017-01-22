# fac10_jwt_workshop

## What is a JSON web token(JWT)?

> A JSON web token (JWT) is a JSON object, which is a safe way to represent and transmit a set of inromation between two parties. The token is composed of a header, a payload and a signature.

- JWT are used across several programming languages .NET, Python, Node.js, Java, PHP, Ruby, Go, JavaScript, and Haskell.
- **JWTs are self-contained** which means that the payload contains all the necessary information about the user,
avoidin to query the database more than once.
- JWTs are versatile and can be passed around easily. They are small, so they can be sent through **URL**, **POST parameters** or inside an **HTTP header**.

## When should you use JSON web tokens?

- **Authentication**: the most common use of JWTs. After logging in, each subsequent request will contain the JWT,
allowing the user to access the routes and services that are alowed with that token.

- *Information exchange*: JWTs can be used to securely transmit information between parties, since they can be signed e.g.: using public/private key pairs. The signature is determined based on both the header and the payload using a hashing algorithm, so you can check that the content hasn't been tampered with.

## JWTs under the hood


## Resources
[]()
[]()
[]()
