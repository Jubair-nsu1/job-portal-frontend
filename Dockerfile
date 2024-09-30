FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Build and optimize static file
RUN npm run build

# Stage-2
# FROM nginx:1.25.2-alpine-slim

# Copy the static file to my Nginx folder to serve static contain
# COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000

CMD [ "npm", "start" ]  

# Run nginx in the foreground
# CMD ["nginx", "-g", "daemon off;"]