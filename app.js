"use strict";

const setInputEvent = () => {
  const zipInput = document.getElementById("zip");

  zipInput.addEventListener("focusout", handleZipValue);
};

const handleZipValue = () => {
  const zip = document.getElementById("zip").value.replace("-", "");

  if (isValidZip(zip)) {
    clearForm();
    searchZip(zip);
  } else {
    displayErroMessage("CEP incorreto!");
  }
};

const searchZip = async (zip) => {
  const zipUrl = getZipUrl(zip);
  const res = await fetch(zipUrl);
  const data = await res.json();

  if (data.hasOwnProperty("erro")) {
    displayErroMessage("CEP não encontrado!");
  } else {
    fillForm(data);
  }
};

const getZipUrl = (zip) => {
  return `https://viacep.com.br/ws/${zip}/json/`;
};

const fillForm = (data) => {
  document.getElementById("address").value = data.logradouro;
  document.getElementById("district").value = data.bairro;
  document.getElementById("city").value = data.localidade;
  document.getElementById("state").value = data.uf;
};

const isValidZip = (zip) => {
  return zip.length == 8 && isNumeric(zip);
};

const isNumeric = (zip) => {
  return /^[0-9]+$/.test(zip);
};

const displayErroMessage = (message) => {
  const addressElement = document.getElementById("address");

  return (addressElement.value = message);
};

const clearForm = () => {
  document.getElementById("address").value = "";
  document.getElementById("district").value = "";
  document.getElementById("city").value = "";
  document.getElementById("state").value = "";
};

document.addEventListener("DOMContentLoaded", setInputEvent);
