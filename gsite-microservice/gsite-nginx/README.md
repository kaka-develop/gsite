
# New one

```
eval $(docker-machine env google-manager1)

```
### build image
```
docker-compose -f gsite-nginx.yml build

```

### pus image to hub

```
docker push  ainguyen/gsite-nginx
```

### deploy
```
docker stack rm nginx
docker stack deploy -c docker-compose.yml nginx

docker service update nginx_gsite-nginx --image ainguyen/gsite-nginx:latest
```


```
docker stack rm nginx
docker-compose -f gsite-nginx.yml build
docker push  ainguyen/gsite-nginx
docker stack deploy -c docker-compose.yml nginx

```

### copy enginx config and index html

docker-machine scp -r config/nginx.conf google-manager2:/tmp/nginx.conf
docker-machine ssh google-manager2 sudo cp -r /tmp/nginx.conf /root/

docker-machine scp -r www/index.html google-manager2:/tmp/www/index.html
docker-machine ssh google-manager2 sudo cp -r /tmp/www/index.html /root/nginx-root

### deploy nginx
eval $(docker-machine env google-manager2)
docker stack rm nginx-registry
docker stack deploy -c docker-compose.yml nginx-registry

### ssl

cd /root/nginx-root/.well-known/acme-challenge

docker-machine ssh google-manager2 sudo rm -rf /tmp/.well-known/
docker-machine scp -r .well-known/ google-manager2:/tmp/.well-known/
docker-machine ssh google-manager2 sudo cp -r /tmp/.well-known/ /root/nginx-root

cd certs && cat certificate.crt ca_bundle.crt > server.crt && cd ..

docker-machine ssh google-manager2 sudo rm -rf /tmp/certs/
docker-machine scp -r certs/ google-manager2:/tmp/certs/
docker-machine ssh google-manager2 sudo cp -r /tmp/certs/ /root/

### tag image for registry
docker tag 4581b835c51a gsite.cf/gsite-micro-customer
docker push gsite.cf/gsite-micro-customer

### rewrite direction
rewrite ^/xxxxx(/.*)$ $1 break;
