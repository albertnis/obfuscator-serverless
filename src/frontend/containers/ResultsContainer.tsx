import { AppState } from '../store';
import { connect } from 'react-redux';
import Results, { ResultsStatefulProps } from '../components/Results';

const mapStateToProps = (state: AppState): ResultsStatefulProps => ({
    translations: state.translate.translations
})

const ResultsContainer = connect(
    mapStateToProps
)(Results)

export default ResultsContainer