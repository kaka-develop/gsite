# GSite Web
Please visit GSite on cloud: https://gsite.cf

### Default local users:
- {username} - {password}
    
        admin - admin
        manager - manager
        user - user
        
### Development
##### Prerequisites:
- Have running MongoDB server on localhost:27017
- Have running gsite-manager on localhost:8082
- Have running gsite-customer on localhost:8081

##### Run app
    
    ./gradlew bootRun

### Testing
##### Test app
 
    ./gradlew test
    
### Production
##### Prerequisites:
- Have running MongoDB server on localhost:27017
- Have running gsite-manager on localhost:8082
- Have running gsite-customer on localhost:8081

##### Packaging
    
    ./gradlew -Pprod bootRepackage
##### Run app
    
    ./build/libs/gsite-web-1.0.war
or

    java -jar build/libs/gsite-web-1.0.war

### Production with Docker
##### Prerequisites:
- Running Docker Engine (Daemon). To check Docker run:
    
        docker -v
        docker ps
        
##### Build Docker image
      
    ./gradlew bootRepackage -Pprod buildDocker
        
##### Deploy app and mongodb on single Docker engine
Run app and mongodb containers:

    docker-compose -f src/main/docker/app.yml up -d

Check running app by logs until available on port:
    
    docker logs -f {container name} 
example:

    docker logs -f  docker_gsite-web_1
Use postman or open browser port 8080 on host. For localhost:
     
     http://localhost:8080
or 
   
     http://{IP or host}:8080

Test APIs:
    
     http://localhost:8080/gsitemanager/api/web-templates
or
     
     http://{IP or host}:8080/gsitemanager/api/web-templates
     
Get public admin token from logs:
    
    ./gradlew -Dtest.single=TokenProvider test -i

Use postman or other tools to test APIs with:
- url: 
    
        http://{IP or host}:8080/api/users/manager
        
- header:
        
        Authorization: Bearer {token}

To stop containers run:

    docker-compose -f src/main/docker/app.yml stop
    
To remove stopped containers run:

    docker-compose -f src/main/docker/app.yml rm -v -f   
    
### Have fun!    
Please visit GSite on cloud: https://gsite.cf
