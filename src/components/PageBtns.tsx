const PageBtns = ({ pageNums }: { pageNums: number[] }) => {
  return (
    <section className='flex justify-center'>
      {pageNums.map((pageNum) => (
        <button className='btn btn-ghost' key={pageNum}>
          {pageNum}
        </button>
      ))}
    </section>
  );
};

export default PageBtns;
