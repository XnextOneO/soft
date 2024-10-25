# FROM node:latest
# WORKDIR /iis-gui
# COPY package.json package-lock.json ./
# RUN npm install --legacy-peer-deps

# FROM node:latest as builder
# WORKDIR /iis-gui
# COPY . .
# COPY node_modules ./node_modules
# RUN npm build

# FROM node:latest as runner
# WORKDIR /iis-gui

# COPY public ./public
# COPY --from=builder /iis-gui/package.json ./package.json
# COPY .next ./.next
# COPY --from=builder /iis-gui/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]