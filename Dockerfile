FROM node

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install
RUN npm install -g webpack webpack-cli

RUN mkdir /etc/cert && \
    cd /etc/cert && \
    openssl genrsa > key.pem && \
    openssl req -new -x509 -key key.pem -out cert.pem -days 1095 \
    -subj "/C=AR/ST=Argentina/L=Argentina/O=Global Security/OU=IT Department/CN=localhost" && \
    chmod 600 key.pem cert.pem && \
    chown node key.pem cert.pem


COPY . .

# CMD [ "npm", "start" ]