
import { StoryAPI } from '../../api';
import { GET_STORY, GET_STORY_ERROR, SET_STORY_LOADING, UNLOAD_STORY, ACCEPT_STORY, REJECT_STORY} from '../../constants/actionTypes';

const mapStateToProps = state => ({story: state.story, login: state.login})
const mapDispatchToProps = dispatch => ({
    getStory: (user) => {
        dispatch({type: SET_STORY_LOADING})
        StoryAPI.Story.getStory(user)
            .then(res => dispatch({type: GET_STORY, story: res}))
            .catch(err => dispatch({type: GET_STORY_ERROR, error: err}))
    },
    unloadStory: () => {
        dispatch({type: UNLOAD_STORY})
    },
    acceptStory: (story) => {
        dispatch({type: ACCEPT_STORY, payload: story})
    },
    rejectStory: (story) => {
        dispatch({type: REJECT_STORY, payload: story})
    }
})

export default { mapStateToProps, mapDispatchToProps};