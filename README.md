# Chronologie Interactive d'Incident

Outil de visualisation de timeline d'attaques avec capacité d'ajouter des éléments découverts pendant l'analyse d'incidents de sécurité.

## Fonctionnalités

- Visualisation chronologique des événements liés à un incident de sécurité
- Ajout, modification et suppression d'éléments de la timeline en temps réel
- Catégorisation des événements par type (alerte, compromission, exfiltration, etc.)
- Export et partage de la chronologie
- Interface intuitive adaptée aux analystes de sécurité

## Installation

```bash
git clone https://github.com/servais1983/chronologie-interactive-incident.git
cd chronologie-interactive-incident
npm install
npm start
```

## Utilisation

1. Créez un nouvel incident avec "Nouveau"
2. Ajoutez des événements avec le bouton "+"
3. Organisez et catégorisez les événements
4. Exportez ou partagez votre chronologie

## Technologies

- HTML5, CSS3, JavaScript
- Framework : React.js
- Bibliothèque de visualisation : vis-timeline
- Stockage : IndexedDB (local) / Firebase (option cloud)

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests.

## Licence

MIT