# Node MS Accelerator

## Getting started

Download [Docker](https://www.docker.com/products/overview). If you are on Mac or Windows, [Docker Compose](https://docs.docker.com/compose) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).

Run in this directory:
```
docker-compose up
```
The app will be running at [http://localhost:3001](http://localhost:3001).

Alternately, if you want to run it on a [Docker Swarm](https://docs.docker.com/engine/swarm/), first make sure you have a swarm. If you don't, run:
```
docker swarm init
```
Once you have your swarm, in this directory run:
```
docker stack deploy --compose-file docker-stack.yml node_mc_accelerator
```

Alternately, if you want to create multi-service and multi-node application, follow instruction [Docker Stack](https://docs.docker.com/get-started/part5/)

## Architecture

TODO: crete diagram


## Visualization / Monitoring

### Docker Swarm Visualizer

Demo container that displays Docker services running on a Docker Swarm in a diagram.

Each node in the swarm will show all tasks running on it. When a service goes down it'll be removed. When a node goes down it won't, instead the circle at the top will turn red to indicate it went down. Tasks will be removed.
Occasionally the Remote API will return incomplete data, for instance the node can be missing a name.
The Visualizer will be running at [http://localhost:8080](http://localhost:8080).

### Logs

By default, services use a Bunyan stream for saving logs into Elasticsearch.

Kibana Visualizer will be running at [http://localhost:5601](http://localhost:5601).

### Message Broker

RabbitMQ is used as a default message broker or queue manager.
Applications may connect to the queue and transfer a message onto it.

RabbitMQ Visualizer will be running at [http://localhost:15672](http://localhost:15672) with the next credentials: guest/guest.