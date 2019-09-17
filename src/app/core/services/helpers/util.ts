export const findIndexInArrayById = (array: any[], id: number) => {
  return array.findIndex(i => i.id === id);
}

export const removeInArrayById = (array: any[], id: number) => {
  const foundIndex = findIndexInArrayById(array, id);
  if (foundIndex !== -1) array.splice(foundIndex, 1);
  return { newArray: array, foundIndex };
}

export const findObjectInArrayById = (array: any[], id: number) => {
  const foundIndex = findIndexInArrayById(array, id);
  if (foundIndex === -1) {
    return null;
  }
  return array[foundIndex];
}

export const addToArray = (array: any[], newMember: any, removeDuplicates = true) => {
  if (removeDuplicates) {
    // If the member does already exist (so it is updated, not a new member) to put it at the index
    // of the removed duplicate; This is so that updated members don't jump to the bottom in lists
    const removed = removeInArrayById(array, newMember.id);
    if (removed !== null) {
      array = removed.newArray;
      array.splice(removed.foundIndex, 0, newMember);
    }
  } else {
    array.push(newMember);
  }
  return array;
}
