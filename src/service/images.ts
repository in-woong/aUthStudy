import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { authService, dbService, storage } from './firebase';

export const uploadImage = (file: FileList, today: Date) => {
  const storageRef = ref(storage, `images/${file[0].name}`);
  const task = uploadBytesResumable(storageRef, file[0]);
  task.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {},
    () => {
      getDownloadURL(task.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        addImage(today, downloadURL);
      });
    }
  );
};

const addImage = (today: Date, downloadURL: string) => {
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  if (!authService.currentUser) return;
  const imageRef = doc(
    dbService,
    `todos/${authService.currentUser.uid}/${nowDate}/`,
    'images'
  );
  setDoc(imageRef, {
    imageURL: downloadURL,
  });
};
