import logo from './assets/logo.png';

const randomImgUrl = "https://picsum.photos/400/256";

function App() {
  return (
    <div className="App">
      <h1>Task: Add an image below</h1>
      <img height={200} width={500} src={logo} alt="Logo" />
      
      <img height={200} width={500} src={require("./assets/logo.png")} alt="LogoRequired" />

      <img height={200} width={500} src={randomImgUrl} alt="logo from const" />
    </div>
  );
}

export default App;
