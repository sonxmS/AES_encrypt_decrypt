## 🔐AES Encrypt & Decrypt API

The app has two basic functions:

- **/encrypt**: Takes a string (`encryptvalue`) and returns it wrapped with `x` on both sides.  
  _Example_: `hello` → `xhellox`

- **/decrypt**: Takes a string (`decryptvalue`) wrapped in `x` and removes the outer characters.  
  _Example_: `xhellox` → `hello`

Inputs are validated using Zod to ensure correct format.
