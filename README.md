# Algalon

Algalon is a log analysis tool built for World of Warcraft Classic

## Config

```
cp ./config-sample.json ./config.json
```

Copy the sample config in the root directory and modify with your information. The app needs an API key for [Warcraft Logs](https://www.warcraftlogs.com) to function.

### Running Back End

To start the server:

```
cd backend
npm install
```

Then run the script for either `dev` or `prod`

```
npm run dev
``` 

The server is available at the port specified in `config.json`

### Developing the Front End

To start the server:

```
cd frontend
npm install
```

Then run the start script

```
npm start
```

The server is available at the port specified in `config.json`

### Deploying the Front End

Work in progress