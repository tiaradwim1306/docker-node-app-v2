# node-app
## Summary: 
this repository use for learn docker from this tutorial [learn-docker-node-app](https://youtu.be/9zUHg7xjIqQ?si=DRT6G5GfpafxG0WG)

```sh
git clone https://github.com/tiaradwim1306/node-app.git
```

### docker-compose
- create container with image :
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```
- remove container :
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```

### watchtower
function : Watchtower is a tool for automatically updating running Docker containers with the latest available images from a Docker registry. It monitors your Docker containers and, when it detects that a new image is available for a particular container, it automatically pulls the updated image and restarts the container with the new image.
```sh
docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower (name-container)
```

### swarm 
function : Docker Swarm is a native clustering and orchestration solution for Docker. It allows you to create and manage a swarm of Docker nodes, turning a group of Docker hosts into a single, virtual Docker host. This enables you to deploy and manage containerized applications at scale.
```sh
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml (name-swarm)
```
