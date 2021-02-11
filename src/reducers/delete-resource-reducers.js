const REMOVE_ITEM = 'REMOVE_ITEM'

export const removeItemReducer = (state = {reducersItems: []}, action) => {
        switch (action.payload) {
            case REMOVE_ITEM:
                return {
                    ...state,
                    reducersItems: state.reducersItems.filter
                }
        }
}

