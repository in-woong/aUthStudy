const ImageLoad = () => {
  const defaultImage =
    'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80';
  return (
    <img
      className='w-[600px] h-[330px] rounded-lg'
      src={defaultImage}
      alt='todoLists Image'
    />
  );
};
export default ImageLoad;
