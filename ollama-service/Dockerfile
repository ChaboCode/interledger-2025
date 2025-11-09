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
EXPOSE 8080

# Command to run the application
CMD ["node", "service.js"]

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