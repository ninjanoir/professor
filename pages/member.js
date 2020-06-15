import coachForYou from '../utils/coachForYou'
import Router from 'next/router'
import Cookies from 'js-cookie'
import moment from 'moment'

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
            message: '',
            activeTab: 'profile',
            competence: [],
            results: [],
            value: '',
        }

        this.inputRef = React.createRef()
    }

    //--------------Select catégorie de compétence------------
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
                competence: [...this.state.competence, choice],
                value: '',
            },
            () => this.submitCompetences()
        )
    }

    setSearchValue = event => {
        this.setState({ value: event.currentTarget.value })
    }

    handleDelete = categorie => {
        if (this.state.competence.length === 1) {
            this.setState({ competence: [] })
        } else {
            let newtab = this.state.competence.filter(comp => {
                return comp !== categorie
            })
            this.setState(
                {
                    competence: newtab,
                },
                () => this.submitCoach()
            )
        }
    }

    //------------Update Membre profile, Coach, Entreprise--------------------
    submitUpdateMember = async e => {
        e.stopPropagation()

        coachForYou
            .put('/api/member/update', { [e.target.name]: e.target.value })
            .then(res => {
                console.log(res.data)
            })
            .catch(e => console.log(e))

        return
    }

    submitCompetences = async () => {
        const { member, competence } = this.state

        let request = member.isCoach
            ? coachForYou.put('/api/coach/update', { competence })
            : coachForYou.post('/api/coach', { competence })

        request
            .then(res => {
                if (res.data.success) {
                    console.log('update competence reussi')
                }
            })
            .catch(e => console.log(e))
    }

    submitCoach = async e => {
        const { coach, member } = this.state

        let request = member.isCoach
            ? coachForYou.put('/api/coach/update', coach)
            : coachForYou.post('/api/coach', coach)

        request
            .then(res => {
                if (res.data.success) {
                    this.setState(
                        { message: 'mise à jour du profil réussi' },
                        () => this.renderMessage()
                    )
                } else {
                    this.setState({ message: 'Echec de la mise à jour' }, () =>
                        this.renderMessage()
                    )
                }
            })
            .catch(e => console.error('submit coach failed------', e))
    }

    submitEntreprise = async e => {
        const { entreprise } = this.state
        let update = {
            [e.target.name]: entreprise[e.target.name],
        }
        let request =
            Object.values(this.state.entreprise).length === 1
                ? coachForYou.post('/api/pros', entreprise)
                : coachForYou.put('/api/pros/update', update)

        request
            .then(res => {
                if (res.data.success) {
                    console.log('update success')
                }
            })
            .catch(e => console.error(e))
    }

    updateMember = e => {
        e.stopPropagation()
        this.setState({
            member: {
                ...this.state.member,
                [e.target.name]: e.target.value,
            },
        })

        return
    }

    setEnterprise = e => {
        this.setState({
            entreprise: {
                ...this.state.entreprise,
                [e.target.name]: e.target.value,
            },
        })

        return
    }

    setCoach = e => {
        this.setState({
            coach: {
                ...this.state.coach,
                [e.target.name]: e.target.value,
            },
        })

        return
    }

    //-------------------------------------life cycle : -------------------------------------
    componentDidMount() {
        const token = Cookies.get('x-auth-token')

        if (!token) {
            Router.replace('/login')
        } else {
            this.getMember()
        }
    }

    componentDidUpdate(prevState) {
        //competences
        this.getCategorie()
    }

    componentWillUnmount() {
        console.log('from didUnmount')
    }

    getMember = async () => {
        coachForYou
            .get('/api/member')
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
                        competence: res.data.coachInfo.competence,
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
                        competence: res.data.coachInfo.competence,
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
                .get(`/api/categorie/${this.state.value}`)
                .then(res => {
                    if (res.data.length !== 0) {
                        let tab = []
                        tab = res.data.map((s, index) => {
                            const { nom, icon } = s
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

    //--------------------------------------upload File--------------------------------
    fileChange = e => {
        e.stopPropagation()

        this.setState({ file: e.target.files[0] }, () =>
            this.setState({ message: this.state.file.name })
        )
    }

    fileUpload = () => {
        let form = new FormData()

        const { file, member } = this.state
        const headers = {
            'Content-type': 'multipart/form-data',
        }

        form.append('avatar', file)

        let avartarId = member._id

        let request = member.avatar
            ? coachForYou.put(`/api/upload/${avartarId}`, form, { headers })
            : coachForYou.post('/api/upload', form, { headers })

        request
            .then(response => {
                if (response.data.success) {
                    this.setState(
                        {
                            message: 'fichier envoyé avec succées',
                        },
                        () => {
                            this.renderMessage()
                        }
                    )
                }
            })
            .catch(e => console.error('file upload failed--->', e))
    }

    renderMessage = () => {
        setTimeout(() => {
            this.setState({ message: '' }, () => Router.reload())
        }, 3000)
    }

    //--------------------------------------hadle Tab----------------------------------

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

    renderProfile = () => {
        const { member, message, coach, file } = this.state
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

                                {message ? (
                                    <Message info compact>
                                        {this.state.message}
                                    </Message>
                                ) : null}
                            </Form>
                        </Item.Extra>
                    </Item.Content>
                </Item>

                <Item>
                    <Item.Content style={{ padding: '1rem' }}>
                        <Button
                            icon='world'
                            labelPosition='left'
                            onClick={() => Router.push(`/profile/${coach._id}`)}
                            content='Voir profil public'
                        />
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
                        {this.state.competence.map((categorie, index) => {
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
                            label={{ tag: true, content: 'Date de naissance' }}
                            labelPosition='right'
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
                            label={{ tag: true, content: 'Nationalité' }}
                            labelPosition='right'
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
                    <Item.Header as='p'>
                        Renseigne ci-dessous les informations et documents
                        légaux relatifs à ton entreprise
                    </Item.Header>
                    <Input
                        iconPosition='left'
                        label={{ tag: true, content: 'Siret' }}
                        labelPosition='right'
                        type='number'
                        value={entreprise.siret}
                        size='large'
                        className='spaceMargin'
                        placeholder='542 256 655 000 23'
                        name='siret'
                        onChange={this.setEnterprise}
                        onBlur={this.submitEntreprise}
                    />

                    <Form.Group widths='equal'>
                        <Input
                            iconPosition='left'
                            label={{ tag: true, content: 'Forme juridique' }}
                            labelPosition='right'
                            value={entreprise.statutJuridique}
                            size='large'
                            placeholder='sarl'
                            className='spaceMargin'
                            name='statutJuridique'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                        />

                        <Input
                            iconPosition='left'
                            label={{ tag: true, content: 'Dénomination' }}
                            labelPosition='right'
                            value={entreprise.raisonSociale}
                            size='large'
                            placeholder='Raison sociale'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                            name='raisonSociale'
                            className='spaceMargin'
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Input
                            iconPosition='left'
                            label={{ tag: true, content: 'Adresse' }}
                            labelPosition='right'
                            value={entreprise.siegeSocial}
                            size='large'
                            placeholder='10 rue Jean Jaures'
                            className='spaceMargin'
                            name='siegeSocial'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                        />

                        <Input
                            iconPosition='left'
                            label={{ tag: true, content: 'Code postal' }}
                            labelPosition='right'
                            value={entreprise.codePostal}
                            size='large'
                            placeholder='13000'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                            name='codePostal'
                            className='spaceMargin'
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Input
                            iconPosition='left'
                            label={{ tag: true, content: 'Pays' }}
                            labelPosition='right'
                            value={entreprise.pays}
                            size='large'
                            placeholder='France'
                            className='spaceMargin'
                            name='pays'
                            onChange={this.setEnterprise}
                            onBlur={this.submitEntreprise}
                        />

                        <Input
                            iconPosition='left'
                            label={{ tag: true, content: 'Ville' }}
                            labelPosition='right'
                            value={entreprise.ville}
                            size='large'
                            placeholder='Marseille'
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

    render() {
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
