FROM ubuntu:20.04

ENV OS_LOCALE="ja_JP.UTF-8" \
    DEBIAN_FRONTEND=noninteractive

ENV TZ=Asia/Ho_Chi_Minh
ENV LANG=ja_JP.UTF-8
ENV LANGUAGE=ja_JP:ja 
ENV LC_ALL=ja_JP.UTF-8

RUN apt-get update && apt-get install -y locales
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP.UTF-8

ENV PHP_RUN_DIR=/run/php \
    PHP_LOG_DIR=/var/log/php \
    PHP_CONF_DIR=/etc/php/8.1 \
    PHP_DATA_DIR=/var/lib/php

RUN \
    BUILD_DEPS='software-properties-common' \
    && dpkg-reconfigure locales \
    # Install common libraries
    && apt-get install --no-install-recommends -y $BUILD_DEPS \
    && add-apt-repository -y ppa:ondrej/php \
    && apt-get update

# Install PHP libraries
# php8.1-mcrypt not support and move to PECL. Use extension Sodium: http://php.net/manual/book.sodium.php
RUN apt-get install -y curl \
    php8.1-common \
    php8.1-gd \
    php8.1-readline \
    php8.1-xsl \
    php8.1-apcu \
    php8.1-curl \
    php8.1-mailparse \
    php8.1-opcache \
    php8.1-redis \
    php8.1-mbstring \
    php8.1-yaml \
    php8.1-bcmath \
    php8.1-uuid \
    php8.1-zip \
    php8.1-bz2 \
    php8.1-xdebug \
    php8.1-cgi \
    php8.1-mysql \
    php8.1-cli \
    php8.1-fpm \
    php8.1-intl \
    php8.1-oauth \
    php8.1-xml

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && mkdir -p ${PHP_LOG_DIR} ${PHP_RUN_DIR} 

# Cleaning
RUN apt-get purge -y --auto-remove $BUILD_DEPS \
    && apt-get autoremove -y && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ./docker_config/php/php-fpm.conf ${PHP_CONF_DIR}/fpm/php-fpm.conf
COPY ./docker_config/php/www.conf ${PHP_CONF_DIR}/fpm/pool.d/www.conf
COPY ./docker_config/php/php.ini ${PHP_CONF_DIR}/fpm/conf.d/custom.ini

RUN sed -i "s~PHP_RUN_DIR~${PHP_RUN_DIR}~g" ${PHP_CONF_DIR}/fpm/php-fpm.conf \
    && sed -i "s~PHP_LOG_DIR~${PHP_LOG_DIR}~g" ${PHP_CONF_DIR}/fpm/php-fpm.conf \
    && chown www-data:www-data ${PHP_DATA_DIR} -Rf

WORKDIR /var/www/html

EXPOSE 9000

# PHP_DATA_DIR store sessions
VOLUME ["${PHP_RUN_DIR}", "${PHP_DATA_DIR}"]
CMD ["/usr/sbin/php-fpm8.1"]