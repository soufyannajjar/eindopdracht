FROM node:14

COPY src /workdir/src

COPY package*.json /workdir/

WORKDIR /workdir
RUN mkdir uploads
RUN npm install --quiet || cat npm-debug.log

EXPOSE 3000

CMD ["npm", "start"]