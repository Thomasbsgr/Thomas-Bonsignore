# Next.js templates

## GitHub workflow

There is nothing to change unless you are importing a **personal private package** from GitHub. In that case, update the `docker-publish.yml` file with the content below.

```yml
name: Build and Publish Docker Image
on:
  push:
    tags:
      - 'v*'
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v')
    permissions:
      contents: read
      packages: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Create .npmrc file
        run: |
          echo "@thomasbsgr-jarvis:registry=https://npm.pkg.github.com" > .npmrc
          echo "//npm.pkg.github.com/:_authToken=${{ secrets.NPM_TOKEN }}" >> .npmrc
      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=semver,pattern=v{{version}}
            type=raw,value=latest
      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile
          push: true
          platforms: linux/amd64
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          secret-files: |
            npmrc=./.npmrc
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

Next, you need to create a **GitHub access token** and add it to the repository variables with the name `NPM_TOKEN`.

You also need to modify the `Dockerfile`: change the `RUN npm ci` line and replace it with the line below.

```Dockerfile
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
  npm ci
```

Don't forget to configure the .npmrc file with the correct organisation name or username, as well as the access token.

## Environment variables

If you have any **environment variables**, you must add them to the `.env.example` file. 

Also, remember to add the lines below to the `Dockerfile`.

```Dockerfile
ARG NAME=placeholder
ENV NAME=$NAME
```

## Docker Compose

Modify the Docker Compose file to add your container name.

## Last step

**Delete** the entire `README` and replace it with your repository's title.
