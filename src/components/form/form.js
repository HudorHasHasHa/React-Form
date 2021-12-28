import React, { useEffect, useState } from "react";
import Nav from "../nav/nav";
import './form.scss';
import {
  validateName,
  validateSecondName,
  validateNip,
  validatePesel,
  nipOnSubmit,
  peselOnSubmit,
  validateImage
} from '../../utils/utils';
import axios from "axios";
import Overlay from "../overlay/overlay";
import Image from '../image/image';

const Form = () => {

  const initialState = {
    name: "",
    secondName: "",
    type: "1",
    number: "",
    img: null,
    loading: false
  };

  const [{ name,
    secondName,
    type,
    number,
    img,
    loading },
    setState
  ] = useState(initialState);

  // useEffect(() => {
  //   console.log(type);
  // }, [type]);

  const validateOnSubmit = (name, secondName, type, number, img) => {
    console.log(name, secondName, type, number, img);
    if (name !== "" && secondName !== "" && number !== "" && typeof img === 'object') {
      let fd = new FormData();
      if (+type === 2 && nipOnSubmit(number)) {
        fd.append('name', name);
        fd.append('secondName', secondName);
        fd.append('type', type);
        fd.append('nip', number);
        fd.append('img', img, img.name);
        handleSubmit(fd);
      }
      else if (+type === 1 && peselOnSubmit(number)) {
        fd.append('name', name);
        fd.append('secondName', secondName);
        fd.append('type', type);
        fd.append('pesel', number);
        fd.append('img', img, img.name);
        handleSubmit(fd);
      }
      else if (+type === 1 && !peselOnSubmit(number)){
        console.log(peselOnSubmit(number));
        alert("Błędny pesel");
      }
      else if (+type === 2 && !nipOnSubmit(number)){
        alert("Błędny nip");
      }
    }
    else if (name === "") {
      alert("Proszę wpisać imię");
    }
    else if (secondName === "") {
      alert("Proszę wpisać nazwisko");
    }
    else if (number === "") {
      if (type === "Firma") {
        alert("Proszę wpisać Nip");
      } else {
        alert("Proszę wpisać pesel");
      }
    }
    else if (img === null) {
      alert("Proszę wybrać zdjęcie");
    }
  }

  const handleSubmit = async (json) => {
    setState((previousState) => ({ ...previousState, loading: true }))
    await axios.post('https://localhost:60001/Contractor/Save', json)
      .catch((error) => {
        setState((previousState) => ({ ...previousState, loading: false }))
        // console.log(error);
        // console.log(json);
        alert("Nie znaleziono metody zapisu");
      })
  }

  return (
    <div className="form-wrapper">
      < Nav />
      <h3 className="form-header">Form window</h3>
      <form className="form-content">
        <label>Imię</label>
        <input type="text" onChange={(event) => { validateName(event, name, setState) }} />
        <label>Nazwisko</label>
        <input type="text" onChange={(event) => { validateSecondName(event, secondName, setState) }} />
        <label>Typ</label>
        <select onChange={(event) => { setState((previousState) => ({ ...previousState, type: event.target.value, number: '' })) }}>
          <option value={1}>Osoba fizyczna</option>
          <option value={2}>Firma</option>
        </select>
        {
          type === "Firma" ? <label>NIP</label> : <label>Pesel</label>
        }
        {
          type === "Firma" ?
            <input type="text" onChange={(event) => { validateNip(event, number, setState) }} value={number} /> :
            <input type="text" onChange={(event) => { validatePesel(event, number, setState) }} value={number} />
        }
        <label>Zdjęcie</label>
        <input className="file" type="file" accept="image/jpeg" onChange={(event) => { validateImage(event, setState) }} />
        <Image img={img} />
        <button className="button" type="button" onClick={() => { validateOnSubmit(name, secondName, type, number, img) }}>{loading === false ? `Submit` : `Loading...`}</button>
      </form>
      {loading && <Overlay />}
    </div>
  )
}

export default Form;