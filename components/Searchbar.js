import { Grid, Search } from 'semantic-ui-react'

export default class Searchbar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleResultSelect = (e, { val }) => {
        this.props.onSelect(e, val)
    }

    handleChange = (e, { value }) => {
        this.props.onChange(e, value)
    }

    render() {
        return (
            <Grid>
                <Grid.Column width={3} className='_search'>
                    <Search
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleChange}
                        results={this.props.results}
                        value={this.props.value}
                        placeholder='Recherche...'
                        className='centered'
                        {...this.props}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}
