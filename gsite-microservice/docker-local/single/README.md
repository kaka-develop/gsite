### for single service

```
docker run -d --name mongodb -p 27017:27017 mongo:3.2.10
```
### build images for dev 
```
cd ../.. && cd gsite-cache-member && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-local/single
cd ../.. && cd gsite-manager && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-local/single
cd ../.. && cd gsite-customer && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-local/single
cd ../.. && cd gsite-web && ./gradlew clean bootRepackage -Pprod buildDocker && cd .. && cd docker-local/single

```

### push dockerhub

```
docker push ainguyen/gsite-micro-customer
docker push ainguyen/gsite-micro-manager
docker push ainguyen/gsite-micro-web
docker push ainguyen/gsite-cache-member

```

### deploy containers
```
docker-compose -f tools.yml up -d

docker-compose up -d
```
### scale 
```
docker-compose scale gsite-customer=3
```
### stop 
docker-compose stop

docker-compose rm

docker-compose -f tools.yml stop