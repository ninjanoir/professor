import coachForYou from '../utils/coachForYou'
import Router from 'next/router'
import Cookies from 'js-cookie'
import moment from 'moment'
import _ from 'lodash'
import {
    Item,
    Button,
    Form,
    Message,
    Input,
    Header,
    TextArea,
    Segment,
    List,
    Icon,
} from 'semantic-ui-react'

import NavForProfile from './../components/NavForProfile'

import Searchbar from './../components/Searchbar'

class Member extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            member: {},
            entreprise: {},
            coach: {},
            file: null,
            message: null,
            activeTab: 'profile',
            competences: [],
            results: [],
            value: '',
        }

        this.inputRef = React.createRef()
    }

    getMember = () => {
        coachForYou
            .get('/member')
            .then(res => {
                if (res.data.entreprise) {
                    this.setState({ entreprise: res.data.entreprise })
                }

                if (res.data.coachInfo && res.data.profileImage) {
                    this.setState({
                        member: Object.assign(
                            res.data.membreInfo,
                            res.data.profileImage
                        ),
                        coach: res.data.coachInfo,
                        competences: res.data.coachInfo.competence,
                    })
                } else if (!res.data.coachProfil && res.data.profileImage) {
                    this.setState({
                        member: Object.assign(
                            res.data.membreInfo,
                            res.data.profileImage
                        ),
                    })
                } else if (res.data.coachProfil && !res.data.profileImage) {
                    this.setState({
                        member: res.data.membreInfo,
                        coach: res.data.coachInfo,
                        competences: res.data.coachInfo.competence,
                    })
                } else {
                    this.setState({ member: res.data.membreInfo })
                }
            })
            .catch(e => console.log('something wen wrong'))
    }

    getCategorie = () => {
        if (!this.state.value) {
            return
        } else {
            coachForYou
                .get(`/categorie/${this.state.value}`)
                .then(res => {
                    if (res.data.length !== 0) {
                        let tab = []
                        tab = res.data.map((s, index) => {
                            const { _id, nom, icon } = s
                            let id = _id
                            let title = nom
                            let image = (
                                <Icon color='teal' size='big' name={icon} />
                            )
                            return { title, image, icon }
                        })

                        this.setState({ results: tab })
                    }
                })
                .catch(e => console.error(e))
        }
    }

    handleSelect = e => {
        let choice = {}

        if (!e.target.textContent) {
            return
        } else {
            if (e.target.attributes[0].value === 'title') {
                choice.icon = e.target.parentNode.parentNode.attributes[0].value
                choice.nom = e.target.textContent
            } else {
                choice.icon = e.target.attributes[0].value
                choice.nom = e.target.textContent
            }
        }

        this.setState(
            {
                competences: [...this.state.competences, choice],
                value: '',
            },
            () => this.submitCompetences()
        )
    }

    setSearchValue = event => {
        this.setState({ value: event.currentTarget.value })
    }

    submitUpdateMember = async e => {
        e.stopPropagation()
        const { nationalite, phone, dateNaissance } = this.state.member

        if (nationalite) {
            coachForYou
                .put('/member/update', { nationalite })
                .then(res => {
                    console.log(res.data)
                })
                .catch(e => console.log(e))
        }

        if (phone) {
            coachForYou
                .put('/member/update', { phone })
                .then(res => console.log(res.data))
                .catch(e => console.log(e))
        }

        if (dateNaissance) {
            coachForYou
                .put('/member/update', { dateNaissance })
                .then(res => console.log(res.data))
                .catch(e => console.log(e))
        }

        return
    }

    submitCompetences = async () => {
        let request
        if (this.state.member.isCoach) {
            request = coachForYou.put('/coach/update', {
                competence: this.state.competences,
            })
        } else {
            request = coachForYou.post('/coach', {
                competence: this.state.competences,
            })
        }

        request
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.response)
                }
            })
            .catch(e => console.log(e))
    }

    submitCoach = async (e) => {

        const { coach } = this.state

        if (this.state.member.isCoach) {
            coachForYou
                .put('/coach/update', coach)
                .then(res => {
                    console.log('response sumit coach', res)
                })
                .catch(e => console.error(e))
        } else {
            coachForYou
                .post('/coach', coach)
                .then(res => {
                    console.log('response sumit coach', res)
                })
                .catch(e => console.error(e))
        }
    }

    submitEntreprise = async e => {
        const { entreprise } = this.state
        let update = {
            [e.target.name]: entreprise[e.target.name],
        }
        let request =
            Object.values(this.state.entreprise).length === 1
                ? coachForYou.post('/pros', entreprise)
                : coachForYou.put('/pros/update', update)

        console.log(request)

        request
            .then(res => {
                if (res.data.success) {
                    console.log('update success')
                }
            })
            .catch(e => console.error(e))
    }

    componentDidMount() {
        const token = Cookies.get('x-auth-token')
        console.log('didMount file state', this.state.file)

        if (!token) {
            Router.push('/login')
        } else {
            this.getMember()
            console.log('appel du component')
        }
    }

    componentDidUpdate(prevState) {
        //competences
        this.getCategorie()
    }

    componentWillUnmount() {
        console.log('from didUnmount')
    }

    fileChange = e => {
        e.stopPropagation()
        //verif file exist
        this.setState({ file: e.target.files[0] }, () =>
            this.setState({ message: this.state.file.name })
        )
    }

    handleActivTab = val => {
        this.setState({ activeTab: val })
    }

    handleTab = val => {
        switch (val) {
            case 'profile':
                return this.renderProfile()
            case 'competences':
                return this.renderCompetences()

            case 'entreprise':
                return this.renderEntreprise()

            default:
                return this.renderProfile()
        }
    }

    fileUpload = () => {
        const form = new FormData()
        if (!this.state.member.avatar) {
            form.append('avatar', this.state.file)
            coachForYou
                .post('/upload', form, {
                    headers: {
                        'Content-type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    if (response.data.success) {
                        this.setState({
                            message: 'fichier envoyé avec succées',
                        })
                    }
                })
                .catch(e => console.error('une erreur', e))
        } else {
            form.append('avatar', this.state.file)
            coachForYou
                .put('/upload', form, {
                    headers: {
                        'Content-type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    if (response.data.success) {
                        this.setState({
                            message: 'fichier envoyé avec succées',
                        })
                    }
                })
                .catch(e => console.error('une erreur', e))
        }
    }

    updateMember = e => {
        e.stopPropagation()
        this.setState({
            member: {
                ...this.state.member,
                [e.target.name]: e.target.value,
            },
        })
    }

    setEnterprise = e => {
        this.setState({
            entreprise: {
                ...this.state.entreprise,
                [e.target.name]: e.target.value,
            },
        })
    }

    setCoach = e => {
        this.setState({
            coach: {
                ...this.state.coach,
                [e.target.name]: e.target.value,
            },
        })
    }

    renderProfile = () => {
        const { member } = this.state
        const phone = member.phone ? member.phone : '(+33)'
        const avatar = member.avatar ? member.avatar.slice(6) : null


        return (
            <div className='animated-tab'>
                <Item>
                    <Item.Image
                        size='tiny'
                        circular
                        src={
                            member.avatar
                                ? avatar
                                : 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                        }
                    />

                    <Item.Content>
                        <Item.Header as='h5'>{`${member.nom} ${member.prenom}`}</Item.Header>

                        <Item.Meta>
                            Importer votre plus belle photo de profil
                        </Item.Meta>
                        <Item.Description>
                            Quelques petits conseils, prenez une photo de face,
                            avec un arrière-plan neutre et une bonne luminosité,
                            évitez les effets et surtout souriez !
                        </Item.Description>
                        <Item.Extra style={{ padding: '1rem' }}>
                            <Form>
                                <Button
                                    color='teal'
                                    content='Importer'
                                    labelPosition='left'
                                    icon='file'
                                    onClick={() =>
                                        this.inputRef.current.click()
                                    }
                                />
                                <input
                                    type='file'
                                    ref={this.inputRef}
                                    name='avatar'
                                    hidden
                                    onChange={this.fileChange}
                                />
                                <Button
                                    type='submit'
                                    icon='upload'
                                    color='teal'
                                    onClick={this.fileUpload}
                                />

                                {!this.state.message ? null : (
                                    <Message compact info>
                                        {this.state.message}
                                    </Message>
                                )}
                            </Form>
                        </Item.Extra>
                    </Item.Content>
                </Item>

                <Header> Vos coordonnées </Header>

                <Item>
                    <Form.Group widths='equal'>
                        <Input
                            icon='at'
                            iconPosition='left'
                            label={{ tag: true, content: 'email' }}
                            labelPosition='right'
                            value={member.email}
                            size='large'
                            disabled
                            className='spaceMargin'
                        />

                        <Input
                            icon='phone'
                            iconPosition='left'
                            type='tel'
                            label={{ tag: true, content: 'phone' }}
                            labelPosition='right'
                            placeholder='Renseigner votre téléphone'
                            value={phone}
                            size='large'
                            onChange={this.updateMember}
                            onBlur={this.submitUpdateMember}
                            name='phone'
                            className='spaceMargin'
                        />
                    </Form.Group>
                </Item>

                <Header>Ta Tagline </Header>
                <Item.Header as='p'>
                    Cette phrase sera affichée sur ton profil coach visible par
                    les utilisateurs
                </Item.Header>

                <TextArea
                    placeholder='Décris-toi en quelques mots'
                    style={{ width: '100%', padding: '0.5rem' }}
                    name='meta'
                    rows={2}
                    className='text-area'
                    onChange={this.setCoach}
                    onBlur={this.submitCoach}
                    value={this.state.coach.meta}
                />

                <Header>Présentes toi en quelques ligne</Header>
                <Item.Header as='p'>
                    Décris toi de manière chaleureuse en quelques lignes et
                    n’hésite pas à lister tes missions effectuées et
                    expériences.
                </Item.Header>

                <Item>
                    <TextArea
                        placeholder='Présente toi en quelques lignes'
                        style={{
                            minHeight: 100,
                            width: '100%',
                            padding: '1rem',
                        }}
                        name='bio'
                        className='text-area'
                        onChange={this.setCoach}
                        onBlur={this.submitCoach}
                        value={this.state.coach.bio}
                    />
                </Item>
            </div>
        )
    }

    renderCompetences = () => {
        return (
            <div className='animated-tab'>
                <Item>
                    <Header className='centered'>
                        Dans quelle catégorie souhaites-tu effectuer des
                        missions de coaching
                    </Header>
                    <Item.Header className='centered' as='p'>
                        Ajoute les catégories qui t'intéresses pour pouvoir être
                        recevoir des demandes
                    </Item.Header>

                    <Searchbar
                        onSelect={this.handleSelect}
                        onChange={this.setSearchValue}
                        results={this.state.results}
                        value={this.state.value}
                    />
                </Item>

                <Item.Header as='h5' className='header_info'>
                    Ajouter des compétences
                </Item.Header>

                <Segment placeholder className='task-box'>
                    <List divided verticalAlign='middle'>
                        {this.state.competences.map((categorie, index) => {
                            return (
                                <List.Item key={index} className='task'>
                                    <List.Content floated='right'>
                                        <Button
                                            icon
                                            color='teal'
                                            onClick={() =>
                                                this.handleDelete(categorie)
                                            }>
                                            <Icon name='close' />
                                        </Button>
                                    </List.Content>
                                    <List.Icon
                                        color='grey'
                                        size='big'
                                        name={categorie.icon}
                                        verticalAlign='middle'
                                    />
                                    <List.Content>{categorie.nom}</List.Content>
                                </List.Item>
                            )
                        })}
                    </List>
                </Segment>
            </div>
        )
    }

    renderEntreprise = () => {
        const { member, entreprise } = this.state

        return (
            <div className='animated-tab'>
                <Item>
                    <Header>Données individuelles</Header>
                    <Item.Header as='p'>
                        Pour pouvoir te payer, nos partenaires bancaires ont
                        besoin de connaître ta date de naissance et ta
                        nationalité.
                    </Item.Header>

                    <Form.Group widths='equal'>
                        <Input
                            iconPosition='left'
                            type='date'
                            label='Date de naissance'
                            value={moment(member.dateNaissance).format(
                                'YYYY-MM-DD'
                            )}
                            size='large'
                            className='spaceMargin'
                            name='dateNaissance'
                            onChange={this.updateMember}
                            onBlur={this.submitUpdateMember}
                        />

                        <Input
                            iconPosition='left'
                            label='Nationalité'
                            value={member.nationalite}
                            size='large'
                            onChange={this.updateMember}
                            onBlur={this.submitUpdateMember}
                            name='nationalite'
                            className='spaceMargin'
                        />
                    </Form.Group>
                </Item>

                <Item>
                    <Header>Informations sur l'entreprise</Header>
                    <Item.Header as='h5'>Données de l'entreprise</Item.Header>
                    <Item.Header as='p'>
                        Renseigne ci-dessous les informations et documents
                        légaux relatifs à ton entreprise
                    </Item.Header>

                    <Form.Group widths='equal'>
                        <Input
                            iconPosition='left'
                            label='Forme juridique'
                            value={entreprise.statutJuridique}
                            size='large'
                            className='spaceMargin'
                            name='statutJuridique'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                        />

                        <Input
                            iconPosition='left'
                            label='Dénomination'
                            value={entreprise.raisonSociale}
                            size='large'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                            name='raisonSociale'
                            className='spaceMargin'
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Input
                            iconPosition='left'
                            label='Adresse'
                            value={entreprise.siegeSocial}
                            size='large'
                            className='spaceMargin'
                            name='siegeSocial'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                        />

                        <Input
                            iconPosition='left'
                            label='Code postal'
                            value={entreprise.codePostal}
                            size='large'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                            name='codePostal'
                            className='spaceMargin'
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Input
                            iconPosition='left'
                            label='Pays'
                            value={entreprise.pays}
                            size='large'
                            className='spaceMargin'
                            name='pays'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                        />

                        <Input
                            iconPosition='left'
                            label='Ville'
                            value={entreprise.ville}
                            size='large'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                            name='ville'
                            className='spaceMargin'
                        />
                    </Form.Group>
                </Item>
            </div>
        )
    }

    //verif method searchbar pour update state array de competences

    handleDelete = categorie => {
        if (this.state.competences.length === 1) {
            this.setState({ competences: [] })
        } else {
            let newtab = this.state.competences.filter(comp => {
                return comp !== categorie
            })
            this.setState(
                {
                    competences: newtab,
                },
                () => this.submitCoach()
            )
        }
    }

    render() {
        // console.log(this.state.member)
        // console.log(this.state.competences)
        // console.log(this.state.coach)

        return (
            <div style={{ padding: '7rem' }}>
                <Item.Group relaxed>
                    <NavForProfile handleTab={this.handleActivTab} />
                    {this.handleTab(this.state.activeTab)}
                </Item.Group>
            </div>
        )
    }
}

export default Member
