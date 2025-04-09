# Step 1: Use the official Node.js image as the base image
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the entire project into the container
COPY . .


# Step 7: Use an Nginx image to serve the production build
#FROM nginx:alpine

# Step 8: Copy the build output to the Nginx HTML folder
#COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the port Nginx is running on (default is 80)
EXPOSE 3002

# Step 10: Start Nginx to serve the app
#CMD ["nginx", "-g", "daemon off;"]

CMD ["npm","run","start"]
