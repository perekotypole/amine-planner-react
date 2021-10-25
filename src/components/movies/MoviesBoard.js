import { useState, useEffect } from 'react'
import '../../assets/styles/components/Movies.scss'
import { DragDropContext } from 'react-beautiful-dnd'
import MovieListDND from './MovieListDND'

import movieList from '../../assets/data/plannerList'

const removeFromList = (list, index) => {
  const result = Array.from(list)
  const [removed] = result.splice(index, 1)
  return [removed, result]
}

const addToList = (list, index, element) => {
  const result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

const ListPage = () => {
  const [list, setElements] = useState(movieList)

  useEffect(() => {
    setElements(movieList)
  }, [])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const listCopy = { ...list }

    const sourceList = listCopy[result.source.droppableId]
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index,
    )
    listCopy[result.source.droppableId] = newSourceList
    const destinationList = listCopy[result.destination.droppableId]
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement,
    )

    setElements(listCopy)
  }

  return (
    <div className="MoviesBoard">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="MoviesBoard-column">
          <MovieListDND name="В планах" prefix="plans" movieList={list.plans} />
        </div>

        <div className="MoviesBoard-column">
          <MovieListDND name="Дивлюсь" prefix="watching" movieList={list.watching} />
          <MovieListDND name="В очікуванні" prefix="awaiting" movieList={list.awaiting} />
        </div>

        <div className="MoviesBoard-column">
          <MovieListDND name="Закінчено" prefix="finished" movieList={list.finished} />
          <MovieListDND name="Кинуто" prefix="left" movieList={list.left} />
        </div>
      </DragDropContext>
    </div>
  )
}

export default ListPage
