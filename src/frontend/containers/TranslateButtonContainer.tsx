import { AppState } from '../store';
import { changeText } from '../store/input/actions';
import { connect } from 'react-redux';
import TranslateButton, { TranslateButtonStatefulProps, TranslateButtonDispatchProps } from '../components/TranslateButton';
import { translateRequest } from '../store/translate/actions';
import { InputState } from '../store/input/types';

const mapStateToProps = (state: AppState): TranslateButtonStatefulProps => ({
    loading: state.translate.loading,
    input: state.input
})

const mapDispatchToProps = (dispatch: any): TranslateButtonDispatchProps => ({
    onClick: (inputState: InputState) => {
        dispatch(translateRequest(inputState))
    }
})

const TranslateButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TranslateButton)

export default TranslateButtonContainer