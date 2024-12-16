FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm config set strict-ssl false && npm config set registry "http://registry.npmjs.org/" && npm config set proxy http://proxy.bb.asb:3128 && npm config set https-proxy http://proxy.bb.asb:3128 && npm i --legacy-peer-deps
COPY . ./
RUN npm run build
CMD ["npm", "run", "start:prod"]
