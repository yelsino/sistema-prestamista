# back-ncarlos-vs-ts
docker build --no-cache --progress=plain -t api-node-ts .
docker run -it -p 8000:8000 api-node-ts


<!-- DESPLEGAR CONTENEDOR A HEROKU -->
heroku container:login
heroku container:push web -a back-ns-carlos
heroku container:release web -a back-ns-carlos

<!-- VERIFICAR LOGS DE APPLICACION DESPLEGADA -->
heroku logs --tail --app back-ns-carlos