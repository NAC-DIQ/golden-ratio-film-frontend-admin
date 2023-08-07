const LoadingButton = () => {
  return (
    <button disabled className='btn btn-primary'>
      <span className='fa fa-spinner fa-spin'></span> &nbsp; Submitting
    </button>
  );
};

export default LoadingButton;
