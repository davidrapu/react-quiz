import reactImage from './assets/react.svg'
import Main from './components/Main'

export default function App() {

  return (
    <>
    <Header />
    <Main />
    </>
  )
}

function Header(){
  return <header>
    <img src={reactImage} alt='reactLogo' />
    <h1>THE REACT QUIZ</h1>
  </header>
}
