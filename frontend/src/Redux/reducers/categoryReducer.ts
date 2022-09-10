import { CategoriesState, CategoryDoc } from './../types'
const initialState: CategoriesState = []

/**
 * actions
 */
export type CategoriesActionTypes =
  | {
      type: 'CATEGORY_ADD_ALL'
      categories: CategoryDoc[]
    }
  | {
      type: 'CATEGORY_ADD_ONE'
      category: CategoryDoc
    }
  | {
      type: 'CATEGORY_UPDATE_ONE'
      category: CategoryDoc
    }
  | {
      type: 'CATEGORY_DELETE_ONE'
      id: string
    }

export default function categoryReducer(
  state: CategoriesState = initialState,
  action: CategoriesActionTypes
): CategoriesState {
  switch (action.type) {
    case 'CATEGORY_ADD_ALL':
      return action.categories
    case 'CATEGORY_ADD_ONE':
      return [...state, action.category]
    case 'CATEGORY_UPDATE_ONE':
      return state.map((cat) => {
        if (cat._id === action.category._id) return action.category
        return cat
      })
    case 'CATEGORY_DELETE_ONE':
      return state.filter((cat) => cat._id !== action.id)

    default:
      return state
  }
}
