# call from a different directory:
# make -C docker/devenv up

# launch devenv container
# -d pour detached
up:
	docker-compose up -d

# prefer stop to avoid losing devenv setup
# down:
# 	docker-compose down

stop:
	docker-compose stop

# rebuild docker image based on Dockerfile
build:
	docker compose build --no-cache

# remove-container:
# docker compose rm -s back