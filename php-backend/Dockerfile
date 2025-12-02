FROM php:8.3-cli

RUN apt-get update \
  && apt-get install -y --no-install-recommends libpq-dev git unzip \
  && docker-php-ext-install pdo pdo_pgsql \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
