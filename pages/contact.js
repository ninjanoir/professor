import { Form, Button, Message } from 'semantic-ui-react'
import coachForYou from '../utils/coachForYou'

export default class Contact extends React.Component {
    state = {
        nom: '',
        email: '',
        message: '',
        errors: {},
        info: '',
    }

    onSubmit = e => {
        e.preventDefault()

        const { nom, email, message } = this.state

        let errs = this.validate()

        if (Object.values(errs).length === 0) {
            coachForYou
                .post('/api/mailer', { nom, email, message })
                .then(res => {
                    if (res.data.success) {
                        this.setState({
                            info: 'message envoyé avec succes',
                            nom: '',
                            email: '',
                            message: '',
                        })
                    }
                })
                .catch(e => console.error('mailer failed---', e))
        } else {
            this.setState({ errors: errs })
            console.log(errs)
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            errors: { ...this.state.errors, [e.target.name]: '' },
        })
    }

    validate = () => {
        let error = {}
        const { nom, email, message } = this.state

        if (!nom) {
            error.nom = ' champs nom requis'
        }
        if (!email) {
            error.email = 'champs email requis'
        }

        if (!message) {
            error.message = 'champs message requis'
        }
        return error
    }

    renderInfo = () => {
        setTimeout(() => {
            this.setState({ info: '' })
        }, 4000)

        return <Message info>{this.state.info}</Message>
    }

    render() {
        const { nom, email, message, errors, info } = this.state
        return (
            <div className='page_wrapper ui container'>
                <h1 className='ui header brand'>Contactez nous</h1>

                <Form onSubmit={this.onSubmit}>
                    {info ? this.renderInfo() : null}
                    <Form.Field>
                        <Form.Input
                            label='Nom'
                            name='nom'
                            onChange={this.handleChange}
                            value={nom}
                            error={errors.nom ? errors.nom : false}
                            placeholder=' John Doe'
                        />
                    </Form.Field>

                    <Form.Field>
                        <Form.Input
                            label='Adresse Email'
                            type='email'
                            name='email'
                            onChange={this.handleChange}
                            value={email}
                            error={errors.email ? errors.email : false}
                            placeholder='example@example.com'
                        />
                    </Form.Field>

                    <Form.Field>
                        <Form.TextArea
                            label='message'
                            name='message'
                            placeholder='merci pour toute précision'
                            onChange={this.handleChange}
                            value={message}
                            error={errors.message ? errors.message : false}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Button type='submit'>Envoyer</Button>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}
