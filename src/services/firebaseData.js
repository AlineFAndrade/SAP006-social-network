const db = firebase.firestore();
const storage = firebase.storage();

export const addPost = (postar) => db.collection('posts').add(postar);

export const getPosts = () => db.collection('posts').orderBy('data').limit(15).get();

export const deletePost = (postID) => {
  const postsCollection = firebase.firestore().collection('posts');
  return postsCollection.doc(postID).delete();
};

export const liked = (postID) => {
  const post = firebase.firestore().collection('posts').doc(postID);
  post.onSnapshot((doc) => {
    const userId = firebase.auth().currentUser.uid;
    const curtidas = doc.data().curtidas;
    if (curtidas.includes(userId)) {
      post.update({
        curtidas: firebase.firestore.FieldValue.arrayRemove(userId),
      });
      return false;
    }
    post.update({
      curtidas: firebase.firestore.FieldValue.arrayUnion(userId),
    });
    return true;
  });
};

export const uploadImage = (folder, file) => {
  const ref = storage.ref();
  const imageName = ((new Date().getTime() / 1000) * Math.random()).toString();
  const metadata = {
    contentType: file.type,
  };
  return ref.child(folder).child(imageName).put(file, metadata);
};

export const editPosts = (typeEdit, titleEdit, hashtagsEdited, priceEdited,
  addTextEdited, reviewId) => {
  db
    .collection('posts')
    .doc(reviewId)
    .update({
      tipo: typeEdit,
      nomeLocalReceita: titleEdit,
      hashTags: hashtagsEdited,
      preco: priceEdited,
      descrição: addTextEdited,
    }).then(() => {

    })
    .catch((error) => {
      console.log('Error updating documents:', error);
    });
};

export const saveEdit = (userId, postId) => db
  .collection('posts').add({
    userId,
    postId,
  });
// "${(doc.data().curtidas) ? doc.data().curtidas.length : '0'};"
// '../../services/firebaseData.js';}
// const userFilter = curtidas.filter(userId);
