# Set in non-interactive mode.
ARG DEBIAN_FRONTEND=noninteractive

FROM ubuntu:22.04 AS base
LABEL maintainer="docker@mazgi.com"
ARG NODE_USER_GID=10000
ARG NODE_USER_UID=10000
# https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V18.md
ARG NODE_VERSION=18.12.1
RUN :\
  && : Create the node user: UID=${NODE_USER_UID}, GID=${NODE_USER_GID}\
  && groupadd --gid ${NODE_USER_GID} node\
  && useradd --uid ${NODE_USER_UID} --gid node --shell /bin/bash --create-home node\
  #   && :
  # RUN :\
  && : Create the working directory\
  && mkdir /workspace\
  && chown -R node:node /workspace\
  #   && :
  # RUN :\
  && : Install basic packages\
  && echo 'apt::install-recommends "false";' > /etc/apt/apt.conf.d/no-install-recommends\
  && apt-get update\
  && apt-get install --assume-yes\
  tini\
  ca-certificates\
  curl\
  #   && :
  # RUN :\
  && : Install Node.js\
  && curl -o /tmp/nodejs.deb -fsSL https://deb.nodesource.com/node_18.x/pool/main/n/nodejs/nodejs_${NODE_VERSION}-deb-1nodesource1_amd64.deb\
  && apt-get install --assume-yes /tmp/nodejs.deb\
  && rm -f /tmp/nodejs.deb\
  #   && :
  # RUN :\
  && : Clean up\
  && apt-get clean autoclean\
  && apt-get autoremove --yes\
  && rm -rf /tmp/*\
  && rm -rf /var/lib/apt/\
  && rm -rf /var/log/*\
  && :
ENTRYPOINT ["/usr/bin/tini", "--"]
WORKDIR /workspace
USER node

FROM base AS builder-base
# become the root user temporally to install OS packages.
USER root
RUN :\
  && apt-get update\
  && apt-get install --assume-yes\
  jq\
  && :
# restore the user
USER node

# ================
# BFF
# ----------------
FROM builder-base AS bff-builder
COPY --chown=node:node bff ./
ARG GIT_SHORT_SHA
RUN : Update pkg version with GIT_SHORT_SHA: ${GIT_SHORT_SHA}\
  && test ! -z "${GIT_SHORT_SHA}"\
  && jq '.version += "+'${GIT_SHORT_SHA}'"' package.json | tee /tmp/package.json\
  && cat /tmp/package.json > package.json\
  && :
RUN : Install deps\
  && npm clean-install\
  && npm run build\
  && npm run prisma:generate\
  && :

FROM base AS bff-runner
ENV DATABASE_URL=
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE ${PORT}
COPY --from=bff-builder --chown=node:node /workspace/package*.json ./
RUN :\
  && npm clean-install --only=production\
  && npm cache clean --force\
  && :
COPY --from=bff-builder --chown=node:node /workspace/dist ./dist
COPY --from=bff-builder --chown=node:node /workspace/node_modules/.prisma ./node_modules/.prisma
CMD [ "npm", "run", "start:prod" ]
HEALTHCHECK --interval=2s --timeout=1s --start-period=10s --retries=2\
  CMD curl --fail --output /dev/null --silent "http://localhost:${PORT}/openapi/status"
# ================

# ================
# Frontend
# ----------------
FROM builder-base AS frontend-builder
COPY --chown=node:node frontend ./
ARG GIT_SHORT_SHA
RUN : Update pkg version with GIT_SHORT_SHA: ${GIT_SHORT_SHA}\
  && test ! -z "${GIT_SHORT_SHA}"\
  && jq '.version += "+'${GIT_SHORT_SHA}'"' package.json | tee /tmp/package.json\
  && cat /tmp/package.json > package.json\
  && :
RUN : Install deps\
  && npm clean-install --only=production\
  && npm cache clean --force\
  && npm run build\
  && :

FROM base AS frontend-runner
ENV NODE_ENV=production
# https://github.com/vercel/next.js/pull/26066#issue-920261025
# > Adds support for PORT (See Added support for process.env.PORT #11408)
ENV PORT=3000
EXPOSE ${PORT}
COPY --from=frontend-builder --chown=node:node /workspace/public ./public
COPY --from=frontend-builder --chown=node:node /workspace/.next/standalone ./
COPY --from=frontend-builder --chown=node:node /workspace/.next/static ./.next/static
CMD [ "node", "server.js" ]
HEALTHCHECK --interval=2s --timeout=1s --start-period=10s --retries=2\
  CMD curl --fail --output /dev/null --silent "http://localhost:${PORT}/api/status"
# ================
