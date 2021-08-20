import { route } from '../../routes/navigator.js';
import { addPost } from '../../services/firebaseData.js';
// const storage = firebase.storage();
// const storageRef = storage.ref();
// const imagesRef = storageRef.child('images');
// const spaceRef = storageRef.child('./img/tomato.svg');
export const postar = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
    <div class="containerPost">
    <header>
     <nav class="menu">
     <ul class="nav" id="nav">
       <li class="links"><a href=""><img src="./img/lupa.svg">Busca</a></li>
       <li class="links"><a href=""><img src="./img/perfil.svg">Perfil</a></li>
      <li class="links"><a href=""><img src="./img/home.svg">Página Inicial</a></li>
     </ul>
     </nav>
    </header>
     <main class="boxInputs">
     <div class="boxImg">
     <input class="addImg" id="addImg" type="image" src="./img/add.svg" alt="Adicionar imagem"/>
     </div>
     <div class="addfilter">
      <button class="tag" id="market">Mercados</button>
      <button class="tag" id="recipe">Receitas</button>
      <button class="tag" id="rest">Restaurantes</button>
     </div>
     <div class="titleType">
     <p id="type">selecione uma tag acima</p>
     <input type="text" id="typePost" name="typePost" placeholder="Título da Publicação"/>
     <p id="errorType"></p>
     </div>
     <input type:"text" id="hashtags" class="hashtags" name="hashtags" placeholder="#pizza #sp #vegano"/>
     <p id="errorHashtags"></p>
     <div class="addPrice">
      <label class="low"><input  id="low" type="radio" name="valor" value="$"/> $ </label>
      <label class="med"><input  id="med" type="radio" name="valor" value="$$"/> $ </label>
      <label class="high"><input  id="high" type="radio" name="valor" value="$$$"/> $ </label>
      </div>
     <textarea class="addText" id="addText" placeholder="Conte sua experiência aos amigos!" style="resize:none"></textarea>
     <p id="errorDesc"></p>
     <button class="sendPost" id="sendPost">Publicar</button>
     </main>
    </div>
  `;

  let postType = '';

  const restBtn = () => {
    rootElement.querySelector('#type').innerHTML = 'Restaurante';
    postType = 'restaurante';
  };
  const marketBtn = () => {
    rootElement.querySelector('#type').innerHTML = 'Mercado';
    postType = 'mercado';
  };
  const recipeBtn = () => {
    rootElement.querySelector('#type').innerHTML = 'Receita';
    postType = 'receita';
  };
  rootElement.querySelector('#rest').addEventListener('click', restBtn);
  rootElement.querySelector('#market').addEventListener('click', marketBtn);
  rootElement.querySelector('#recipe').addEventListener('click', recipeBtn);

  rootElement.querySelector('#sendPost').addEventListener('click', () => {
    // pegando e validando as infos //
    const localPost = rootElement.querySelector('#typePost').value;
    if (localPost === '' || localPost.length < 3) {
      const errorTittleField = document.getElementById('errorType');
      errorTittleField.innerHTML = 'Preencha com o nome do Restaurante, Mercado ou Receita';
      localPost.focus();
      return false;
    }
    const hashtagsPost = rootElement.querySelector('#hashtags').value;
    if (hashtagsPost === '' || hashtagsPost.length < 3 || hashtagsPost.indexOf('#') === -1) {
      const errorHashtagsField = document.getElementById('errorHashtags');
      errorHashtagsField.innerHTML = 'Preencha com ao menos uma #';
      errorHashtagsField.focus();
      return false;
    }
    // aqui não sei como validar o radio, acho que nem precisa //
    const pricePost = rootElement.querySelector('input[name=valor]:checked').value;

    const descPost = rootElement.querySelector('#addText').value;
    if (descPost === '' || descPost.length < 3) {
      const errorDescField = document.getElementById('errorDesc');
      errorDescField.innerHTML = 'Preencha com ao menos uma #';
      errorDescField.focus();
      return false;
    }
    const post = {
      data: new Date(),
      nome: firebase.auth().currentUser.displayName,
      image: firebase.auth().currentUser.photoURL,
      nomeLocalReceita: localPost, // inputs do post, como nome do lugar //
      tipo: postType,
      hashTags: hashtagsPost, // se é restaurante, mercado ou receita //
      preco: pricePost, // hashtags //
      descricao: descPost, // descricao do lugar ou receita //
      curtidas: [],
      comentarios: [],
    };
    addPost(post);
    route('/home');

    return false;
  });
  return rootElement;
};
