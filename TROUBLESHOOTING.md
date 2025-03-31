# Guide de dépannage

Ce document présente les problèmes courants lors de l'installation et du démarrage de l'application, ainsi que leurs solutions.

## Problèmes d'installation avec npm

### Erreur : "Could not read package.json"

**Message d'erreur :**
```
npm error code ENOENT
npm error syscall open
npm error path /path/to/chronologie-interactive-incident/package.json
npm error errno -4058
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open '/path/to/chronologie-interactive-incident/package.json'
```

**Cause :** Le fichier package.json n'est pas présent dans votre répertoire local.

**Solution :**
1. Assurez-vous d'avoir récupéré les dernières modifications du dépôt GitHub :
   ```bash
   git pull origin main
   ```

2. Si vous avez des conflits, sauvegardez vos modifications locales :
   ```bash
   git stash
   git pull origin main
   git stash pop  # Pour récupérer vos modifications si nécessaire
   ```

3. Vérifiez que le fichier package.json existe maintenant dans votre répertoire :
   ```bash
   # Windows
   dir

   # Linux/macOS
   ls -la
   ```

### Erreur : "Cannot find module 'express'"

**Message d'erreur :**
```
Error: Cannot find module 'express'
Require stack:
- /path/to/chronologie-interactive-incident/server.js
```

**Cause :** Les dépendances npm n'ont pas été installées correctement.

**Solution :**
1. Assurez-vous d'être dans le répertoire du projet :
   ```bash
   cd /path/to/chronologie-interactive-incident
   ```

2. Installez toutes les dépendances :
   ```bash
   npm install
   ```

3. Si cela ne fonctionne pas, essayez d'installer Express spécifiquement :
   ```bash
   npm install express
   ```

4. Si vous rencontrez des erreurs de permission (particulièrement sur Linux) :
   ```bash
   # Linux/macOS
   sudo npm install

   # Windows (exécuter CMD ou PowerShell en tant qu'administrateur)
   npm install
   ```

## Guide d'installation spécifique par plateforme

### Windows

1. **Prérequis :**
   - Installez [Node.js](https://nodejs.org/) (version 14 ou supérieure recommandée)
   - Installez [Git pour Windows](https://git-scm.com/download/win)

2. **Cloner le dépôt :**
   ```cmd
   git clone https://github.com/servais1983/chronologie-interactive-incident.git
   cd chronologie-interactive-incident
   ```

3. **Installation des dépendances :**
   ```cmd
   npm install
   ```
   
   Si vous rencontrez des erreurs liées aux permissions, exécutez CMD ou PowerShell en tant qu'administrateur.

4. **Démarrer l'application :**
   ```cmd
   npm start
   ```

5. **Accéder à l'application :**
   Ouvrez votre navigateur et accédez à http://localhost:3000

### Linux

1. **Prérequis :**
   ```bash
   # Debian/Ubuntu
   sudo apt update
   sudo apt install nodejs npm git

   # Fedora
   sudo dnf install nodejs npm git

   # Arch Linux
   sudo pacman -S nodejs npm git
   ```

2. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/servais1983/chronologie-interactive-incident.git
   cd chronologie-interactive-incident
   ```

3. **Installation des dépendances :**
   ```bash
   npm install
   ```
   
   Si vous rencontrez des erreurs liées aux permissions :
   ```bash
   sudo npm install
   ```

4. **Démarrer l'application :**
   ```bash
   npm start
   ```

5. **Accéder à l'application :**
   Ouvrez votre navigateur et accédez à http://localhost:3000

## Alternative : Utilisation sans npm

Si vous continuez à rencontrer des problèmes avec npm, vous pouvez toujours utiliser l'application sans serveur :

1. Clonez le dépôt comme indiqué ci-dessus.
2. Ouvrez le fichier `index.html` directement dans votre navigateur.

Cette méthode fonctionne pour l'utilisation de base, mais certaines fonctionnalités comme le partage ou l'utilisation sur un réseau nécessiteront un serveur web.

## Problèmes de configuration du serveur

### Port déjà utilisé

**Message d'erreur :**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Cause :** Le port 3000 est déjà utilisé par une autre application.

**Solution :**
Modifiez le port dans le fichier server.js ou définissez la variable d'environnement PORT :

```bash
# Windows
set PORT=3001
npm start

# Linux/macOS
PORT=3001 npm start
```

### Problèmes d'accès réseau

Si vous souhaitez que d'autres ordinateurs sur votre réseau puissent accéder à l'application, assurez-vous que :

1. Votre pare-feu autorise les connexions sur le port utilisé (par défaut 3000)
2. Vous utilisez l'adresse IP de votre machine au lieu de localhost

```bash
# Obtenir votre adresse IP
# Windows
ipconfig

# Linux
ip addr show
```

Puis accédez à l'application via http://VOTRE_IP:3000

## Support supplémentaire

Si vous rencontrez des problèmes non répertoriés ici :

1. Vérifiez les [issues GitHub](https://github.com/servais1983/chronologie-interactive-incident/issues) pour voir si d'autres utilisateurs ont rencontré le même problème
2. Créez une nouvelle issue avec une description détaillée de votre problème
3. Incluez des informations sur votre système d'exploitation, version de Node.js et les messages d'erreur complets