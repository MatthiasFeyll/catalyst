FROM php:7.4-fpm

COPY ./composer.phar  /usr/local/bin/composer

RUN mkdir /app && \
    mkdir /.composer/ && \
    chmod 777 /.composer && \
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
    docker-php-ext-configure gd && \
    docker-php-ext-install -j$(nproc) gd && \
    docker-php-ext-install mysqli && \
    docker-php-ext-install zip && \
    docker-php-ext-install pdo pdo_mysql && \
    docker-php-ext-install -j$(nproc) xsl && \
    apt-get update && \
    apt-get install -y --fix-missing \
        curl \
        libcurl4-openssl-dev \
        pkg-config \
        libssl-dev

WORKDIR /app
