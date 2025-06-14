## 🔐AES Encrypt & Decrypt API

The app has two basic functions:

- **/encrypt**: Takes a **JSON** string (`encryptvalue`) and encrypts it using `AES Encryption`

- **/decrypt**: Takes an encrypted string (`decryptvalue`) as input and returns the original JSON string

Inputs are validated using Zod to ensure correct format.
