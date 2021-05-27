FROM node:14.17-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --only prod
COPY ./ ./
RUN npm run tsc
EXPOSE 4000
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npm", "run", "start"]
