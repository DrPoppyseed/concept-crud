import * as itemView from './views/itemView';
import Item from './models/Item';
import uniqid from 'uniqid';

const firebaseConfig = {
  apiKey: "AIzaSyCLYTOdbWoXJcjCh5pNUOM84DF55JXbc1Q",
  authDomain: "concept-crud.firebaseapp.com",
  databaseURL: "https://concept-crud.firebaseio.com",
  projectId: "concept-crud",
  storageBucket: "concept-crud.appspot.com",
  messagingSenderId: "1025372666088",
  appId: "1:1025372666088:web:3fe7d18e28b7e81aebb15d",
  measurementId: "G-7KSFTCDRM4"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const state = {
  uid: 'IIgaHntNOATyYxbNRpVcb041bUw1',
};

// $('.auth-btn').click((e) => {
//   e.preventDefault();
//   if (state.toggleAuthModal) {
//     $('.auth-modal').css('display', 'flex');
//     $('.body-container').css('display', 'none');
//     $('.add-item-container').css('display', 'none')
//     state.toggleAuthModal =  false;
//   } else {
//     $('.auth-modal').css('display', 'none');
//     $('.body-container').css('display', 'block');
//     $('.add-item-container').css('display', 'block')
//     state.toggleAuthModal =  true;
//   }
// })
 
const itemController = async () => {
  state.item = new Item();

  state.itemIDs = await state.item.readItemIDs(state.uid);
  console.log(state.itemIDs + ': state.itemIDs from itemController');
  loadItems(state.itemIDs);

  /**
   * add item
   * 
   * onclick
   *  // 事前処理
   *  -> retrieve title && due-date
   *  -> create itemID in itemView w/ uniqid
   *  -> retrieve itemIDs array (old) && uid
   * 
   *  //　本処理
   *  -> call state.item.createItem(itemID, itemIDs, uid)
   *  -> call itemView.addItem(itemID, title, due-date)
   *  
   *  // 事後処理
   *  -> update title to blank
   *  -> update itemIDs in state
   *  -> update itemIDs in database
   */
};

$('.add-btn').unbind('click').click((e) => {
  e.preventDefault();
  const itemTitle = $('.add-item-title-input');
  const itemDueDate = $('.add-item-due-date-input');
  console.log(itemDueDate.value);
  const itemID = uniqid();

  state.item.createItem(itemID, itemTitle.val(), itemDueDate.value, state.itemIDs, state.uid);
  itemView.addItem(itemID, itemTitle.val(), itemDueDate.value);

  console.log(state.itemIDs + ': state.itemIDs from add-btn (before)');
  state.itemIDs = state.itemIDs.push(itemID);
  console.log(state.itemIDs + ': state.itemIDs from add-btn (after)');
})

const loadItems = async (array) => {
  for (const itemID of array) {
    const itemContent = await state.item.readItemContent(itemID);
    if (!itemContent.status) {
      itemView.loadItem(itemID, itemContent);
    }
  }
}

$(document).ready(function () {
  itemController();
})