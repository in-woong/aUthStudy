import React, { Suspense, useMemo, useRef, useState } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { uploadImage } from '../service/images';
import { imageState } from '../store/image';
import ImageLoad from './ImageLoad';

const TodoImage = ({ date }: { date: Date }) => {
  const defaultImage =
    'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80';
  const imageInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  const setImage = useSetRecoilState(imageState);
  const imageItemLoadable = useRecoilValueLoadable(imageState);
  const ImageShow = React.lazy(() => import('./ImageShow'));
  const imageURL = useMemo(() => {
    console.log('useMemo');
    return imageItemLoadable.state === 'hasValue'
      ? imageItemLoadable.contents
      : defaultImage;
  }, [imageItemLoadable, date]);

  const hanldeImageBtn = () => {
    if (!imageInput) return;
    imageInput?.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadImage(files, date, setImage);
  };

  return (
    <section className='w-1/2'>
      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={imageInput}
        className='btn'
      />
      <button onClick={hanldeImageBtn}>이미지업로드</button>
      <Suspense fallback={<ImageLoad />}>
        <ImageShow imageURL={imageURL} />
      </Suspense>
    </section>
  );
};
export default TodoImage;
