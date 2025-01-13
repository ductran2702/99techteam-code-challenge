FROM node:18

WORKDIR /usr/src/node-app
COPY . .
# RUN npm install
# RUN npm run build
RUN npx prisma generate
CMD npm start
