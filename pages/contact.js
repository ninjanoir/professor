import { Form, Button } from "semantic-ui-react";

export default class Contact extends React.Component {
    state = {
        nom: "",
        prenom: "",
        message: "",
        errors: {},
    };


    onSubmit = (e) => {
        e.preventDefault();

        let errs = this.validate();

        if (Object.values(errs).length === 0) {
            console.log(this.state)
        } else {
        this.setState({ errors: errs });
        console.log(errs);
        }
    };

    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value,
        errors: {...this.state.errors, [e.target.name]: "" },
        });
    };

    validate = () => {
        let error = {};
        const { nom, prenom, message } = this.state;

        if (!nom) {
        error.nom = " champs nom requis";
        }
        if (!prenom) {
        error.prenom = "champs prenom requis";
        }

        if (!message) {
        error.message = "champs message requis";
        }
        return error;
    };

    render() {
        const { nom, prenom, message, errors } = this.state;
        return (
        <div className="page_wrapper ui container">
            <h1 className="ui header">Contactez nous</h1>
            <Form onSubmit={this.onSubmit}>
            <Form.Field>
                <Form.Input
                label="Nom"
                name="nom"
                onChange={this.handleChange}
                value={nom}
                error={errors.nom ? errors.nom : false}
                />
            </Form.Field>

            <Form.Field>
                <Form.Input
                label="Prénom"
                name="prenom"
                onChange={this.handleChange}
                value={prenom}
                error={errors.prenom ? errors.prenom : false}
                />
            </Form.Field>

            <Form.Field>
                <Form.TextArea
                label="message"
                name="message"
                placeholder="merci pour toute précision"
                onChange={this.handleChange}
                value={message}
                error={errors.message ? errors.message : false}
                />
            </Form.Field>

            <Form.Field>
                <Button type="submit">Envoyer</Button>
            </Form.Field>
            </Form>

        </div>
        );
    }
}
