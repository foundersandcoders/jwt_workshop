## Questions to ask after each readme

### Encoding vs encryption vs hashing readme

1. Name three examples when you use encoding

2. Draw the symettric and asymmetric encryption flow on the whiteboard and explain it.

Symmetric encryption flow
![Symmetric encryption](../imgs/symmetric_encryption.png)
Asymmetric encryption flow
![Asymmetric encryption](../imgs/asymmetric_encryption2.jpg)

3. Explain why salt factors prevent from hacker attacks

### What are JSON web token and why we use them

1. When and why we use JWTs?
  - self-contained: payload has all the necessary information eg.:
  ```
  let payload = {
      'user': {
          'username': body.login,
          'img_url': body.avatar_url,
          'user_id': body.id
        },
      'accessToken': token.access_token
    };
  ```
  - easy to pass them around in:
      - http headers
      - post parameters
      - query parameters in urls


2. Draw the JWT flow on the whiteboard and explain it

![JSON Web Token flow](../imgs/jwts_explained.png)

### The structure of JSON web tokens

1. Name the three parts of a JWT? Which parts are encoded,signed, or encrypted?
  - header -- encoded
  - payload -- encoded
  - signature -- encoded and signed  


2. Where can you store JWTs? Discuss the advantages and disadvantages of these options?

  - store it in a cookie (adv: client can't read it, disadv: the access stoken is still not protected)
  - store it on the server, save it into a database (adv: hidden from the user disadv: requires more work to implement it )
  - encrypt it (adv: the access token is safe and hidden, disadv: requires more work to implement it)
