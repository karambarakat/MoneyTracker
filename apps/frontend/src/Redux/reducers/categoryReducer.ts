import { Category as CatDoc } from 'types/schema'
import { CategoriesState, reducerAction } from './../types'
const initialState: CategoriesState = []

/**
 * actions
 */
export type CategoriesActionTypes =
  | {
    type: 'CATEGORY_ADD_ALL'
    pl: { categories: CatDoc[] }
  }
  | {
    type: 'CATEGORY_ADD_ONE'
    pl: { category: CatDoc }
  }
  | {
    type: 'CATEGORY_UPDATE_ONE'
    pl: { category: CatDoc }
  }
  | {
    type: 'CATEGORY_DELETE_ONE'
    pl: { id: string }
  }

export default function categoryReducer(
  state: CategoriesState = initialState,
  action: reducerAction
): CategoriesState {
  switch (action.type) {
    case 'CLEAR_ALL':
      return []
    case 'CATEGORY_ADD_ALL':
      return action.pl.categories
    case 'CATEGORY_ADD_ONE':
      return [...state, action.pl.category]
    case 'CATEGORY_UPDATE_ONE':
      return state.map((cat) => {
        if (cat._id === action.pl.category._id) return action.pl.category
        return cat
      })
    case 'CATEGORY_DELETE_ONE':
      return state.filter((cat) => cat._id !== action.pl.id)

    default:
      return state
  }
}
