
const validateText = (input) => {
  if (input.match(/^[A-Za-z]+$/)) {
    return true;
  }
}

const validateNumber = (input) => {
  if(input.match(/^[0-9]+$/)){
    return true;
  }
}

export const nipOnSubmit = (number) => {
  const weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let nip = String(number); 
  if (nip.length !== 10) { 
    return false; 
  } 
  let sum = nip.substring(0,9).split('').map((num, i) => (parseInt(num) * weight[i])).reduce((a, b) => a + b, 0); 
  return parseInt(sum % 11) === parseInt(nip.substring(9, 10)); 
}

export const peselOnSubmit = (number) => {
  let months = [], basicMonths = [1,2,3,4,5,6,7,8,9,10,11,12], bonusMonths = [0, 20, 40, 60, 80];
  for (let i = 0; i < basicMonths.length; i++) {
    for (let x = 0; x < bonusMonths.length; x++) {
      months.push((+basicMonths[i]) + (+bonusMonths[x]));
    }
  }
  const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let pesel = String(number);
  // długość pesel
  if(pesel.length !== 11){
    return false;
  }
  // miesiące
  if(!months.includes(+pesel.substring(2,4))){
    return false;
  }
  // dni
  if(pesel.substring(4,6) < 0 || pesel.substring(4,6) > 31){
    return false;
  }
  let sum = pesel.substring(0,10).split('').map((num, i) => (parseInt(num) * weight[i])).reduce((a, b) => a + b, 0); 
  return((10 - (sum%10)) === +pesel.substring(10,11));
}

export const validateName = (event, name, nameSetter) => {
    if (validateText(event.target.value) || event.target.value === "") {
      nameSetter((previousState) => ({...previousState, name: event.target.value}));
    }
    else {
      event.target.value = name;
    }
  }
export const validateSecondName = (event, secondName, secondNameSetter) => {
    if (validateText(event.target.value) || event.target.value === "") {
      secondNameSetter((previousState) => ({...previousState, secondName: event.target.value}));
    }
    else {
      event.target.value = secondName;
    }
  }

// Validate input, just to see if it doesnt contain any special character.
const validate = (event, maxLength, number, numberSetter) => {
  if((validateNumber(event.target.value) && number.length<maxLength) || event.target.value === ""){
    numberSetter((previousState) => ({...previousState, number: event.target.value}));
    // console.log(number);
  }
  else if(number.length===maxLength){
    numberSetter((previousState) => ({...previousState, number: event.target.value.substr(0,number.length)}))
  }
  else {
    event.target.value = number;
  }
}

export const validateNip = (event, number, numberSetter) => {
  // console.log(number);
  validate(event, 10, number, numberSetter);
}

export const validatePesel = (event, number, numberSetter) => {
  validate(event, 11, number, numberSetter);

}

export const validateImage = (event, setImage) => {
  // console.log(event.target.files[0].type);
  if((String(event.target.files[0].type)).includes("image/jpeg")){
    setImage((previousState) => ({ ...previousState, img: event.target.files[0] }))
  }else{
    setImage((previousState) => ({...previousState, img: null}))
  }
}