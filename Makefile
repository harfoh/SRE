install_dependencies:
	npm install

run_locally:
	npm run dev	

run_test_locally:
	npm test

run_docker:
	docker build -t api:v1.0.0 .
	docker network create app_network
	docker run -d -p 27017:27017 --net app_network --name mongo mongodb/mongodb-community-server 
	docker run -p 3000:3000 --net app_network --env MONGO_URI=mongodb://mongo:27017/studentdb api:v1.0.0

remove_container:
#This will remove both running and stopped containers
	docker rm $(docker ps -aq) 

run_docker_compose:
	docker-compose up --build

stop_docker_compose:
	docker-compose down

build_api:
	npm run build

test_api:
	npm test

lint_api:
	npx eslint .

	
