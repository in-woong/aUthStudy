const PageBtns = ({ pageNums }: { pageNums: number[] }) => {
  return (
    <section className='flex justify-center btn-group'>
      {pageNums.map((pageNum) => (
        <button className='btn' key={pageNum}>
          {pageNum}
        </button>
      ))}
    </section>
  );
};

export default PageBtns;
