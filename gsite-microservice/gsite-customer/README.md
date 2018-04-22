# GSite Customer
Please visit GSite on cloud: https://gsite.cf

### Development
##### Prerequisites:
- Have running MongoDB server on localhost:27017

##### Run app
    
    ./gradlew bootRun

### Testing
##### Test app
 
    ./gradlew test
    
### Production
##### Prerequisites:
- Have running MongoDB server on localhost:27017

##### Packaging
    
    ./gradlew -Pprod bootRepackage
##### Run app
    
    ./build/libs/gsite-customer-1.0.war
or

    java -jar build/libs/gsite-customer-1.0.war


### Production with Docker
##### Prerequisites:
- Install Docker Engine (Daemon). To check Docker run:
    
        docker -v
        
##### Build Docker image
      
    ./gradlew bootRepackage -Pprod buildDocker
        
##### Deploy app and mongodb on single Docker engine
Run app and mongodb containers:

    docker-compose -f src/main/docker/app.yml up -d

Check running app by logs until available on port:
    
    docker logs -f {container name} 
example:

    docker logs -f  docker_gsitecustomer-app_1
Use postman or open browser port 8081 on host. For localhost:
     
     http://localhost:8081
or 
   
     http://{IP or host}:8081

Get public customer token from logs:
    
    ./gradlew -Dtest.single=TokenProvider test -i

Use postman or other tools to test APIs with:
- url: 
    
        http://{IP or host}:8081/api/mywebsites
- param:
        
        user_id: user-1
- header:
        
        Authorization: Bearer {token}


To stop containers run:

    docker-compose -f src/main/docker/app.yml stop
    
To remove containers run:

    docker-compose -f src/main/docker/app.yml rm -v -f   
    
### Have fun!    
Please visit GSite on cloud: https://gsite.cf
