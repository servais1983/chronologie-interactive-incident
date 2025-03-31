/**
 * Chronologie Interactive d'Incident
 * Application pour visualiser et gérer la timeline d'attaques
 * avec capacité d'ajouter des éléments découverts pendant l'analyse.
 */

// Variables globales
let timeline;
let currentIncidentId = null;
let events = [];
let selectedEventId = null;

// Configuration de la timeline
const timelineOptions = {
    width: '100%',
    height: '100%',
    margin: {
        item: 20,
        axis: 40
    },
    orientation: {
        axis: 'both',
        item: 'top'
    },
    zoomMax: 31536000000, // 1 an en millisecondes
    zoomMin: 3600000, // 1 heure en millisecondes
    stack: true,
    stackSubgroups: true,
    showMajorLabels: true,
    showMinorLabels: true,
    tooltip: {
        followMouse: true,
        overflowMethod: 'cap'
    },
    max: null,
    min: null
};

// Couleurs pour les différentes catégories d'événements
const categoryColors = {
    reconnaisance: { background: '#e8f4fc', border: '#3498db' },
    initialAccess: { background: '#fdebd0', border: '#f39c12' },
    execution: { background: '#ebdef0', border: '#8e44ad' },
    persistence: { background: '#d4efdf', border: '#27ae60' },
    privilegeEscalation: { background: '#fadbd8', border: '#e74c3c' },
    defensEvasion: { background: '#f5eef8', border: '#9b59b6' },
    credentialAccess: { background: '#fef9e7', border: '#f1c40f' },
    discovery: { background: '#d6eaf8', border: '#3498db' },
    lateralMovement: { background: '#eaeded', border: '#95a5a6' },
    collection: { background: '#d1f2eb', border: '#1abc9c' },
    exfiltration: { background: '#fdedec', border: '#c0392b' },
    impact: { background: '#f2d7d5', border: '#922b21' },
    response: { background: '#d5f5e3', border: '#196f3d' }
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initTimeline();
    setupEventListeners();
    
    // Créer un nouvel incident vide par défaut
    createNewIncident();
});

// Initialiser la timeline avec vis.js
function initTimeline() {
    const container = document.getElementById('timeline');
    timeline = new vis.Timeline(container, [], timelineOptions);
    
    // Événement de sélection d'un élément dans la timeline
    timeline.on('select', function(properties) {
        if (properties.items.length > 0) {
            selectedEventId = properties.items[0];
            highlightSelectedEvent(selectedEventId);
        }
    });
}

// Configurer tous les écouteurs d'événements
function setupEventListeners() {
    // Bouton "Nouveau"
    document.getElementById('newIncident').addEventListener('click', createNewIncident);
    
    // Bouton "Sauvegarder"
    document.getElementById('saveIncident').addEventListener('click', saveIncident);
    
    // Bouton "Exporter"
    document.getElementById('exportIncident').addEventListener('click', exportIncident);
    
    // Bouton "Importer"
    document.getElementById('importIncident').addEventListener('click', importIncident);
    
    // Bouton "Ajouter un événement"
    document.getElementById('addEvent').addEventListener('click', showEventModal);
    
    // Formulaire d'ajout d'événement
    document.getElementById('eventForm').addEventListener('submit', handleEventFormSubmit);
    
    // Fermeture de la modal
    document.querySelector('.close').addEventListener('click', hideEventModal);
    document.querySelector('.cancel').addEventListener('click', hideEventModal);
    
    // Fermer la modal en cliquant en dehors
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('eventModal');
        if (event.target === modal) {
            hideEventModal();
        }
    });
}

