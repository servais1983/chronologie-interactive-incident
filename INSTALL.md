# Installation et configuration

Ce document explique comment installer et configurer l'outil de Chronologie Interactive d'Incident.

## Prérequis

L'application est basée sur des technologies web standards et ne nécessite que très peu de prérequis :

- Un navigateur web moderne (Chrome, Firefox, Edge, Safari dans leurs versions récentes)
- Un serveur web simple pour servir les fichiers (optionnel)

## Installation simple (local)

1. Clonez ce dépôt ou téléchargez-le sous forme d'archive ZIP
   ```bash
   git clone https://github.com/servais1983/chronologie-interactive-incident.git
   ```

2. Ouvrez le fichier `index.html` directement dans votre navigateur
   - Double-cliquez sur le fichier
   - Ou faites un clic droit et choisissez "Ouvrir avec" puis sélectionnez votre navigateur

C'est tout ! L'application fonctionne entièrement côté client et ne nécessite pas de serveur pour les fonctionnalités de base.

## Installation avec un serveur web (recommandé)

Pour une meilleure expérience, notamment si vous souhaitez partager l'outil avec des collègues, il est recommandé de l'héberger sur un serveur web.

### Avec un serveur Apache ou Nginx

1. Déployez les fichiers dans le répertoire racine de votre serveur web
2. Assurez-vous que le répertoire est accessible via HTTP/HTTPS
3. Accédez à l'application via l'URL correspondante

### Avec un serveur Node.js simple

1. Installez Node.js si ce n'est pas déjà fait
2. Dans le répertoire du projet, créez un fichier `server.js` avec le contenu suivant :
   ```javascript
   const http = require('http');
   const fs = require('fs');
   const path = require('path');

   const PORT = 8080;

   const MIME_TYPES = {
     '.html': 'text/html',
     '.css': 'text/css',
     '.js': 'text/javascript',
     '.json': 'application/json',
     '.png': 'image/png',
     '.jpg': 'image/jpeg',
     '.gif': 'image/gif',
     '.svg': 'image/svg+xml'
   };

   const server = http.createServer((req, res) => {
     let url = req.url;
     
     // Servir index.html pour les requêtes à la racine
     if (url === '/') {
       url = '/index.html';
     }
     
     // Construire le chemin du fichier
     const filePath = path.join(__dirname, url);
     const extname = path.extname(filePath);
     
     // Vérifier si le fichier existe
     fs.access(filePath, fs.constants.F_OK, (err) => {
       if (err) {
         res.writeHead(404);
         res.end('Fichier non trouvé');
         return;
       }
       
       // Lire et servir le fichier
       fs.readFile(filePath, (err, data) => {
         if (err) {
           res.writeHead(500);
           res.end('Erreur serveur');
           return;
         }
         
         const contentType = MIME_TYPES[extname] || 'application/octet-stream';
         res.writeHead(200, { 'Content-Type': contentType });
         res.end(data);
       });
     });
   });

   server.listen(PORT, () => {
     console.log(`Serveur démarré sur http://localhost:${PORT}`);
   });
   ```

3. Installez et démarrez le serveur
   ```bash
   node server.js
   ```

4. Accédez à l'application via http://localhost:8080

### Avec Python (serveur simple)

1. Ouvrez un terminal dans le répertoire du projet
2. Lancez un serveur HTTP simple avec Python :

   Pour Python 3 :
   ```bash
   python -m http.server 8080
   ```

   Pour Python 2 :
   ```bash
   python -m SimpleHTTPServer 8080
   ```

3. Accédez à l'application via http://localhost:8080

## Configuration avancée

### Stockage des données

Par défaut, l'application utilise le stockage local du navigateur (localStorage) pour sauvegarder les incidents. Si vous souhaitez une solution plus robuste :

1. Créez un fork du projet
2. Modifiez les fonctions `saveIncident` et apparentées dans `js/app.js` pour utiliser une autre solution de stockage comme :
   - IndexedDB pour un stockage local plus important
   - Un backend personnalisé avec une base de données
   - Firebase ou un autre service cloud

### Personnalisation

Vous pouvez personnaliser l'application selon vos besoins :

- Modifiez les catégories d'événements dans `js/app.js` (variable `categoryColors`)
- Ajustez les styles dans `css/styles.css`
- Ajoutez des champs supplémentaires dans le formulaire d'événement (nécessite des modifications dans HTML, JS et CSS)

## Résolution des problèmes courants

### Les données ne sont pas sauvegardées

- Vérifiez que localStorage est activé dans votre navigateur
- Essayez de vider le cache du navigateur
- Vérifiez les erreurs dans la console développeur (F12)

### Problèmes d'affichage

- Assurez-vous d'utiliser un navigateur récent
- Vérifiez que tous les fichiers CSS sont correctement chargés
- Essayez de recharger la page en vidant le cache (Ctrl+F5 ou Cmd+Shift+R)

### Problèmes avec vis-timeline

- Vérifiez que la bibliothèque vis.js est correctement chargée (vérifiez la console navigateur)
- Assurez-vous que la version de vis.js utilisée est compatible

## Support

Si vous rencontrez des problèmes ou avez des questions :

1. Consultez les issues existantes sur GitHub
2. Créez une nouvelle issue avec une description détaillée de votre problème
3. Incluez des captures d'écran et des messages d'erreur si possible