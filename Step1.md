# Big world alert: encoding vs encryption vs hashing

To understand how JSON Web Tokens are built, it is important to understand the difference between encryption,
encoding, and hashing.

## 1. Encoding
- **Encoding**: is **data transformation** and the goal is not to keep the data secret but to **ensure the data has the right format** for proper consumption.

Example:
  ```
  querystring.stringify({"url": "http://domain.com"});
  // outputs 'url=http%3A%2F%2Fdomain.com'
  ```

## 2. Encryption
- **Encryption**:  is **data transformation** where the goal is to **ensure that data cannot be consumed by any other user except for the intended recipients**. The data is converted to an unrecognizable (encrypted) form. It is used to protect sensitive information, since **decrypting encrypted data is only possible with the corresponding key**

Examples:

- **Symmetric key algorithms** use related or identical encryption keys for both encryption and decryption.
  E.g. John uses the key 'my-super-secret-key' to encrypt his secret message to James, he will be able to decrypt the message with the same key ('my-super-secret-key').
- **Asymmetric key algorithms** use different keys for encryption and decryption.
  - one key (the public key) is used to encrypt the message,
  - the other key (private key) can only be used to decrypt the message.
  John generates a public/private key pair.  
  He uses the public key to encrypt his messages. He has to send the private key to James, so that James can encrypt the messages. The encrypted messages can only be decrypted using the private key.

## 3. Hashing vs Encryption
Don't encrypt passwords. Though secure when encrypted, the **passwords can be decrypted with the encryption key**. Our program will need to save it somewhere in order to use it. So we are vulnerable to attacks that steal the encryption key and decrypt all the passwords.

Instead we should 'hash' passwords. Hashing is similar to encryption except that it is a one-way process and does not require a secret key. Each time we give a hash function the same input we get the same output. But we can't use the output to calculate the input. For example: 15 % 10 will always be 5. But if we have n % 10 = 5 we can't work out what n is, because there are infinite possibilities (5, 15, 25...).

## 4. Hacker attacks

- Dictionary attack: uses a list of  words, phrases and expressions commonly used as passwords. Each word in the list is hashed, and compared to the hashed password. If they match, the hacker finds the password.

- Brute force attack: tries every possible combination of characters up to a certain length. It is computationally expensive (takes a long time), but they can always find the password. If the passwords are long enough, it is too computationally expensive to compute them.

- Lookup tables: precompute the hashes of possible passwords and store the pairs (password & hashed password) in a lookup table data structure. If the implementation is good enough, hundreds of hashes can be checked per second.

## 5. Salt factors

A hash function will always give the same output for the same input. So, an attacker with access to a database of hashed passwords could try hashing lots of possible passwords, and seeing if the hashed output matches any of the hashed passwords. Precomputed lists of hashes (called 'hash tables') exist so an attacker doesn't even need to do the computation themselves.

To defend against this we should use 'salting'. We append a unique random string (known as the 'salt') to the password before hashing it. The addition of the salt changes the output hash. Hash tables are therefore no longer useful for attackers because the hashes they contain are for passwords without any additional salt.

Of course, if we are to test a user-submitted password against the one stored in the database we need to know the salt so we can add it to the submitted password before hashing. We can store the salt in clear text alongside the password in the database. It is not a problem that an attacker with access to the database could see it, because they'd need to compute the hash of every possible password plus the salt to make any use of it.

The effect of salting is to greatly increase the attacker's computation requirements. This is because, for each password in the database, they need to calculate the hashes of all possible passwords plus the salt until they find a match. Plus, if each salt is unique then two identical passwords will be stored as different hashes because their salts will differ.

Another defensive technique is to add a 'work factor' to the hashing to make the computation harder and therefore slower. The aim is to make the computation seem quick to the user but slow enough (e.g. 0.5s) that trying to compute billions of possible passwords becomes unfeasibly slow even with very fast computers.


**Case 1:** To verify a hashed password without salt, you compute ```HS256(password)```, and compare
it with the data stored on the database.

If you have access to a hash table, it is easy to decode the passwords.

if 3 of your users have ```123456``` as its password, and you use ```HS256``` algorithm without a salt to save the password, you database would look like this:  

|username    | password                         |
| ---------- |:--------------------------------:|
|user1       | 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92 |
|user7       | 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92 |
|user13      | 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92 |

As soon as a hacker finds one password in a hash table, he knows all the others.

**Case 2:** all three users have the same password, but you compute ```HS256(password+salt)``` to save the data
into your database. The SALT factor is always 11.


|username    | salt | password                                                         |
| ---------- |:----:|:----------------------------------------------------------------:|
|user1       | 11   | f47bbcf0fa016dcc0d5a0c5b8c22e44e3ef7b59327708d9dee37905b5a95cde0 |
|user7       | 11   | f47bbcf0fa016dcc0d5a0c5b8c22e44e3ef7b59327708d9dee37905b5a95cde0 |
|user13      | 11   | f47bbcf0fa016dcc0d5a0c5b8c22e44e3ef7b59327708d9dee37905b5a95cde0 |

Following this approach, the hacker will have to brute force the hashes to get the passwords. It will slow him down, but as soon as one password is cracked, he knows the others too.

**Case 3:** all the users have the same password, but we compute ```HS256(password+random salt)```  

| username   | salt | password                                                         |
| ---------- |:----:|:----------------------------------------------------------------:|
|user1       |  11  | f47bbcf0fa016dcc0d5a0c5b8c22e44e3ef7b59327708d9dee37905b5a95cde0 |
|user7       |  99  | a2d54cc60a4b8c5c5f14f5bcd8fb8b4f38d8a47e9c0ed4240aa949ce3677cd0d |
|user13      |  22  | dbea1b528e1306ab5d00a6913b091ae0d9fa5a4aa361868ebb20f8a55f957051 |

Even if all your users have the same password, the hacker cannot know without brute forcing every password.

[Step 2 - What are JSON Web Token and why we use them](./Step2.md)

Resources:  
- [Why should i hash passwords?](https://security.stackexchange.com/questions/36833/why-should-i-hash-passwords)  
- [How does a random salt work?](https://security.stackexchange.com/questions/66989/how-does-a-random-salt-work)  
- [How to securely hash passwords?](https://security.stackexchange.com/questions/211/how-to-securely-hash-passwords/31846#31846)  
- [bcrypt hashing vs encryption](http://stackoverflow.com/questions/9035855/is-bcrypt-used-for-hashing-or-encryption-a-bit-of-confusion)  
- [Encryption](https://www.howtogeek.com/howto/33949/htg-explains-what-is-encryption-and-how-does-it-work/)  
- [JSON Web Signature](https://en.wikipedia.org/wiki/JSON_Web_Signature)  
- [Encoding vs Encryption](http://stackoverflow.com/questions/4657416/difference-between-encoding-and-encryption)
- [Symmetric vs Asymmetric encryption](https://www.ssl2buy.com/wiki/symmetric-vs-asymmetric-encryption-what-are-differences)
- [hash generator](http://www.freeformatter.com/hmac-generator.html)
