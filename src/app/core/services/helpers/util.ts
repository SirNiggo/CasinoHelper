export const findIndexInArrayById = (array: any[], id: number) => {
  return array.findIndex(i => i.id === id);
}

export const removeInArrayById = (array: any[], id: number) => {
  const foundIndex = findIndexInArrayById(array, id);
  if (foundIndex !== -1) array.splice(foundIndex, 1);
  return array;
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
    array = removeInArrayById(array, newMember.id);
  }
  array.push(newMember);
  return array;
}
