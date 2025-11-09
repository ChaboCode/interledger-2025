# Use an Alpine-based Node.js image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

#ENV PORT=3000
#ENV MONGO_URI=mongodb://admin:admin123@mongo:27017/

# Command to run the application
CMD ["node", "src/index.js"]

#⣿⣿⣿⡇⣿⣿⣿⣿⣿⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⡏⢸⣿⡆⣿⡇⠶⠟⣛⣩
#⣿⣿⣿⠃⣿⣿⣿⣿⡿⠀⠟⢛⣛⣛⢻⣿⣿⣿⣿⢰⡇⠀⣶⠀⣦⣬⡁⢻⣿⣿
#⣿⣿⣿⠀⣿⢛⣩⣴⣶⢠⢸⣿⣿⡇⢸⣿⣿⢻⡇⣼⢠⠀⣿⠀⢻⣿⡇⢸⣿⣿
#⣿⣿⣿⡇⣿⣿⣿⣿⡏⢸⡘⣿⣿⠀⣿⣿⡿⢸⢁⢃⣾⠀⡿⢸⡆⣿⡇⢸⣿⣿
#⣿⣿⣿⡇⢿⠃⠻⣿⡇⣸⣷⡈⡇⠂⣿⠟⡁⠀⡈⣼⣿⢀⢃⣿⣧⠘⣰⡆⠉⢿
#⣿⣿⣿⡇⡈⠈⣷⣌⡃⣿⣿⣷⣀⠀⢋⣼⢃⠂⣰⣿⡿⢈⣼⣿⣿⣴⣿⡇⣸⢸
#⣿⣿⣿⠁⢳⡠⠛⣛⣉⣭⣭⣍⣙⣻⣿⣷⣾⣾⣿⣿⣿⣿⣭⠤⢶⠒⠶⣬⣿⠸
#⡈⣙⢛⡃⠾⠟⡋⠉⡁⢤⡀⢀⣉⡛⢿⣿⣿⣿⣿⣿⣿⣏⠀⠴⠉⠟⣸⠆⡉⢠
#⣷⡦⢰⡇⣶⣀⣉⣭⣤⣬⣥⣬⣭⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⣿
#⣿⠁⣼⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡍⣿⣿⣿⣿⣿⣿⣿⢠⣿
#⣿⠀⣿⡇⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢸⣿
#⠇⡄⢻⣷⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⣾⡟
#⡄⠸⠘⣿⡇⢻⣿⣿⣿⣿⣿⣿⣿⣿⡟⠻⣿⣿⣿⣿⠟⣻⣿⣿⣿⣿⠏⡼⠟
#⠓⡀⠲⣌⣉⣈⠻⢿⣿⣿⣿⣿⣿⣿⣿⣷⣬⣭⣉⣥⣾⣿⣿⣿⠟⡁⢰⡀⠶⣶
#⠸⢿⡷⠀⠸⠿⣷⡆⣌⡛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣡⣾⣇⢸⡇⡆⣿