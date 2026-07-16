FROM php:7.4-fpm

RUN mkdir /app && \
    apt-get update && apt-get install -y --fix-missing \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libmemcached-dev \
        zlib1g-dev \
        libzip-dev \
        libxslt-dev \
        libicu-dev && \
    docker-php-ext-configure intl && \
    docker-php-ext-install intl && \
    apt-get update && \
    apt-get install -y --fix-missing \
        curl \
        libcurl4-openssl-dev \
        pkg-config \
        libssl-dev

CMD ["env >> /.env.local"]

WORKDIR /app
