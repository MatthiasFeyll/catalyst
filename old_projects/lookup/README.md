# Matthias Feyll - lookup
A personal page to looking up.

## Getting started
This project is basically a website with the possibility to scale up to a real web app.
It's a fully customizable due to the usage of *Symfony* in the backend and *Typescript*, *Bulma* in the frontend. 

## Installation
##### Requirements
You need to have *docker* and *docker-compose* installed. You also need *direnv*

Please be sure there is no other service listening on port 80. Otherwise, you can change the default port at '**DOCKER_WEB_PORT**' in the .env.local

##### Installing
First copy the project and cd into it
````
git clone git@gitlab.com:M-Felly/feyll_lookup.git
cd feyll_lookup 
````

Before we gonna install the dependencies we need to adapt the *.env* file
````
cp .env .env.local
````
For '**APP_SECRET**' generate a secret key from a generator of your choice or [coderstoolbox](https://coderstoolbox.online/toolbox/generate-symfony-secret) \
For '**BIRTH_DATE**' go to [epochconverter](https://www.epochconverter.com/) and insert a birthday. Copy the value in seconds and paste it for your value. (this step is not necessary but there will be a red alert message on the website)

The '**COMPOSE_PROJECT_NAME**' ist just for docker-compose to create containers named by this value. 

Now we are ready to go:
````
make setup
````

The website is now online on http://localhost:80 


## Commands
##### make
Run docker container: ``make up``\
Stop docker container: ``make down``\
Remove environment: ``make remove``\
Rebuild the whole environment: ``make reset``\
Deploy project more above [Deployment](#deployment): ``make deployment``

##### npm
Continuous rebuilding of js, ts and scss code: ``npm run watch``\
Build js, ts and scss code for developing: ``npm run build-dev``\
Build prod version: ``npm run build-prod``

## Deployment
##### Preparation
I'm using netcup for hosting my application and write a deploy script for it: ``./deploy/deploy.sh``\
First of all you have to copy the .env file:
````
cp ./deploy/.env ./deploy/.env.local
````
There you have to parse the username and host of your hosting-service.

##### Procedure
The script clones the master branch of git, installs the dependencies and runs ``npm run build-prod``. After that it zips all necessary files and uploads them to the host. On the host it unzips the archive and run composer. If everything runs successful the current folder swaps with the builded ones.

## Built with
- Symfony
- Bulma
- Typescript

## Author
Matthias Feyll 

## License
This project is under the GNU-License - see the [License](LICENSE) file for details

