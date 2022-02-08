// Функция обрезает текс до выбранного количества символов
const cropText = (text, characters) => {
  // const regExp = /.{170}\S*/s;
  // return text.length > 170 ? `${text.match(regExp)} ...` : text;
  const regExp = new RegExp(`^.{${characters}}\x53*`, 's');
  return text.length > characters ? `${text.match(regExp)} ...` : text;
};

export default cropText;
