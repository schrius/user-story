import { LOGIN, LOGIN_ERROR, SET_LOADING_USER, ADMIN_LOGIN} from '../../constants/actionTypes';
import { StoryAPI } from '../../api';

const mapStateToProps = state => ({ ...state.login })

const mapDispatchToProps = dispatch => ({
    onLogin: (email, password, admin) => {
        dispatch({ type: SET_LOADING_USER})
        if(admin){
            StoryAPI.Auth.adminLogin(email, password)
                .then(res => dispatch({ type: ADMIN_LOGIN, payload: res}))
                .catch(err => dispatch({type: LOGIN_ERROR, error: err}))
        } else {
            StoryAPI.Auth.login(email, password)
                .then(res => dispatch({ type: LOGIN, payload: res}))
                .catch(err => dispatch({type: LOGIN_ERROR, error: err}))
        }
    }
})

export default { mapStateToProps, mapDispatchToProps};