FROM node:lts AS base
WORKDIR /usr/src
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --ignore-scripts
COPY . ./
ARG BUILD
ENV VITE_BUILD_VERSION=$BUILD 

FROM base AS build
RUN npm run build

FROM nginx:stable-alpine 
COPY --from=build /usr/src/dist /usr/share/nginx/html/www
COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template
RUN chmod -R +rx /usr/share/nginx/html/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

LABEL traefik.http.routers.cameraeventspwa.rule=Host(`ce.elcoyote.dk`)
LABEL traefik.http.routers.cameraeventspwa.tls=true
LABEL traefik.http.routers.cameraeventspwa.tls.certresolver=lets-encrypt
LABEL traefik.http.services.cameraeventspwa.loadbalancer.server.port=80