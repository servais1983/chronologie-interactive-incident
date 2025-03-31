# Chronologie Interactive d'Incident

Outil de visualisation de timeline d'attaques avec capacité d'ajouter des éléments découverts pendant l'analyse d'incidents de sécurité.

## Fonctionnalités

- Visualisation chronologique des événements liés à un incident de sécurité
- Ajout, modification et suppression d'éléments de la timeline en temps réel
- Catégorisation des événements par type (alerte, compromission, exfiltration, etc.)
- Export et partage de la chronologie
- Interface intuitive adaptée aux analystes de sécurité

## Installation

### Méthode 1 : Avec npm (recommandée)

```bash
# Cloner le dépôt
git clone https://github.com/servais1983/chronologie-interactive-incident.git

# Accéder au répertoire
cd chronologie-interactive-incident

# Installer les dépendances
npm install

# Démarrer l'application
npm start
```

L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000)

### Méthode 2 : Sans npm (ouvrir directement dans le navigateur)

```bash
# Cloner le dépôt
git clone https://github.com/servais1983/chronologie-interactive-incident.git

# Accéder au répertoire
cd chronologie-interactive-incident
```

Ouvrez simplement le fichier `index.html` dans votre navigateur.

## Utilisation

1. Créez un nouvel incident avec "Nouveau"
2. Ajoutez des événements avec le bouton "+"
3. Organisez et catégorisez les événements
4. Exportez ou partagez votre chronologie

Pour plus de détails, consultez le [Guide d'utilisation](GUIDE_UTILISATION.md).

## Technologies

- HTML5, CSS3, JavaScript
- Framework serveur : Express.js (optionnel, pour le mode npm)
- Bibliothèque de visualisation : vis-timeline
- Stockage : localStorage (client-side)

## Documentation

- [Guide d'utilisation](GUIDE_UTILISATION.md) - Instructions détaillées pour utiliser l'application
- [Guide d'installation](INSTALL.md) - Instructions d'installation avancées et de configuration

## Exemple d'incident

Un exemple de fichier d'incident est inclus dans le dépôt : [example-incident.json](example-incident.json)

Pour le charger :
1. Démarrez l'application
2. Cliquez sur "Importer"
3. Sélectionnez le fichier example-incident.json

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests.

## Licence

MIT