
# start dev http server
start:
	npm run start-docker

# cette commande lance egalement le script de prebuild pour generation du fichier de version
build:
	npm run build

lint:
	npm run lint

format:
	npm run format

reinstall-packages:
	rm -rf /project/node_modules/* /project/package-lock.json
	npm install --verbose