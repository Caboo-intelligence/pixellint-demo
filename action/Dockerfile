FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    jq \
    bc \
    bash

# Install pixellint from npm (when published)
RUN npm install -g pixellint@latest

# Copy entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]