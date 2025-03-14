# React Frontend with Docker and Nginx

This repository contains a Docker setup for building and deploying a React frontend application using Node.js and Nginx.

## Getting Started

Follow these instructions to build and run the application inside a Docker container.

### Prerequisites

Ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)

## Building the Docker Image

Run the following command to build the Docker image:

```sh
docker build -t my-react-app .
```

This command will:
1. Use Node.js to install dependencies and build the React app.
2. Copy the built files into a lightweight Nginx container.

## Running the Container

Once the image is built, you can run the container using:

```sh
docker run -d -p 80:80 --name react-container my-react-app
```

This command:
- Runs the container in detached mode (`-d`).
- Maps port 80 on the host to port 80 in the container.
- Names the running container `react-container`.

## Stopping and Removing the Container

To stop the running container, use:

```sh
docker stop react-container
```

To remove the container after stopping it:

```sh
docker rm react-container
```

## Accessing the Application

Once the container is running, open a browser and go to:

```
http://localhost
```

## Cleaning Up

To remove the Docker image, first, remove any running containers, then run:

```sh
docker rmi my-react-app
```

## Customizing the Nginx Configuration

If you need to customize Nginx settings, create a custom `nginx.conf` and update the `Dockerfile` to copy it into the container:

```dockerfile
COPY nginx.conf /etc/nginx/nginx.conf
```

Then rebuild the image.

## License

This project is open-source and available

