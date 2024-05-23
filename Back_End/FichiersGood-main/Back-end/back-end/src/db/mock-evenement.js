const evenements = [
    {
        id: 1,
        nom: "JJ",
        dateDebut: new Date(2024, 5, 21),
        heureDebut: '18:00:00',
        dateFin: new Date(2024, 5, 21),
        heureFin: '22:00:00',
        lieu: "Montpellier",
        typeLieu: "Intérieur",
        objectifs: ["Festif"].join(', '),
        questionsInterieur: JSON.stringify({
            besoinSignaletique: 'Oui',
            superficie: 200,
            nombresEntreesSimples: 2,
            nombreEntreesPrincipales: 1,
            forme: 'Circulaire',
            chauffage: 'Oui',
            coinFumeur: 'Non',
            coinTraiteur: 'Oui',
            batimentERP: 'Oui'
        }),
        questionsExterieur: null,
        questionsMixte: null,
        vigneronsNoms: JSON.stringify(["Vigneron 1", "Vigneron 2"]),
        prestatairesNoms: JSON.stringify(["Prestataire 1", "Prestataire 2"]),
        animationsNoms: JSON.stringify(["Animation 1", "Animation 2"]),
        sponsorsNoms: JSON.stringify(["Sponsor 1", "Sponsor 2"]),
        parking: JSON.stringify({
            disponible: 'Oui',
            superficie: 1000,
            nombreEntrees: 2,
            nombreEntreesPrincipales: 1,
            distanceParking: 100,
            navette: 'Non'
        }),
        created: new Date(2023, 4, 15)
    },
    {
        id: 2,
        nom: "Vin'dredis",
        dateDebut: new Date(2023, 5, 20),
        heureDebut: '10:00:00',
        dateFin: new Date(2023, 5, 20),
        heureFin: '18:00:00',
        lieu: "Nîmes",
        typeLieu: "Extérieur",
        objectifs: ["Lucratif"].join(', '),
        questionsInterieur: null,
        questionsExterieur: JSON.stringify({
            electricite: 'Oui',
            eau: 'Non',
            poubelle: 'Oui',
            toilette: 'Oui',
            abris: 'Oui',
            vegetation: 'Oui',
            typeDeSol: 'Gazon'
        }),
        questionsMixte: null,
        vigneronsNoms: JSON.stringify(["Vigneron 3", "Vigneron 4"]),
        prestatairesNoms: JSON.stringify(["Prestataire 3", "Prestataire 4"]),
        animationsNoms: JSON.stringify(["Animation 3", "Animation 4"]),
        sponsorsNoms: JSON.stringify(["Sponsor 3", "Sponsor 4"]),
        parking: JSON.stringify({
            disponible: 'Oui',
            superficie: 500,
            nombreEntrees: 1,
            nombreEntreesPrincipales: 1,
            distanceParking: 200,
            navette: 'Oui'
        }),
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
        questionsInterieur: JSON.stringify({
            besoinSignaletique: 'Oui',
            superficie: 300,
            nombresEntreesSimples: 3,
            nombreEntreesPrincipales: 2,
            forme: 'Rectangulaire',
            chauffage: 'Oui',
            coinFumeur: 'Oui',
            coinTraiteur: 'Oui',
            batimentERP: 'Non'
        }),
        questionsExterieur: JSON.stringify({
            electricite: 'Non',
            eau: 'Oui',
            poubelle: 'Oui',
            toilette: 'Oui',
            abris: 'Oui',
            vegetation: 'Non',
            typeDeSol: 'Gravier'
        }),
        questionsMixte: JSON.stringify({
            electricite: 'Oui',
            eau: 'Oui',
            poubelle: 'Oui',
            toilette: 'Oui',
            abris: 'Oui',
            vegetation: 'Oui',
            typeDeSol: 'Mixte'
        }),
        vigneronsNoms: JSON.stringify(["Vigneron 5", "Vigneron 6"]),
        prestatairesNoms: JSON.stringify(["Prestataire 5", "Prestataire 6"]),
        animationsNoms: JSON.stringify(["Animation 5", "Animation 6"]),
        sponsorsNoms: JSON.stringify(["Sponsor 5", "Sponsor 6"]),
        parking: JSON.stringify({
            disponible: 'Non',
            superficie: null,
            nombreEntrees: null,
            nombreEntreesPrincipales: null,
            distanceParking: null,
            navette: 'Non'
        }),
        created: new Date(2023, 6, 10)
    }
];

module.exports = evenements;

