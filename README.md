# Frontend
## How to run for development
For the first time or when some packages were added run:
```
npm install
```
To start:
```
npm run dev
```
## How to run for production locally
Build image:
```
docker build -t {image name} {path to Dockerfile}
```
Start container:
```
docker run --name {container name} -d -p {machine port}:80 {image name}
```
To stop container:
```
docker stop {container name}
```
To remove container:
```
docker rm {container name}
```