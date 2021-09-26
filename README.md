## PROJET CMS_SIMPLON

Pour mettre en place le projet, entrez les commandes suivantes : 

* npm install
* docker-compose build

Pour lancer le serveur, entrez la commande suivante (veuillez d'abord configurer la connexion avec la base de donnée) :

* docker-compose up

### CONNECTION DATABASE

Rajouter dependance et environnement mysql dans docker-compose 

    depends_on:
      - db
    environment: 
      MYSQL_HOST: db
      MYSQL_PORT: 3306

Créer votre fichier .env à la racine et configurez le ainsi :

    MYSQL_HOST=db
    MYSQL_USER=root
    MYSQL_ROOT_PASSWORD=root
    MYSQL_DATABASE=cms_simplon
    MYSQL_LOCAL_PORT=3306
    MYSQL_DOCKER_PORT=3306

    NODE_LOCAL_PORT=3000
    NODE_DOCKER_PORT=3000

Rajouter le fichier d'environnement de base de donnée dans votre container mysql et configurer l'environnement pour qu'il soit lié avec votre .env(docker-compose) 

    env_file: ./.env

    environment:
      - MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
      - MYSQL_DATABASE=$MYSQL_DATABASE
      - MYSQL_USER=$MYSQL_USER
      - MYSQL_PASSWORD=$MYSQL_PASSWORD

### UTILE

  serveur start sur l'url suivant : localhost:3000
  Pour lancer une migration : docker-compose exec node npm run make-migration (penser a eteindre une fois executé)
  * La tables theme possèdes déjà les données des deux themes créés et le theme standard est activé.
  
  Pour supprimé les tables : docker-compose exec node npm run drop-tables (penser a eteindre une fois executé)

  Pour se connecter il faut créer le dossier storage à la racine (pas pris en charge par git)