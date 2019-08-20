FROM apache/couchdb:${DOCKER_TAG:-latest}

RUN mkdir /etc/couchdb/cert && \
    cd /etc/couchdb/cert && \
    openssl genrsa > privkey.pem && \
    openssl req -new -x509 -key privkey.pem -out couchdb.pem -days 1095 \
    -subj "/C=AR/ST=Argentina/L=Argentina/O=Global Security/OU=IT Department/CN=localhost" && \
    chmod 600 privkey.pem couchdb.pem && \
    chown couchdb privkey.pem couchdb.pem

RUN echo "[ssl]" | tee -a /opt/couchdb/etc/local.ini && \
    echo "enable = true" | tee -a /opt/couchdb/etc/local.ini && \
    echo "cert_file = /etc/couchdb/cert/couchdb.pem" | tee -a /opt/couchdb/etc/local.ini && \
    echo "key_file = /etc/couchdb/cert/privkey.pem" | tee -a /opt/couchdb/etc/local.ini     

# WORKDIR /usr/src/app

# COPY ./package*.json ./
# RUN npm install
# RUN npm install -g webpack webpack-cli

# COPY . .

# CMD [ "npm", "start" ]

