const formatType = (type) => {
    let color;

    switch (type) {
        case 'Festif':
            color = 'orange lighten-1';
            break;
        case 'Lucratif':
            color = 'purple darken-3';
            break;
        case 'Non Lucratif':
            color = 'green darken-2';
            break;
        case 'Inauguration':
            color = 'teal lighten-2';
            break;
        case 'Anniversaire':
            color = 'pink darken-1';
            break;
        case 'Mariage':
            color = 'cyan darken-2';
            break;
        case 'Action Caritative':
            color = 'blue darken-4';
            break;
        case 'Fête Commerciale':
            color = 'brown lighten-1';
            break;
        case 'Remercier':
            color = 'yellow darken-1';
            break;
        case 'Lancement de Produit':
            color = 'deep-purple darken-1';
            break;
        default:
            color = 'grey';
            break;
    }

    return `chip ${color}`;
}

export default formatType;
