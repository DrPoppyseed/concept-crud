// import uniqid from 'uniqid';
import timestamp from 'time-stamp';

export default class Item {
  constructor() {}

  async readItemIDs(uid) {
    return await 
      firebase.database().ref(`users/${uid}/itemIDs`)
        .once('value')
        .then(async (s) => {
          // console.log(`${s.val()} from readItemIDs`)
          return await s.val().toString().split(',');
        })
        .catch((err) => {
          console.log(err);
        }); 
  }

  readItemContent(itemID) {
    return firebase.database().ref(`items/${itemID}`)
        .once('value')
        .then((s) => {
          // console.log( `${s.val().createdAt} from readItemContent`)
          const temp = {
            timeCreated: s.val().createdAt,
            timeDue: s.val().dueDate,
            status: s.val().status,
            task: s.val().task,
            uid: s.val().uid
          }
          return temp;
        })
        .catch(err => {
          console.log(err);
        })
  }

  async createItem(noteID, itemTask, itemDueDate, noteIDs, uid) {
    var db = firebase.database();
    db.ref(`items`).child(`${noteID}`)
      .set({
        createdAt: timestamp(`YYYY/MM/DD/HH:mm:ss`),
        dueDate: itemDueDate,
        status: false,
        task: itemTask,
        uid: uid
      })
      .then(async () => {
        // console.log(`${noteID}, ${noteIDs}, ${uid} from createItem`)
        db.ref(`users/${uid}`)
          .update({
            "itemIDs": `${noteIDs}, ${noteID}`
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  async updateItemStatus(noteID) {
    firebase.database().ref(`items/${noteID}/status`)
      .once('value')
      .then(async (s) => {
        var state = s.val();
        if (state) {
          s.update({ "status": false })
        } else {
          s.update({ "status": true })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}