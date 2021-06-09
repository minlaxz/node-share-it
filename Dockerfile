FROM node:14.16.1-stretch-slim

# Create app directory
WORKDIR /usr/src/app
RUN mkdir -p uploads
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# COPY --from=builder --chown=node:node /usr/src/app .
USER node

EXPOSE 3000
CMD [ "yarn", "start" ]
