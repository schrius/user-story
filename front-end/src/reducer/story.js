import {
    CREATE_STORY
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_STORY: {
            return { 
                ...state, 
                isLoading: false, 
                storyList: [...state.storyList, action.payload] 
            };
        }
    }
}