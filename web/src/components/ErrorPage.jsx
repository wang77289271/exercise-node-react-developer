import './style.css';

const ErrorPage = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="error">
      <h1>Oops! No data received!</h1>
      <button onClick={handleReload}>Try reload</button>
    </div>
  );
};

export default ErrorPage;
