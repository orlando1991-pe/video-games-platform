FROM node:20-alpine

WORKDIR /app

COPY yarn.lock ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 5173

CMD ["yarn", "preview", "--host"]