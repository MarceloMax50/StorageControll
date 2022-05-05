import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Listaprodutos from './telas/produto/index';
import Cadastroproduto from './telas/produto/form';
import Listacategorias from './telas/categoria/index'
import Cadastrocategoria from './telas/categoria/form'

const Rotas = createAppContainer(
  createSwitchNavigator(
    {
      Listaprodutos,
      Cadastroproduto,
      Listacategorias,
      Cadastrocategoria
    }
  )
)

export default function App() {
  return (
    <Rotas />
  );
}

