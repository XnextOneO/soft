FROM node:lts as dependencies
WORKDIR /iis-gui
COPY package.json package-lock.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /iis-gui
COPY . .
COPY --from=dependencies /iis-gui/node_modules ./node_modules
RUN npm build

FROM node:lts as runner
WORKDIR /iis-gui

COPY --from=builder /iis-gui/public ./public
COPY --from=builder /iis-gui/package.json ./package.json
COPY --from=builder /iis-gui/.next ./.next
COPY --from=builder /iis-gui/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]