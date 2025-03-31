# Chronologie Interactive d'Incident

Outil de visualisation de timeline d'attaques avec capacité d'ajouter des éléments découverts pendant l'analyse d'incidents de sécurité.

## Fonctionnalités

- Visualisation chronologique des événements liés à un incident de sécurité
- Ajout, modification et suppression d'éléments de la timeline en temps réel
- Catégorisation des événements par type (alerte, compromission, exfiltration, etc.)
- Export et partage de la chronologie
- Interface intuitive adaptée aux analystes de sécurité

## Prérequis

- **Pour l'exécution avec npm (recommandé)** :
  - Node.js (version 14 ou supérieure)
  - npm (généralement installé avec Node.js)
  - Un navigateur web moderne

- **Pour l'exécution sans npm** :
  - Un navigateur web moderne

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
- [Guide de dépannage](TROUBLESHOOTING.md) - Solutions aux problèmes courants d'installation et de configuration

## Spécifique à la plateforme

Des instructions détaillées pour Windows et Linux sont disponibles dans le [Guide de dépannage](TROUBLESHOOTING.md).

## Exemple d'incident

Un exemple de fichier d'incident est inclus dans le dépôt : [example-incident.json](example-incident.json)

Pour le charger :
1. Démarrez l'application
2. Cliquez sur "Importer"
3. Sélectionnez le fichier example-incident.json

## Résolution de problèmes

Si vous rencontrez des problèmes lors de l'installation ou de l'utilisation :

1. Consultez le [Guide de dépannage](TROUBLESHOOTING.md) qui couvre les problèmes les plus courants
2. Vérifiez les [issues GitHub](https://github.com/servais1983/chronologie-interactive-incident/issues)
3. Créez une nouvelle issue si votre problème n'est pas répertorié

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests.

## Licence

MIT