import { StoryAPI } from '../../api';
import { CREATE_STORY, SET_LOADING} from '../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.login
})
const mapDispatchToProps = dispatch => ({
    onCreateStory: (story) => {
        dispatch({type: SET_LOADING})
        dispatch({type: CREATE_STORY, story: story});
        StoryAPI.Story.createStory(story)
            .then()
            .catch(err => console.log(err));
    }
})


export default { mapStateToProps, mapDispatchToProps};