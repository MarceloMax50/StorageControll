import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Listaprodutos from './telas/produto/index';
import Cadastroproduto from './telas/produto/form';


const Rotas = createAppContainer(
  createSwitchNavigator(
    {
      Listaprodutos,
      Cadastroproduto
    }
  )
)

export default function App() {
  return (
    <Rotas />
  );
}

