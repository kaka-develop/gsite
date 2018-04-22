
# Azure

### Build swarm cluster
```
docker-machine create --driver azure --azure-subscription-id 64e5a27c-ee93-43eb-bd35-0403e5f84744 azure-swarm-manager

docker-machine create --driver azure --azure-subscription-id 64e5a27c-ee93-43eb-bd35-0403e5f84744 azure-swarm-worker1

docker-machine create --driver azure --azure-subscription-id 64e5a27c-ee93-43eb-bd35-0403e5f84744 azure-swarm-worker2

docker swarm init --advertise-addr 40.83.252.104

```

# Amazon

docker-machine create --driver amazonec2 --amazonec2-ami ami-a58d0dc5 --amazonec2-region us-west-2 aws-manager1


# Google cloud

### build swarm cluster
```

docker-machine start google-manager1  google-manager2 google-worker1  google-worker2 google-worker3

eval $(docker-machine env google-manager1)

docker-machine create --driver google --google-project gsite-153009 --google-zone asia-east1-a google-manager1
docker-machine create --driver google --google-project gsite-153009 --google-zone asia-east1-a google-manager2
docker-machine create --driver google --google-project gsite-153009 --google-zone asia-east1-a google-worker1
docker-machine create --driver google --google-project gsite-153009 --google-zone asia-east1-a google-worker2
docker-machine create --driver google --google-project gsite-153009 --google-zone asia-east1-a google-worker3

docker swarm init --advertise-addr 10.140.0.2

 docker swarm join \
    --token SWMTKN-1-1xlrcw7ctz8epm07b4qb2s1y9h915ioklu9l10s49jzeogey59-0ben1w7pfvg9wmohdz3mfk92e \
    10.140.0.2:2377

docker swarm join \
    --token SWMTKN-1-1xlrcw7ctz8epm07b4qb2s1y9h915ioklu9l10s49jzeogey59-9cu03cjc498tetjaeedavc6x7 \
    10.140.0.2:2377
```

### build images for swarm 
```
cd .. && cd gsite-customer && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-cloud
cd .. && cd gsite-manager && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-cloud
cd .. && cd gsite-web && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-cloud

eval $(docker-machine env google-manager1)

docker-compose -f gsite-view.yml build

docker-compose -f mongodb-config.yml build
docker-compose -f mongodb-shard.yml build
docker-compose -f mongo-express.yml build
```

###  push to hub
```
docker push ainguyen/gsite-micro-customer
docker push ainguyen/gsite-micro-manager
docker push ainguyen/gsite-micro-web

docker push ainguyen/gsite-mongodb-shard
docker push ainguyen/gsite-mongodb-config
```
### use tools
```
docker stack rm tools
docker stack deploy -c tools.yml tools
```

### push dockerhub

```
cd keys && cat gsite.cf.crt fullchain1.pem > gsite.cf.crt && cd ..
docker-machine scp -r keys/ google-worker3:/tmp
docker-machine ssh google-worker3 sudo cp -r /tmp/keys /certs
docker stack deploy -c tools.yml tools

docker tag ainguyen/gsite-micro-customer gsite.cf:5000/ainguyen/gsite-micro-customer
docker push gsite.cf:5000/ainguyen/gsite-micro-customer

docker push ainguyen/gsite-micro-customer
docker push ainguyen/gsite-micro-manager
docker push ainguyen/gsite-micro-web
docker push ainguyen/gsite-mongodb-node
docker push ainguyen/gsite-mongo-express
```

### Create network
```
    docker network create -d overlay gsite-app

```

### deploy mongodb-cluster for swarm
```
docker stack rm gsdb
docker stack deploy -c mongodb-cluster.yml gsdb
```

shard 1
``` 
docker container exec -it gsdb_gsite-mongodb-shard1-rs1.1.mx9f6lm3n6pi6wu2ey4wbawbc mongo --eval 'var hostnames=["gsite-mongodb-shard1-rs1","gsite-mongodb-shard1-rs2","gsite-mongodb-shard1-rs3"]' init_replicaset.js

docker container exec -it gsdb_gsite-mongodb-mongos.1.xpqc8r0qsaeqjcci6z8hv2hmb mongo --eval 'sh.addShard("rs1/gsite-mongodb-shard1-rs1:27017")'

```

shard 2
``` 
docker container exec -it gsdb_gsite-mongodb-shard2-rs1.1.zl7ozzmfe5x6n2vtr78y1l9u0 mongo --eval 'var hostnames=["gsite-mongodb-shard2-rs1","gsite-mongodb-shard2-rs2","gsite-mongodb-shard2-rs3"]' init_replicaset.js

docker container exec -it gsdb_gsite-mongodb-mongos.1.xpqc8r0qsaeqjcci6z8hv2hmb mongo --eval 'sh.addShard("rs2/gsite-mongodb-shard2-rs1:27017")'

```

shard 3
``` 
docker container exec -it gsdb_gsite-mongodb-shard3-rs1.1.cb6q3e8nbjnt638zk4byj6uof mongo --eval 'var hostnames=["gsite-mongodb-shard3-rs1","gsite-mongodb-shard3-rs2","gsite-mongodb-shard3-rs3"]' init_replicaset.js

docker container exec -it gsdb_gsite-mongodb-mongos.2.gcxvlgxe28i7rb2s72gwhbcwz mongo --eval 'sh.addShard("rs3/gsite-mongodb-shard3-rs1:27017")'

```

### deploy gsite apps for swarm

```
docker stack rm gsapp
docker stack deploy -c docker-compose.yml gsapp

docker service update gsapp_gsite-web --image ainguyen/gsite-micro-web:latest

docker service update gsapp_gsite-customer --image ainguyen/gsite-micro-customer:latest
```

### Enale database sharding
```
  docker container exec -it gsdb_gsite-mongodb-mongos.1.xpqc8r0qsaeqjcci6z8hv2hmb mongo --eval 'sh.enableSharding("gsite")' 
```

### push git
```
cd .. && cd gsite-customer && git add -A && git commit -m "update jenkinsfile" && git push origin master && cd .. && cd docker-cloud
cd .. && cd gsite-manager && git add -A && git commit -m "update sss" && git push origin master && cd .. && cd docker-cloud
cd .. && cd gsite-web && git add -A && git commit -m "update sss" && git push origin master && cd .. && cd docker-cloud
```


# Get ssl key for spring boot

```
--- web server
certbot certonly --standalone -d gsite.cf -d www.gsite.cf --email ainguyenkaka@gmail.com 

openssl pkcs12 -export -in server.crt -inkey private.key -out pkcs.p12 -name gsite

--- dns server
certbot certonly --manual --preferred-challenges dns -d gsite.cf -d www.gsite.cf --email ainguyenkaka@gmail.com 

openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out pkcs.p12 -name gsite

keytool -importkeystore -deststorepass PASSWORD_STORE -destkeypass PASSWORD_KEYPASS -destkeystore keystore.jks -srckeystore pkcs.p12 -srcstoretype PKCS12 -srcstorepass manchettoh8 -alias gsite

```