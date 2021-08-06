import { db } from '../../firebaseInit.js';

export const postar = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
    <div class="containerPost">
    <header>
      <div class="menu">
        <a href="#login" class="active">Logo</a>
        <!-- Navigation links (hidden by default) -->
        <div id="myLinks">
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
        <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links -->
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
          <i class="fa fa-bars"></i>
        </a>
      </div>
  `;
  return rootElement;
};

db.collection('posts').add({
  first: "Ada", // inputs do post, como nome do lugar
  last: "Lovelace", // se é restaurante, mercado ou receita
  born: 1815, // hashtags
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});