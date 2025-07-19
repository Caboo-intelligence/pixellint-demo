# PixelLint GitHub Action Docker Image
FROM node:18-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    jq \
    bc \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install pixellint globally (when published to npm)
# For now, we'll copy from local build
# RUN npm install -g pixellint

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]