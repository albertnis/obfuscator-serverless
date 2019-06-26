import { AppState } from '../store';
import { connect } from 'react-redux';
import Results, { ResultsStatefulProps } from '../components/Results';

const mapStateToProps = (state: AppState): ResultsStatefulProps => ({
    translations: state.translate.translations,
    originalMapping: {
        languageCode: state.input.languages[0],
        text: state.input.text
    }
})

const ResultsContainer = connect(
    mapStateToProps
)(Results)

export default ResultsContainer