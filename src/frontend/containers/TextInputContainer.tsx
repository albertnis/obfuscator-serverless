import TextInput, { TextInputDispatchProps, TextInputStatefulProps } from '../components/TextInput'
import { AppState } from '../store';
import { changeText } from '../store/input/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState): TextInputStatefulProps => ({
    content: state.input.text
})

const mapDispatchToProps = (dispatch: any): TextInputDispatchProps => ({
    onChange: (text: string) => {
        dispatch(changeText(text))
    }
})

const TextInputContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInput)

export default TextInputContainer