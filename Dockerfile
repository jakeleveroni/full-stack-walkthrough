# ---------------------------------------------
# MULTI STAGE DOCKERFILE EXAMPLE
# ---------------------------------------------

# pull base image that comes with bun intalled
FROM oven/bun:1 AS base

# set out working directory to /app
WORKDIR /app

# ---------------------------------------------
# STAGE 1 -- install deps
# ---------------------------------------------

# NOTE we can combine this layer and the build layer but the benefit of keeping them separate is that if only our source code changes and not our deps this
# layer is cached and will not be re-built. So keeping it isolated can help for faster iteration when only source code changes

# create a new layer called `install` using the base from above as the starting layer
FROM base AS install

# install dependencies specified in our package.json
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---------------------------------------------
# STAGE 2 -- bundle application
# ---------------------------------------------

# create new layer called `build`, this layer will be used to bundle out application
FROM base AS build

# copy the node modules from the stage 1 `install` layer into the stage 2 `build` layer
COPY --from=install /app/node_modules ./node_modules

# copy our source code from our local device into the `build` layer
COPY . .

# now that we have the deps and source in our build layer bundle the app
RUN bun run build

# ---------------------------------------------
#  STAGE 3 -- runtime configuration and startup
# ---------------------------------------------
FROM base AS runtime
WORKDIR /app

# copy our final bundle into the `runtime` layer
COPY --from=build /app/dist ./dist

# copy our dependenxies into the `runtime` layer
COPY --from=build /app/node_modules ./node_modules

# copy our package.json into the runtime layer (TODO i think this is unneeded)
COPY package.json ./

# Expose the port we want to run on
EXPOSE 4040

# set env variables you want here
ENV NODE_ENV=production
# local loopback and port definition not sure if needed since our app doesnt reference them
ENV HOST=0.0.0.0
ENV PORT=4040

# Start the bun server process
CMD ["bun", "./dist/index.js"]
