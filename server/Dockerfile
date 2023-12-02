# Use a Node.js base image with a specific version
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Compile TypeScript files
RUN npm run build

# Expose the port that the server will run on
EXPOSE 3000
EXPOSE 3001

# Command to start the server
CMD ["npm", "start"]