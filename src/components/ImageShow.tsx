const ImageShow = ({ imageURL }: { imageURL: string }) => {
  return (
    <img
      className='w-[600px] h-[330px] rounded-lg'
      src={imageURL}
      alt='todoLists Image'
    />
  );
};

export default ImageShow;
