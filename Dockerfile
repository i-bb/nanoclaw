FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY dist/ ./dist/

ENV NODE_ENV=production
EXPOSE 3001

CMD ["npm", "start"]
