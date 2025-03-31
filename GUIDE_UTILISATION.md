# Guide d'utilisation - Chronologie Interactive d'Incident

Ce guide vous explique comment utiliser efficacement l'outil de chronologie interactive pour documenter et analyser des incidents de sécurité.

## Démarrage rapide

1. Ouvrez l'application dans votre navigateur en accédant au fichier `index.html`
2. Un nouvel incident vide est créé automatiquement
3. Complétez les informations de base de l'incident (nom, référence, date, analyste)
4. Ajoutez des événements en cliquant sur le bouton "+" dans la section "Événements"
5. Visualisez et manipulez la chronologie dans la partie droite de l'écran

## Fonctionnalités détaillées

### Gestion des incidents

#### Créer un nouvel incident
- Cliquez sur le bouton "Nouveau" dans la barre de navigation
- Confirmez la création si vous avez des données non sauvegardées
- Un nouvel incident vide sera créé avec un ID unique

#### Sauvegarder un incident
- Cliquez sur le bouton "Sauvegarder" dans la barre de navigation
- L'incident est enregistré dans le stockage local de votre navigateur
- Les données sont persistantes même si vous fermez le navigateur

#### Exporter un incident
- Cliquez sur le bouton "Exporter" dans la barre de navigation
- Un fichier JSON contenant toutes les données de l'incident sera téléchargé
- Le nom du fichier sera basé sur la référence de l'incident

#### Importer un incident
- Cliquez sur le bouton "Importer" dans la barre de navigation
- Sélectionnez un fichier JSON précédemment exporté
- Les données de l'incident seront chargées dans l'application

### Gestion des événements

#### Ajouter un événement
1. Cliquez sur le bouton "+" à côté du titre "Événements"
2. Dans la modal qui s'ouvre :
   - Donnez un titre à l'événement
   - Définissez la date et l'heure précises
   - Sélectionnez une catégorie appropriée (voir ci-dessous)
   - Ajoutez une description détaillée
   - Indiquez les sources d'information
   - Définissez le niveau de confiance
3. Cliquez sur "Sauvegarder" pour ajouter l'événement

#### Catégories d'événements
Les événements sont regroupés par catégories, basées sur les tactiques MITRE ATT&CK :

| Catégorie | Description |
|-----------|-------------|
| Reconnaissance | Activités de collecte d'informations sur la cible |
| Accès Initial | Comment l'attaquant a obtenu un premier accès au réseau |
| Exécution | Techniques d'exécution de code malveillant |
| Persistance | Méthodes utilisées pour maintenir l'accès |
| Élévation de Privilèges | Comment l'attaquant a obtenu des droits supérieurs |
| Évasion Défensive | Techniques pour éviter la détection |
| Accès aux Identifiants | Vol ou manipulation d'identifiants |
| Découverte | Comment l'attaquant a exploré l'environnement |
| Mouvement Latéral | Déplacement d'un système à un autre |
| Collection | Collecte de données sensibles |
| Exfiltration | Extraction des données hors du réseau |
| Impact | Conséquences sur les systèmes et l'organisation |
| Réponse | Actions prises pour répondre à l'incident |

#### Sélectionner un événement
- Cliquez sur un événement dans la liste latérale
- L'événement sera mis en évidence dans la timeline
- La timeline se centrera automatiquement sur cet événement

### Manipulation de la timeline

#### Navigation
- **Zoom** : Utilisez la molette de la souris pour zoomer/dézoomer
- **Déplacement** : Cliquez et faites glisser pour naviguer dans le temps
- **Sélection** : Cliquez sur un événement pour le sélectionner

#### Visualisation
- Les événements sont colorés selon leur catégorie
- La hauteur des événements s'ajuste automatiquement en fonction du contenu
- Le survol d'un événement affiche une infobulle avec plus de détails

## Bonnes pratiques

### Documentation d'incident
1. **Chronologie précise** : Soyez aussi précis que possible sur les dates et heures
2. **Descriptions complètes** : Détaillez suffisamment chaque événement
3. **Sources vérifiables** : Documentez toujours la source de vos informations
4. **Niveau de confiance** : Indiquez votre degré de certitude pour chaque événement

### Organisation des événements
- Commencez par les événements confirmés avec un haut niveau de confiance
- Ajoutez progressivement les éléments découverts pendant l'investigation
- Mettez à jour les événements existants lorsque de nouvelles informations sont disponibles
- Utilisez les catégories de manière cohérente pour faciliter l'analyse

### Analyse de la chronologie
- Cherchez les gaps temporels qui pourraient indiquer des activités non détectées
- Identifiez les patterns et les corrélations entre événements
- Évaluez la vitesse de progression de l'attaquant pour estimer son niveau de compétence
- Comparez avec des incidents similaires pour identifier des TTPs (Tactiques, Techniques et Procédures) communes

## Exemples d'utilisation

### Analyse d'un incident de ransomware
1. Documentez le vecteur d'infection initial (e.g., email de phishing, exploitation de vulnérabilité)
2. Enregistrez les activités de reconnaissance et de mouvement latéral
3. Notez le moment précis où le chiffrement a commencé
4. Documentez les actions de réponse (isolation, investigation, restauration)

### Investigation d'une exfiltration de données
1. Identifiez le point d'entrée de l'attaquant
2. Documentez les systèmes auxquels l'attaquant a accédé
3. Tracez les mouvements entre systèmes
4. Marquez les moments où des données ont été collectées et exfiltrées
5. Évaluez l'impact total de la brèche

## Résolution de problèmes

### Données non sauvegardées
- Assurez-vous de cliquer sur "Sauvegarder" régulièrement
- Exportez périodiquement vos incidents importants
- Les données sont stockées localement dans votre navigateur

### Compatibilité navigateur
- L'application fonctionne mieux avec les navigateurs modernes (Chrome, Firefox, Edge)
- Certaines fonctionnalités peuvent ne pas être disponibles sur les navigateurs plus anciens

### Fichier d'import invalide
- Vérifiez que le fichier JSON est correctement formaté
- Assurez-vous qu'il contient un ID d'incident et un tableau d'événements
- Si nécessaire, validez le format du JSON avec un outil en ligne

## Extensions futures

L'application pourrait évoluer pour inclure les fonctionnalités suivantes :
- Collaboration en temps réel entre analystes
- Intégration avec des outils SIEM et EDR
- Import automatisé d'événements depuis des logs
- Génération de rapports détaillés
- Analyse statistique des incidents
- Visualisation des relations entre événements

## Support et contribution

Si vous rencontrez des problèmes ou souhaitez contribuer au développement de cet outil, veuillez :
1. Ouvrir une issue sur le dépôt GitHub
2. Proposer des améliorations via des pull requests
3. Partager vos expériences d'utilisation

Nous vous encourageons à adapter cet outil à vos besoins spécifiques en modifiant le code source.