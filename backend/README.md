## Setting up environment variables
To run the application first setup a `.env` file in the `backend/` folder.
The `.env` file should contain:
```
#For JSON Web Token
JWT_SECRET=<A strong password>
JWT_ADMIN_SECRET=<A strong password>

#Database Connection URL
DB_URL=<Connection string of MongoDB>

#A Default admin account for initial login
DEFAULT_ADMIN_USERNAME=<email address>
DEFAULT_ADMIN_PASSWORD=<A strong password>

#For sending OTP
GMAIL_ADDRESS=<A valid gmail address>
GMAIL_APP_PASSWORD=<App password of the above email address>
#Above app password will look something like this: 'aaaa bbbb cccc dddd'
```

I used Gmail to send emails just for simplicity's sake. To generate `GMAIL_APP_PASSWORD` you can follow this [guide](https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237).

The `DEFAULT_ADMIN_USERNAME` doesn't "have" to be a real email but it should have the structure of an email. This account is needed because for security reasons, only an admin can create other admin accounts. Therefore you will use this account to first login and create accounts.

Do not use the same strong password for all. Use different passwords for all. The only password you might use is the `DEFAULT_ADMIN_PASSWORD` , rest are for initial setup purposes only. 
## Run the App

Make sure [NodeJs](https://nodejs.org/en/download/prebuilt-installer) is installed on the computer.
### To run the backend:
1. Open the `backend/` folder
2. Open terminal in the folder, by right clicking and selecting the option. 
3. Run `npm install`
4. Run `npm start`
5. The server will be started
