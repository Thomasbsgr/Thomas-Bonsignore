# Utils

## Docker compose

To restart a container by pulling the latest image
```bash
docker compose up -d --pull always
```

## Login ghrc.io
```bash
echo "TON_TOKEN" | docker login ghcr.io -u Thomasbsgr --password-stdin
```

## Caddy

```yml
services:
  caddy:
    image: caddy:2.11.4-alpine
    container_name: caddy
    restart: unless-stopped
    networks:
      - caddy
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./conf:/etc/caddy
      - ./site:/srv
      - caddy_data:/data
      - caddy_config:/config

volumes:
  caddy_data:
  caddy_config:

networks:
  caddy:
    external: true
```

```bash
docker network create caddy
```

```bash
micro conf/Caddyfile
```

```
URL {
  reverse_proxy jarvis-web:3000
}
```
