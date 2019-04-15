import { AppState } from '../store';
import { changeLanguages } from '../store/input/actions';
import { connect } from 'react-redux';
import LanguageSelect, { LanguageSelectStatefulProps, LanguageSelectDispatchProps } from '../components/LanguageSelect';
import { ValidLanguageCode } from '../../types';

const mapStateToProps = (state: AppState): LanguageSelectStatefulProps => ({
    languages: state.input.languages
})

const mapDispatchToProps = (dispatch: any): LanguageSelectDispatchProps => ({
    onChange: (newLanguage: ValidLanguageCode, index: number) => {
        dispatch(changeLanguages(newLanguage, index))
    }
})

const LanguageSelectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSelect)

export default LanguageSelectContainer