import {
    Form,
    Grid,
    Divider,
    Header,
    Segment,
    Button,
    Message,
} from 'semantic-ui-react'
import coachForYou from '../utils/coachForYou'
import Router  from 'next/router'

export default class StayTuned extends React.Component {
    state = {
        email: '',
        error: {},
        message: null,
    }

    handleChange = e => {
        this.setState({
            email: e.target.value,
            error: { [e.target.name]: '' },
        })
    }

    renderMessage = () => {
        setTimeout(() => {
            this.setState({ message: null })
        }, 3000)
    }

    handleSubmit = e => {
        e.preventDefault()

        let errs = this.validate()

        if (Object.values(errs).length === 0) {
            coachForYou
                .post('/api/subscribe', { email: this.state.email })
                .then(res => {
                    if (res.data.success) {
                        this.setState({message: 'inscription réussie'}, ()=> this.renderMessage())
                    }
                })
                .catch(e => console.log(e))
        } else {
            this.setState({ error: errs })
        }
    }

    validate = () => {
        let error = {}

        if (this.state.email.length === 0) {
            error.email = 'email requis'
        }

        return error
    }
    render() {
        const { error } = this.state
        return (
            <Segment basic className='ui container'>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column style={{ padding: '5rem' }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                placeholder='Entrez votre email'
                                label='newsletter'
                                type='email'
                                name='email'
                                onChange={this.handleChange}
                                width={12}
                                className='marginAuto'
                                action="je m'inscris"
                                error={error.email ? 'email requis' : null}
                            />
                        </Form>

                        <div className='centered' style={{ padding: '1rem' }}>
                            {!this.state.message ? null : (<Message info compact> inscription réussie </Message>)}
                        </div>
                    </Grid.Column>

                    <Grid.Column style={{ padding: '5rem' }}>
                        <Header as='p' className='centered'>
                            Partagez nous please !
                        </Header>
                        <div className='centered'>
                            <Button onClick={() => Router.push(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://coach-for-you.herokuapp.com/')}`)} circular color='facebook' icon='facebook' />
                            <Button circular color='twitter' icon='twitter' />
                            <Button circular color='linkedin' icon='linkedin' />
                            <Button
                                circular
                                color='google plus'
                                icon='google plus'
                            />
                        </div>
                    </Grid.Column>
                </Grid>
                <Divider vertical className='verticaly'>
                    Aussi
                </Divider>
            </Segment>
        )
    }
}
