import firebase from '../../configs/firebase';
import firebaseErrors from '../../configs/firebase/auth_errors.json';

const firestore = firebase.firestore();

export default class PersonService {
    createPerson = async (person, uid) => {
        let doc = firestore.collection('persons').doc()
        doc.set({
            id: doc.id,
            name: person.name,
            points: 0,
            tierName: 'Sem divisão',
            tierNumber: 0,
            nextTierPoints: 30,
            tierURL: 'https://firebasestorage.googleapis.com/v0/b/personpoints2020.appspot.com/o/tiers%2Fno_tier.png?alt=media&token=dff74beb-3ac1-4e4d-8178-8b5c4b7579ff',
            userId: uid,
            profilePic: person.profilePic,
            genre: person.genre,
            createdAt: this.timestamp().getTime(),
            updatedAt: this.timestamp().getTime()
        })
    }

    updatePersonTier = async (pid, currentPoints, addedPoints) => {
        let tier_url, tier_name, tier_number, file_name, nextTierPoints, updatedPoints;
        
        if(addedPoints != 0) updatedPoints = (currentPoints + addedPoints);
        else updatedPoints = currentPoints

        if(updatedPoints < 0){
            // no_tier
            tier_name= 'Sem divisão';
            tier_number= 0;
            file_name='no_tier';
            nextTierPoints = 30;
        }
        else if(updatedPoints >= 0 && updatedPoints <= 30){
            // no_tier
            tier_name= 'Sem divisão';
            tier_number= 0;
            file_name='no_tier';
            nextTierPoints = 31;
        }
        else if(updatedPoints > 30 && updatedPoints <= 500){
            // Bronze I
            tier_name= 'Bronze';
            tier_number= 1;
            file_name='b1_tier';
            nextTierPoints = 501;
        }
        else if(updatedPoints > 500 && updatedPoints <= 970){
            // Bronze II
            tier_name= 'Bronze';
            tier_number= 2;
            file_name='b2_tier';
            nextTierPoints = 971;
        }
        else if(updatedPoints > 970 && updatedPoints <= 1440){
            // Bronze III
            tier_name= 'Bronze';
            tier_number= 3;
            file_name='b3_tier';
            nextTierPoints = 1441;
        }
        else if(updatedPoints > 1440 && updatedPoints <= 1910){
            // Silver I
            tier_name= 'Prata';
            tier_number= 1;
            file_name='p1_tier';
            nextTierPoints = 1911;
        }
        else if(updatedPoints > 1910 && updatedPoints <= 2410){
            // Silver II
            tier_name= 'Prata';
            tier_number= 2;
            file_name='p2_tier';
            nextTierPoints = 2411;
        }
        else if(updatedPoints > 2410 && updatedPoints <= 2910){
            // Silver III
            tier_name= 'Prata';
            tier_number= 3;
            file_name='p3_tier';
            nextTierPoints = 2911;
        }
        else if(updatedPoints > 2910 && updatedPoints <= 3470){
            // Gold I
            tier_name= 'Ouro';
            tier_number= 1;
            file_name='o1_tier';
            nextTierPoints = 3471;
        }
        else if(updatedPoints > 3470 && updatedPoints <= 4000){
            // Gold II
            tier_name= 'Ouro';
            tier_number= 2;
            file_name='o2_tier';
            nextTierPoints = 4001;
        }
        else if(updatedPoints > 4000){
            // Gold III
            tier_name= 'Ouro';
            tier_number= 3;
            file_name='o3_tier';
            nextTierPoints = 0
        }

        tier_url = await firebase.storage().ref(`tiers/${file_name}.png`).getDownloadURL()
        firestore.collection('persons').doc(pid).update({
            tierName: tier_name,
            tierNumber: tier_number,
            tierURL: tier_url,
            points: updatedPoints,
            nextTierPoints
        })
    }

    timestamp = () => {
        return new Date();
    }
}