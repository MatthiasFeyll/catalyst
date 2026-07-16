setup: ## setup environment
	chmod +x deploy/deploy.sh
	docker-compose -f docker/docker-compose.yml build --no-cache;
	make up;
	php ./composer.phar install --no-dev --optimize-autoloader
	php bin/console cache:clear --no-warmup
	npm install
	npm rebuild node-sass
	npm run build-dev
	echo successfully build;

up: ## start environment
	docker-compose -f docker/docker-compose.yml up -d;

down: ## stop all docker container
	docker-compose -f docker/docker-compose.yml kill

remove: ## remove docker environment
	make down;
	docker-compose -f docker/docker-compose.yml rm -vf;

reset: ## rebuild docker environment
	make remove;
	make setup;

deployment: ## deploy app
	./deploy/deploy.sh;

test:
	npm run test