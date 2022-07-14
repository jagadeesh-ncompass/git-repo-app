
## Start Redis

```bash
    # start redis
    sudo service redis-server start
```
## Start NestJs Server
```
# install packages
cd server && npm install
# start server
npm start or npm run start:dev in development
```

## How to start cron
```
# install packages
cd cron && npm install
# start cron
npm start
```

## How to run Frontend
```
# install packages
cd client && npm install
# start server
npm start
```

## How to test
Install [Postman](https://www.getpostman.com/)
## API endpoints

HTTP route prefix : http://localhost:3000/

### API endpoints summary

### Login

Route      | Method | Description
-----------|--------|--------------------
/login     | post    | to get access token

### Repo

Route      | Method | Description
-----------|--------|--------------------
/repositories  | GET    | read repo (Authentication needed)

##### HTTP Request Body Example
```json
{
    "EMAIL" : "****@gmail.com",
    "PASSWORD" : "****"
}
In place of **** => give ur respective email and password
```
##### HTTP Response Body Example
```json
{
    "access_token" : "**************************************************************************"
}
```
##### TOKEN 
 BEARER TOKEN in authorization header
##### HTTP Request Body Example
Repo details will be fetched after logging in
##### HTTP Response Body Example
```json
{
    [
        {
        "id": your_repository_id,
        "username": "your_username",
        "repository_name": "repository_name",
        "repository_url": "https://api.github.com/users/****-****/repos",
        "email": "your_emailId"
        }
    ]
}
```
# SCREENSHOTS

## Login page
![Alt text](images/login-page.png)

## Login page if invalid credential are entered
![Alt text](images/invalid-cred.png)


## DASHBOARD PAGE
![Alt text](images/dashboard.png)
