import {
    CREATE_STORY,
    SET_STORY_LOADING,
    GET_STORY,
    GET_STORY_ERROR,
    UNLOAD_STORY,
    ACCEPT_STORY,
    REJECT_STORY,
    LOGOUT
} from '../../constants/actionTypes';
import {history} from '../../store';

export default (state = {
    loading: false,
    storyList: []
}, action) => {
    switch (action.type) {
        case CREATE_STORY:
            history.push('/story-list')
            return { 
                ...state,
                loading: false,
                storyList: [...state.storyList, action.story] 
            };
        case SET_STORY_LOADING:
            return { ...state, loading: true };
        case GET_STORY:
            return {
                ...state,
                loading: false,
                storyList: [...state.storyList, ...action.story]
            }
        case GET_STORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case ACCEPT_STORY:
            let acceptIndex = state.storyList.findIndex(story => story.tableData.id === action.payload.tableData.id)
            state.storyList[acceptIndex].status = "accepted"
            return {
                ...state,
                loading: false
            }
        case REJECT_STORY:
            let rejectIndex = state.storyList.findIndex(story => story.tableData.id === action.payload.tableData.id)
            state.storyList[rejectIndex].status = "rejected"
            return {
                ...state,
                loading: false
            }
        case UNLOAD_STORY:
            return {
                ...state,
                loading: false,
                storyList: []
            }
        case LOGOUT:
            return {
                ...state,
                loading: false,
                storyList: []
            }
        default:
            return state;
    }
}