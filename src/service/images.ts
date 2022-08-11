import { SetterOrUpdater } from 'recoil';
import { SetStateAction } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { authService, dbService, storage } from './firebase';

export const uploadImage = async (
  file: FileList,
  today: Date,
  setImage: SetterOrUpdater<string>
) => {
  console.log('UPLOAD');
  const storageRef = ref(storage, `images/${file[0].name}`);
  const task = uploadBytesResumable(storageRef, file[0]);
  let image = '';
  await task.on(
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
    (error) => {
      throw new Error(error.message);
    },
    () => {
      getDownloadURL(task.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        addImage(today, downloadURL);
        setImage(() => downloadURL);
        console.log('FINISHED');
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

export const getImage = async (today: Date) => {
  console.log('today', today);
  const nowDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  if (!authService.currentUser) return;
  const docRef = doc(
    dbService,
    `todos/${authService.currentUser.uid}/${nowDate}`,
    'images'
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
    const data = docSnap.data();
    return data.imageURL;
  } else {
    console.log('No such document!');
  }
  // const imageSnapShot = await getDocs(
  //   collection(dbService, `todos/${authService.currentUser.uid}/${nowDate}`)
  // );

  // console.log('image', imageSnapShot.docs());
  // return image;
};
