import { AppState } from '../store';
import { changeLanguages } from '../store/input/actions';
import { connect } from 'react-redux';
import LanguageSelectSection, { LanguageSelectStatefulProps, LanguageSelectDispatchProps } from '../components/LanguageSelectSection';
import { ValidLanguageCode } from '../../types';

const mapStateToProps = (state: AppState): LanguageSelectStatefulProps => ({
    languages: state.input.languages
})

const mapDispatchToProps = (dispatch: any): LanguageSelectDispatchProps => ({
    onChange: (newLanguage: ValidLanguageCode, index: number) => {
        dispatch(changeLanguages(newLanguage, index))
    }
})

const LanguageSelectSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSelectSection)

export default LanguageSelectSectionContainer