// Créer un nouvel incident (vide)
function createNewIncident() {
    // Demander confirmation si des données existent déjà
    if (events.length > 0) {
        if (!confirm('Êtes-vous sûr de vouloir créer un nouvel incident ? Les données non sauvegardées seront perdues.')) {
            return;
        }
    }
    
    // Réinitialiser l'état
    currentIncidentId = generateUUID();
    events = [];
    selectedEventId = null;
    
    // Vider les champs
    document.getElementById('incidentName').value = '';
    document.getElementById('incidentRef').value = '';
    document.getElementById('incidentDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('incidentAnalyst').value = '';
    
    // Rafraîchir l'affichage
    refreshEventList();
    refreshTimeline();
}

// Enregistrer l'incident en cours (stockage local)
function saveIncident() {
    if (!document.getElementById('incidentName').value) {
        alert('Veuillez donner un nom à l\'incident avant de sauvegarder.');
        return;
    }
    
    const incidentData = {
        id: currentIncidentId,
        name: document.getElementById('incidentName').value,
        reference: document.getElementById('incidentRef').value,
        date: document.getElementById('incidentDate').value,
        analyst: document.getElementById('incidentAnalyst').value,
        events: events,
        lastModified: new Date().toISOString()
    };
    
    // Sauvegarder dans le localStorage
    const savedIncidents = JSON.parse(localStorage.getItem('incidents') || '{}');
    savedIncidents[currentIncidentId] = incidentData;
    localStorage.setItem('incidents', JSON.stringify(savedIncidents));
    
    alert('Incident sauvegardé avec succès !');
}

// Exporter l'incident (format JSON)
function exportIncident() {
    if (events.length === 0) {
        alert('Aucun événement à exporter.');
        return;
    }
    
    const incidentData = {
        id: currentIncidentId,
        name: document.getElementById('incidentName').value,
        reference: document.getElementById('incidentRef').value,
        date: document.getElementById('incidentDate').value,
        analyst: document.getElementById('incidentAnalyst').value,
        events: events,
        exportDate: new Date().toISOString()
    };
    
    // Créer un blob et télécharger
    const dataStr = JSON.stringify(incidentData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `incident_${incidentData.reference || currentIncidentId}.json`);
    a.click();
    
    URL.revokeObjectURL(url);
}

// Importer un incident (depuis un fichier JSON)
function importIncident() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const incidentData = JSON.parse(event.target.result);
                
                // Valider les données minimales
                if (!incidentData.id || !Array.isArray(incidentData.events)) {
                    throw new Error('Format de fichier invalide.');
                }
                
                // Charger les données
                currentIncidentId = incidentData.id;
                document.getElementById('incidentName').value = incidentData.name || '';
                document.getElementById('incidentRef').value = incidentData.reference || '';
                document.getElementById('incidentDate').value = incidentData.date || '';
                document.getElementById('incidentAnalyst').value = incidentData.analyst || '';
                
                events = incidentData.events;
                
                // Rafraîchir l'interface
                refreshEventList();
                refreshTimeline();
                
                alert('Incident importé avec succès !');
            } catch (error) {
                alert('Erreur lors de l\'importation : ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// Afficher la modale d'ajout d'événement
function showEventModal() {
    const modal = document.getElementById('eventModal');
    
    // Réinitialiser le formulaire
    document.getElementById('eventForm').reset();
    
    // Définir la date par défaut à maintenant
    const now = new Date();
    document.getElementById('eventDate').value = now.toISOString().slice(0, 16);
    
    // Afficher la modale
    modal.style.display = 'block';
}

// Cacher la modale d'ajout d'événement
function hideEventModal() {
    document.getElementById('eventModal').style.display = 'none';
}

// Gérer la soumission du formulaire d'événement
function handleEventFormSubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const category = document.getElementById('eventCategory').value;
    const description = document.getElementById('eventDescription').value;
    const sources = document.getElementById('eventSources').value;
    const confidence = document.getElementById('eventConfidence').value;
    
    // Créer un nouvel événement
    const newEvent = {
        id: generateUUID(),
        title,
        start: new Date(date).toISOString(),
        category,
        description,
        sources,
        confidence,
        createdAt: new Date().toISOString()
    };
    
    // Ajouter à la liste d'événements
    events.push(newEvent);
    
    // Rafraîchir l'interface
    refreshEventList();
    refreshTimeline();
    
    // Fermer la modale
    hideEventModal();
}

// Rafraîchir la liste des événements dans la sidebar
function refreshEventList() {
    const container = document.getElementById('eventListContainer');
    container.innerHTML = '';
    
    if (events.length === 0) {
        container.innerHTML = '<div class="no-events">Aucun événement. Cliquez sur + pour en ajouter.</div>';
        return;
    }
    
    // Trier les événements par date
    const sortedEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));
    
    // Créer un élément pour chaque événement
    sortedEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = `event-item ${event.id === selectedEventId ? 'selected' : ''}`;
        eventElement.dataset.id = event.id;
        
        const eventDate = new Date(event.start);
        const formattedDate = `${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
        eventElement.innerHTML = `
            <div class="event-title">${event.title}</div>
            <div class="event-time">${formattedDate}</div>
            <div class="event-category">${getCategoryLabel(event.category)}</div>
        `;
        
        // Ajouter un écouteur d'événement pour la sélection
        eventElement.addEventListener('click', function() {
            selectedEventId = event.id;
            highlightSelectedEvent(selectedEventId);
            
            // Sélectionner également dans la timeline
            timeline.setSelection(selectedEventId);
            
            // Centrer sur l'élément sélectionné
            timeline.focus(selectedEventId);
        });
        
        container.appendChild(eventElement);
    });
}

// Rafraîchir la timeline
function refreshTimeline() {
    // Convertir les événements en format vis.js
    const timelineItems = events.map(event => {
        const colors = categoryColors[event.category] || categoryColors.response;
        
        return {
            id: event.id,
            content: `<div class="timeline-event-content">
                        <strong>${event.title}</strong>
                        ${event.description ? `<br><span class="timeline-description">${event.description.substring(0, 50)}${event.description.length > 50 ? '...' : ''}</span>` : ''}
                      </div>`,
            start: event.start,
            className: event.category,
            style: `background-color: ${colors.background}; border-color: ${colors.border};`,
            title: `${event.title}\n${new Date(event.start).toLocaleString()}\n\n${event.description}`
        };
    });
    
    // Créer un nouveau DataSet
    const items = new vis.DataSet(timelineItems);
    
    // Mettre à jour la timeline
    timeline.setItems(items);
    
    // Si des événements existent, ajuster l'affichage
    if (events.length > 0) {
        // Trier par date
        const sortedEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));
        
        // Déterminer la plage de temps à afficher (du premier au dernier événement + marge)
        const firstEvent = new Date(sortedEvents[0].start);
        const lastEvent = new Date(sortedEvents[sortedEvents.length - 1].start);
        
        // Ajouter une marge de 10% avant et après
        const timeSpan = lastEvent - firstEvent;
        const margin = timeSpan * 0.1;
        
        const startDate = new Date(firstEvent.getTime() - margin);
        const endDate = new Date(lastEvent.getTime() + margin);
        
        // Ajuster la timeline pour montrer tous les événements
        timeline.setWindow(startDate, endDate);
    }
}

// Mettre en évidence l'événement sélectionné dans la liste
function highlightSelectedEvent(eventId) {
    // Supprimer la classe 'selected' de tous les éléments
    document.querySelectorAll('.event-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Ajouter la classe 'selected' à l'élément correspondant
    const selectedElement = document.querySelector(`.event-item[data-id="${eventId}"]`);
    if (selectedElement) {
        selectedElement.classList.add('selected');
        
        // Faire défiler jusqu'à l'élément si nécessaire
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Obtenir le libellé d'une catégorie
function getCategoryLabel(category) {
    const categoryLabels = {
        reconnaisance: 'Reconnaissance',
        initialAccess: 'Accès Initial',
        execution: 'Exécution',
        persistence: 'Persistance',
        privilegeEscalation: 'Élévation de Privilèges',
        defensEvasion: 'Évasion Défensive',
        credentialAccess: 'Accès aux Identifiants',
        discovery: 'Découverte',
        lateralMovement: 'Mouvement Latéral',
        collection: 'Collection',
        exfiltration: 'Exfiltration',
        impact: 'Impact',
        response: 'Réponse'
    };
    
    return categoryLabels[category] || category;
}

// Générer un identifiant unique (UUID v4)
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}