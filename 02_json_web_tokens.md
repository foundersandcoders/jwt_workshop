## What is a JSON web token(JWT)?

> A JSON web token (JWT) is a JSON object, which is a safe way to represent and transmit a set of inromation between two parties. The token is composed of a header, a payload and a signature.

*(Please note that a double quoted string is  considered a valid JSON object.)*

- JWT are used across several programming languages .NET, Python, Node.js, Java, PHP, Ruby, Go, JavaScript, and Haskell.
- **JWTs are self-contained** which means that the payload contains all the necessary information about the user, avoiding to query the database more than once.
- JWTs are versatile and can be passed around easily. They are small, so they can be sent through **URL**, **POST parameters** or inside an **HTTP header**.

## When should you use JSON web tokens?

- **Authentication**: the most common use of JWTs. After logging in, each subsequent request will contain the JWT, allowing the user to access the routes and services that are alowed with that token.

- **Information exchange**: JWTs can be used to securely transmit information between parties, since they are signed e.g.: using public/private key pairs. The signature is determined based on both the header and the payload using a hashing algorithm, so you can check that the content hasn't been tampered with.

## How do JWTs work?
![JWTs explained](./imgs/jwts_explained.png)

- authentication server: facebook, google, linkedin,github ...etc
- application server: the website you make.

The authentication flow:
- the user signs into the authentication server's login system (e.g.: your github username and password)
- if the authentication is successful, the authentication server creates a JWT, and sends it to the user.
- if the user makes an API call to the authentication server, the JWT is sent along with the API call (in the header or in a cookie).
- the applicaton server is able to verify that the JWT was issued by the authentication serrver, hence the API call is from an autheenticated user.


## Resources
- [medium article on understanding JWTs](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec#.z80hda8ty)  
- [JWT signing algorithms overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/)  
- [HWT the right way](https://stormpath.com/blog/jwt-the-right-way)  
