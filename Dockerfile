# #############################################################################
# Builder
# #############################################################################
FROM node:12 AS builder

# Setup the working directory
WORKDIR /usr/src/app
COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

# Build the application
ENV NODE_ENV production
RUN npm run build

# #############################################################################
# Runner
# #############################################################################
FROM node:alpine

# Create a new user... don't run as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Setup the working directory
WORKDIR /usr/src/app
COPY package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build

# Set app configuration
ENV PORT 5000
ENV NODE_ENV production
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]