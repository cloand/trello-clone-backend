# get node version 3.17
FROM node:lts-alpine3.17 AS builder

# set workdir
WORKDIR /app

# copy dependency files
COPY package*.json ./
COPY package-lock*.json ./

# install dependencies
RUN npm ci

COPY . .

# create build
RUN npm run build

FROM node:lts-alpine3.17 as build

# copy required files in image
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# port for listening traffic
EXPOSE 80  

# run cmd
CMD ["node","dist/main"]
