import { LOGIN, LOGIN_ERROR, SET_LOADING_USER, SET_USER} from '../../constants/actionTypes';
import { StoryAPI } from '../../api';

const mapStateToProps = state => ({ ...state.login })

const mapDispatchToProps = dispatch => ({
    onLogin: (email, password) => {
        dispatch({ type: SET_LOADING_USER})
        StoryAPI.Auth.login(email, password)
                .then(res => dispatch({ type: LOGIN, payload: res.data}))
                .catch(err => dispatch({type: LOGIN_ERROR, error: err}))
    },
    loadUser: () => {
        dispatch({ type: SET_LOADING_USER})
        dispatch({ type: SET_USER, payload: localStorage.getItem('jwt')})
    }
})

export default { mapStateToProps, mapDispatchToProps};