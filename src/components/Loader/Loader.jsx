import './Loader.css';

const Loader = ({ size = 'md', text = '', fullScreen = false }) => {
  const loader = (
    <div className={`loader-container ${fullScreen ? 'loader-fullscreen' : ''}`}>
      <div className={`loader-spinner loader-${size}`} />
      {text && <p className="loader-text">{text}</p>}
    </div>
  );

  return loader;
};

export default Loader;
