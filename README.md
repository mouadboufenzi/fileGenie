# DA50 - Outil de gestion de référentiel de configuration de logiciel multiformes

## Sujet

### Objectif

- Outil de gestion de référentiel de configuration de logiciel multiformes (fichier, sgbd rel ou nosql);
- Stockage d'une configuration de référentiel (utilisateur, liste de valeurs, liste d'objets avec des attributs);
- Consultation de l'historique des changements;
- Génération d'une configuration versionnée avec un ensemble d'objets du référentiel de configuration;
- Consultation des différences entre deux versions de référentiel
- "Merge" de deux versions de référentiel

### Technologies

- Backend: Jakarta EE
- Frontend: React 18

### Méthodologie

- Agile

## Groupe

- Étudiants:
	- [Ango Morgane Claudel](https://github.com/Morgan-sama)
	- [Julien Constant](https://github.com/Juknum)
	- [Mouad Boufenzi](https://github.com/mouadboufenzi)
	- [Karim El Jardali](https://github.com/Karimjardali)
	- Hajar Adnani

- Encadrant:
	- Stéphane Galland

## Installation

### BDD

- Installer [Docker](https://docs.docker.com/get-docker/) pour lancer la base de données MySQL
- Lancer la base de données MySQL avec Docker:

```bash
cd backend
docker-compose up
```

### Backend

- Via IntelliJ IDEA, ouvrir le projet `backend` et lancer le serveur

### Frontend

- Installer [Node.js](https://nodejs.org/en/download/) >= 18
- Installer les dépendances:

```bash
cd frontend
npm install
```

- Lancer le serveur:

```bash
npm run dev
```

	
## Troubleshooting 

Si vous avez l'une des erreurs suivantes:

```
error: release version 21 not supported
Language level is invalid or missing in pom.xml. Current project JDK is 17
```

> [!TIP]  
> Dans `Settings` -> `Build, Execution, Deployment` -> `Compiler` -> `Java Compiler` -> Veuillez à ce que le module soit sur 17.
> Si le problème revient, mettez `Project bytecode version` sur 17.

---

```
org.hibernate.exception.JDBCConnectionException: unable to obtain isolated JDBC connection [Communications link failure

The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.] [n/a]
```

> [!TIP]  
> Démarrez la bdd avant de lancer le backend.
