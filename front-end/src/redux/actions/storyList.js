
import { StoryAPI } from '../../api';
import { GET_STORY, GET_STORY_ERROR, SET_STORY_LOADING, UNLOAD_STORY, ACCEPT_STORY, REJECT_STORY, CREATE_STORY, UPDATE_STORY_ERROR} from '../../constants/actionTypes';

const mapStateToProps = state => ({story: state.story, login: state.login})
const mapDispatchToProps = dispatch => ({
    onCreateStory: (story) => {
        dispatch({type: SET_STORY_LOADING})
        dispatch({type: CREATE_STORY, story: story})
        StoryAPI.Story.createStory(story)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
    getStory: () => {
        dispatch({type: SET_STORY_LOADING})
        StoryAPI.Story.getStory()
            .then(res => dispatch({type: GET_STORY, story: res.data}))
            .catch(err => dispatch({type: GET_STORY_ERROR, error: err}))
    },
    listStory:() => {
        dispatch({type: SET_STORY_LOADING})
        StoryAPI.Story.listStory()
            .then(res => dispatch({type: GET_STORY, story: res.data}))
            .catch(err => dispatch({type: GET_STORY_ERROR, error: err}))
    },
    unloadStory: () => {
        dispatch({type: UNLOAD_STORY})
    },
    acceptStory: (story) => {
        dispatch({type: SET_STORY_LOADING})
        story.status = "accepted";
        StoryAPI.Story.updateStoryStatus(story)
            .then(res => dispatch({type: ACCEPT_STORY, payload: story}))
            .catch(err => dispatch({type: UPDATE_STORY_ERROR, error: err}))
        
    },
    rejectStory: (story) => {
        dispatch({type: SET_STORY_LOADING})
        story.status = "rejected";
        StoryAPI.Story.updateStoryStatus(story)
        .then(res => dispatch({type: REJECT_STORY, payload: story}))
        .catch(err => dispatch({type: UPDATE_STORY_ERROR, error: err}))
    }
})

export default { mapStateToProps, mapDispatchToProps};