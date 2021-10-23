import '../assets/styles/pages/CalendarPage.scss'
import { DragDropContext } from 'react-beautiful-dnd'
import MovieListDND from '../components/movies/MovieListDND'

import Jojo from '../assets/images/jojo.jpg'

const movieList = [
  {
    id: 1,
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
    checked: true,
  },
  {
    id: 2,
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    id: 3,
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    id: 4,
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
    checked: true,
  },
  {
    id: 5,
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
    checked: true,
  },
  {
    id: 6,
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    id: 7,
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
    checked: true,
  },
  {
    id: 8,
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    id: 9,
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    id: 10,
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
]

const ListPage = () => (
  <DragDropContext className="ListPage">
    <MovieListDND movieList={movieList} />
  </DragDropContext>
)

export default ListPage
