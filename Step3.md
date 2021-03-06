#### Create a JWT in three steps:

## JWTs under the hood

A JSON Web Token consists of three strings separated by dots.
![JWT structure](./imgs/jwt_structure.png)

### 1) Create header (algorithm and token type) using encoding
- an encoded representation of a simple JavaScript object
- tells how the JWT signature should be computed.

Example (JSON object - remove comments before using)
```javascript
{
  // declare type of header
  "typ": "JWT",
  // define the hashing algorithm
  // in this case HMAC - SHA256
  "alg": "HS256"
}
```
*Note*: In order for the transmitted information to be verified, it has to be digitally signed. JWTs can be signed using a secret (with HMAC algorithm) or a public/private key pair using RSA.

If you then `base64UrlEncode` (this is not a built-in JavaScript function) the header JSON object, you get the string `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` for the first part of the JWT.

### 2) Create payload (bulk of information) using encoding

- encoded
- the length of the payload is proportional to the amount of data you store in the token  
It can contain reserved, public and private claims (i.e. statements about different entities such as the user and additional metadata).  

*Example (JSON object - remove comments before using)*
```javascript
{
  // reserved claim for the issuer of the token
  "iss": "scotch.io",
  // reserved claim - expiration in NumericDate value.
  // The expiration MUST be after the current date/time.
  "exp": 1300819380,
  // public claim
  "name": "Chris Sevilleja",
  // public claim
  "admin": true
}
```
*Note*: private claims have to be agreed between a producer and a consumer. Use with caution as these are subject to collision.

If you then `base64UrlEncode` (this is not a built-in JavaScript function) the payload json object, you get the string `eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0` for the second part of the JWT.

### 3) Create signature using encryption and encoding
- created based on the header and payload
- encoded and signed  
You take the encoded header and the encoded payload. Using these and the algorithm specified in the header, you: generate a secret, encode all components and sign the JWT.

*Example (JSON object - remove comments before using)*   
```javascript
  HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  'secret')
```
The snippet above generates the third part of the JWT, which is the signature held by the server that is used to verify existing tokens and sign new ones: `03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773`

Combining all three parts above, the JWT looks like this:
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773`

[Step 4 - JWT and hapi-auth-jwt2 example](./Step4.md)

Resources:
- [JWT decoder](https://jwt.io/)
- [JWTs](https://jwt.io/introduction/)
