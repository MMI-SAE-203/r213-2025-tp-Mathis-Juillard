import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export async function getOffres() {
    try {
        let data = await pb.collection('Agence').getFullList({
            sort: '-created',
        });
        data = data.map((offres) => {
            offres.img = pb.files.getURL(offres, offres.images);
            return offres;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agences', error);
        return [];
    }
}


export async function getOffre(id) {
    try {
        let data = await pb.collection('Agence').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}


export async function bySurface(s) {
    const surfaceRecord = await pb.collection('Agence').getFullList({ filter : `superficie> ${200}`, }) ;
    return surfaceRecord ;
    }

export async function byPrix(p) {
        const prixRecord = await pb.collection('Agence').getFullList({ filter: `Prix < ${1000}`, }) ;
        return prixRecord;
    }


    export async function addOffre(house) {
        try {
            await pb.collection('Agence').create(house);
            return {
                success: true,
                message: 'Offre ajoutée avec succès'
            };
        } catch (error) {
            console.log('Une erreur est survenue en ajoutant la maison', error);
            return {
                success: false,
                message: 'Une erreur est survenue en ajoutant la maison'
            };
        }
    }