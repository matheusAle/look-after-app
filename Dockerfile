FROM finizco/nginx-node:latest as node
WORKDIR /app

COPY package.json /app/

RUN npm i npm@latest json-server -g

RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
COPY --from=node db.json /
CMD "cd /app && ls -la"
