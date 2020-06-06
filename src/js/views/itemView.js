// export const loadItem = (itemID, itemObject) => {
//   const itemObject = callback;
//   addItem(itemID, itemObject.task, itemObject.timeCreated);
// }

export const loadItem = (itemID, itemObject) => {
  const itemTask = itemObject.task;
  const itemDue = itemObject.timeCreated;
  const html = 
    `
      <div class='body-item' id='${itemID}'>
        <input type='checkbox'>
        <label class='checkbox-container'>
          <div class='item-text-container'>
            <h2 class='item-title'>${itemTask}</h2>
            <p class='item-due-date'>MADE: ${itemDue}</p>
          </div>
          <div class='item-delete-container'>
          </div>
        </label>
      </div>
    `
  $('.body-container').append(html);
}

export const addItem = (itemID, title, dueDate) => {
  const html = 
    `
      <div class='body-item' id='${itemID}'>
        <input type='checkbox'>
        <label class='checkbox-container'>
          <div class='item-text-container'>
            <h2 class='item-title'>${title}</h2>
            <p class='item-due-date'>MADE: ${dueDate}</p>
          </div>
          <div class='item-delete-container'>
          </div>
        </label>
      </div>
    `
  $('.body-container').append(html);
}