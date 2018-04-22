# Swarm

### Start docker machines
```
docker-machine start manager worker1 worker2

eval $(docker-machine env manager)
```
### Build swarm cluster
```
docker-machine ssh manager docker swarm init --advertise-addr 192.168.99.100

docker-machine ssh worker1 

docker-machine ssh worker2 
```
### build images for swarm 
```
cd ../.. && cd gsite-cache-member && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-local/swarm
cd ../.. && cd gsite-manager && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-local/swarm
cd ../.. && cd gsite-customer && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-local/swarm
cd ../.. && cd gsite-web && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-local/swarm

docker-compose -f mongodb-shard.yml build
```

### create network
```
    docker network create -d overlay gsite-app
```
### deploy tools
```
docker stack rm tools
docker stack deploy -c tools.yml tools

```
### push dockerhub

```
docker push ainguyen/gsite-cache-member
docker push ainguyen/gsite-micro-customer
docker push ainguyen/gsite-micro-manager
docker push ainguyen/gsite-micro-web
docker push ainguyen/gsite-mongodb-shard

```
### deploy mongodb-cluster for swarm

```
docker stack rm gsdb
docker stack deploy -c mongodb-cluster.yml gsdb

docker container exec -it gsdb_gsite-mongodb-shard1-rs1.1.sbpit7bkqbjk97axlofbmpa3a mongo --eval 'var hostnames=["gsite-mongodb-shard1-rs1","gsite-mongodb-shard1-rs2","gsite-mongodb-shard1-rs3"]' init_replicaset.js

docker container exec -it gsdb_gsite-mongodb-mongos.1.nccupet21bglddpfkh5n662qq mongo --eval 'sh.addShard("rs1/gsite-mongodb-shard1-rs1:27017")'

```


### deploy gsite apps for swarm

```
docker stack rm gsapp
docker stack deploy -c docker-compose.yml gsapp

```
