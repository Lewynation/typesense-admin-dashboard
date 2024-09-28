## Connection Gotchas

- If you have the image running as a container in docker and want to connect to a locally running typesense instance, then simply use the build in `host.docker.internal` hostname to connect to the typesense server.OR run the dahsboard container with network mode as host and directly connect to the typesense server using `localhost` as the hostname.

- If you have both the typesense server and the dashboard running in docker, then you can use the service name as the hostname to connect to the typesense server. For example, if you have the typesense service defined as `typesense` in the docker-compose file, then you can use `typesense` as the hostname to connect to the typesense server.

- If you are running the dashboard in a container and want to connect to a typesense server running outside the container, then you can use the IP address of the host machine as the hostname to connect to the typesense server.
