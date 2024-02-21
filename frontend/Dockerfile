FROM nginx:latest

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY dist/ .

CMD ["nginx", "-g", "daemon off;"]
