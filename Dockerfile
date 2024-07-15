FROM node:lts-alpine3.20

WORKDIR /app/dyn-ip

# Copy application files
COPY package.json .
RUN npm install
COPY . .

RUN touch crontab.tmp \
    && echo '0 * * * * cd /app/dyn-ip/ && node src/main.js' > crontab.tmp \
    && crontab crontab.tmp \
    && rm -rf crontab.tmp

CMD ["/usr/sbin/crond", "-f", "-d", "0"]