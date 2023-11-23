# Slide Macro - an Atlassian Connect App using Express

Slide Macro is a replacement of the Page Properties Macro for slides rendering in Konviw.

#### Development environment
Create & configure `credentials.json` in the project root
```json
{
  "hosts" : {
     "sanofiprojects-sandbox-686.atlassian.net": {
        "product" : "confluence",
        "username" : "username@sanofi.com",
        "password" : "YOUR_SECRET_KEY"
     }
  }
}
```

You can generate confluence API KEY at this page: https://id.atlassian.com/manage-profile/security/api-tokens

Install dependencies
```bash
npm install
```

Configure local tunnel uzywajac dokumentacji at this page: http://ngrok.com

Configure .env file
```bash
APP_PORT=8080
APP_BASE_URL=/
NODE_ENV=development
```

Run macro
```bash
npm start
```

#### Deployment

Configure .env file
```bash
APP_PORT=8080
APP_BASE_URL=/
POSTGRES_USERNAME
POSTGRES_PASSWORD
POSTGRES_URL
POSTGRES_PORT
POSTGRES_DB
NODE_ENV=deployment
```

#### Deployment strategy

1. Configure project in Openshift
2. You need to be authenticated to Your Artficatory for example JFrog
3. Create Docker image locally using:
```bash
docker build --build-arg APP_BASE_URL=<URL> -f ./Dockerfile -t konviw-slides:<VERSION> .
```
4. Create Tag on that image using:
```bash
docker tag <IMAGE_ID> <IMAGE>:latest
docker tag <IMAGE_ID> <IMAGE>:<VERSION>
```
5. Push images to artifactory using:
```bash
docker push <IMAGE>:<VERSION>
docker push <IMAGE>:latest
```
5. Create application in openshift using option Container Images
6. Once application is configured You need to open Workloads -> Deployments section using Administrator Access in which You need to specify envivonment variables:
```bash
APP_PORT=8080
POSTGRES_USERNAME - Specify value once You will create step 8.
POSTGRES_PASSWORD - Specify value once You will create step 8.
POSTGRES_URL - Specify value once You will create step 8 - POSTGRES_URL it is a POD IP
POSTGRES_PORT - Specify value once You will create step 8.
POSTGRES_DB - Specify value once You will create step 8.
HTTP_PROXY
http_proxy
HTTPS_PROXY
https_proxy
no_proxy - Please include IP of Your POD database
NO_PROXY - Please include IP of Your POD database
```
7. Once envivonment variables configuration is done we need to create postgres database using option Container Images. In image path/name specify (one of them):
```bash
registry.redhat.io/rhel8/postgresql-12
rhel8/postgresql-12
```
8. Once service with pod is created You need to You need to open Workloads -> Deployments section using Administrator Access in which You need to specify envivonment variables for database:
```bash
POSTGRESQL_ADMIN_PASSWORD
POSTGRESQL_DATABASE
POSTGRESQL_PASSWORD
POSTGRESQL_USER
```
POSTGRESQL_ADMIN_PASSWORD
9. Last step is to create Visual connector (You can do it using arrow between Application and Postgres Database)

#### Links
- Red Hat OpenShift -> https://www.redhat.com/en/technologies/cloud-computing/openshift/container-platform

### Support
- If You are interested about connecting for VERCEL EDGE CONFIG please refer to: https://github.com/Sanofi-IADC/konviw-slides/commit/1adc539bb8e58ee883717d1ebd5220ada7132c66
