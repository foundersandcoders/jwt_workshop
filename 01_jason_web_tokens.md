# fac10_jwt_workshop

## What is a JSON web token(JWT)?

> A JSON web token (JWT) is a JSON object, which is a safe way to represent and transmit a set of inromation between two parties. The token is composed of a header, a payload and a signature.

*(Please note that a double quoted string is  considered a valid JSON object.)*

- JWT are used across several programming languages .NET, Python, Node.js, Java, PHP, Ruby, Go, JavaScript, and Haskell.
- **JWTs are self-contained** which means that the payload contains all the necessary information about the user,
avoidin to query the database more than once.
- JWTs are versatile and can be passed around easily. They are small, so they can be sent through **URL**, **POST parameters** or inside an **HTTP header**.

## When should you use JSON web tokens?

- **Authentication**: the most common use of JWTs. After logging in, each subsequent request will contain the JWT,
allowing the user to access the routes and services that are alowed with that token.

- *Information exchange*: JWTs can be used to securely transmit information between parties, since they can be signed e.g.: using public/private key pairs. The signature is determined based on both the header and the payload using a hashing algorithm, so you can check that the content hasn't been tampered with.

## How do JWTs work?
![JWTs explained](./imgs/jwts_explained.png)
It should be noted that a double quoted string is actually considered a valid JSON object.
## JWTs under the hood

A JSON web token consists of three strings separated by dots.
![JWT structure](./imgs/jwt_structure.png)

## Big world alert: encoding vs encryption

- **Encoding**: is **data transformation** and the goal is not to keep the data secret but to **ensure the data has the right format** for proper consumption.

  ```
  querystring.stringify({"url": "http://domain.com"});
// outputs 'url=http%3A%2F%2Fdomain.com'
  ```

- **Encryption**:  is **data transformation** where the goal is to **ensure that data cannot be consumed by any other user except for the intended recipients**.

Example:
A hashing algorithm or in practice, the bcrypt Node module to encrypt user passwords.

### 1. Header
- an encoded representation of a simple JavaScript oject

### 2. Payload
- encoded???
- the length of the payload is proportional to the amount of data you store in the token

### 3. Signature
- it is created based on the heather and payload
- it is encoded and encrypted

## Resources
[medium article on understandinf JWTs](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec#.z80hda8ty)
[]()
[]()
