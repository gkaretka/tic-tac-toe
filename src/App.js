import Game from './components/Game.js';
import { Container } from "react-bootstrap"

function App() {
  return (
    <body>
      <Container>
        <main className='text-center'>
          <h1>Tic-tac-toe</h1>
          <Game>
          </Game>
        </main>
      </Container>
    </body>
  );
}

export default App;
