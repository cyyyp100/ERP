const evenements = [
    {
        id: 1,
        nom : "JJ",
        dateDebut: new Date(2024, 5, 21),
        heureDebut: '18:00:00',
        dateFin: new Date(2024, 5, 21),
        heureFin: '22:00:00',
        lieu: "Montpellier",
        typeLieu: "Intérieur",
        objectifs: ["Festif"].join(', '),
        questionsInterieur: "Besoin de signalétique: Oui, Superficie: 200m²",
        questionsExterieur: null,
        questionsMixte: null,
        vignerons: ["Vigneron 1", "Vigneron 2"].join(', '),
        prestataires: ["Prestataire 1", "Prestataire 2"].join(', '),
        created: new Date(2023, 4, 15)
    },
    {
        id: 2,
        nom  : "Vin'dredis",
        dateDebut: new Date(2023, 5, 20),
        heureDebut: '10:00:00',
        dateFin: new Date(2023, 5, 20),
        heureFin: '18:00:00',
        lieu: "Nîmes",
        typeLieu: "Extérieur",
        objectifs: ["Lucratif"].join(', '),
        questionsInterieur: null,
        questionsExterieur: "Besoin de signalétique: Non, Parking: Oui, Abris: Vent",
        questionsMixte: null,
        vignerons: ["Vigneron 3", "Vigneron 4"].join(', '),
        prestataires: ["Prestataire 3", "Prestataire 4"].join(', '),
        created: new Date(2023, 5, 20)
    },
    {
        id: 3,
        nom: "Marsillard",
        dateDebut: new Date(2023, 6, 10),
        heureDebut: '09:00:00',
        dateFin: new Date(2023, 6, 10),
        heureFin: '21:00:00',
        lieu: "Marseille",
        typeLieu: "Intérieur et Extérieur",
        objectifs: ["Festif", "Lucratif"].join(', '),
        questionsInterieur: "Besoin de signalétique: Oui, Superficie: 300m²",
        questionsExterieur: "Parking: Non, Abris: Pluie",
        questionsMixte: "Combinaison des deux espaces",
        vignerons: ["Vigneron 5", "Vigneron 6"].join(', '),
        prestataires: ["Prestataire 5", "Prestataire 6"].join(', '),
        created: new Date(2023, 6, 10)
    },

];

module.exports = evenements;
