import { useRouter } from 'next/router'
import { useState } from 'react'
import getConfig from 'next/config'
import {
    Responsive,
    Grid,
    Header,
    Form,
    Segment,
    Button,
    Item,
    Container,
    Card,
    Embed,
    Icon,
    Modal,
    TextArea,
} from 'semantic-ui-react'

import Competence from './../../components/Competence'
import Contact from './../contact'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

console.log(
    'test DEV env-----------------------------------------------------------------------------------',
    process.env.npm_config_progress
)
console.log(
    'test DEV env-----------------------------------------------------------------------------------',
    process.env.NODE_ENV
)

console.log('domain', publicRuntimeConfig.DOMAIN)

const Profile = props => {
    //update profil depuis le fetch.......

    const [options, setOptions] = useState([
        { icon: 'world', nom: 'web' },
        { icon: 'photo', nom: 'photographie' },
    ])
    const [posts, setPosts] = useState([
        {
            videoId: '2LACmJB-wFQ',
            info: 'test description post profil',
            like: 22,
        },
    ])
    //post info principal
    const [info, setInfo] = useState('')

    //form video
    const [form2, setForm2] = useState({})

    //const router = useRouter()

    //fetching profil coach + membre selon router.query
    // console.log(router.query)

    const validateTextArea = () => {
        let err = {}

        if (!info) {
            err.info = 'aucun message à poster'
        }

        return err
    }

    //construite header profile info sous form de Card

    const handleSubmit = () => {
        let err = validateTextArea()

        console.log('setPosts----texteare', posts)

        if (Object.values(err).length === 0) {
            setPosts([...posts, { info }])
            setInfo('')
        } else {
            setErrors(err)
        }
    }

    //state TextArea

    const handleTextArea = e => {
        setInfo(e.target.value)
        setErrors({
            [e.target.name]: '',
        })
    }

    //handle close modal
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    const close = () => {
        setOpen(false)

        //initialise les variable
    }

    const close2 = () => {
        setOpen2(false)
    }

    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({})

    const validateFormContact = () => {
        let err = {}

        const { nomPrenom, message } = form

        if (!nomPrenom) {
            err.nomPrenom = 'nom et prenom requis'
        }
        if (!message) {
            err.message = 'aucun message saisi'
        }

        return err
    }

    //senMessage to the Coach
    const submitMessage = () => {
        let error = validateFormContact()

        if (Object.values(error).length === 0) {
            //nodemailer-----------

            console.log(form)
        } else {
            setErrors(error)
        }
    }

    //handleForm Contact
    const handleForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })

        setErrors({
            [e.target.name]: '',
        })
    }

    const renderFormContact = () => {
        return (
            <Modal dimmer='blurring' open={open} onClose={close}>
                <Modal.Header>Votre Message</Modal.Header>
                <Form>
                    <Modal.Content>
                        <div style={{ padding: '2rem' }}>
                            <Form.Field>
                                <Form.Input
                                    name='nomPrenom'
                                    label='prenom et nom'
                                    placeholder='John Doe'
                                    onChange={handleForm}
                                    error={
                                        errors.nomPrenom
                                            ? errors.nomPrenom
                                            : null
                                    }
                                    value={form.nomPrenom}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Form.TextArea
                                    name='message'
                                    placeholder='merci pour votre message'
                                    onChange={handleForm}
                                    error={
                                        errors.message ? errors.message : null
                                    }
                                    value={form.message}
                                />
                            </Form.Field>
                        </div>
                    </Modal.Content>
                    <Modal.Actions style={{ padding: '0.5rem' }}>
                        <Button color='black' onClick={close}>
                            Annuler
                        </Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='Envoyer'
                            onClick={submitMessage}
                        />
                    </Modal.Actions>
                </Form>
            </Modal>
        )
    }

    const validateFormVideo = () => {
        let err = {}

        if (!form2.videoId) {
            err.videoId2 = 'champs url requis'
        }

        if (!form2.info) {
            err.info2 = 'champs infoVideo requis'
        }

        return err
    }

    const submitVideo = () => {
        let err = validateFormVideo()

        console.log('setPosts----texteare', posts)
        console.log('form2 scope submmitvideo---', form2)

        if (Object.values(err).length === 0) {
            setPosts([...posts, form2])

            //TODO: post info database au lieu de setPosts
            setForm2({})
            close2()

        } else {
            setErrors(err)
        }
    }

    const handleVideoForm = e => {
        let regex = new RegExp('[https://youtu.be/]')


        if (e.target.name === 'videoId' && regex.test(e.target.value)) {
            let youtube = e.target.value.replace('https://youtu.be/', '')

            setForm2({ ...form2, videoId: youtube })
            setErrors({ videoId2: '' })
        } else {

            setForm2({videoId: ''})
            setErrors({ videoId2: 'url non valide' })
        }

        if (e.target.name === 'info') {

            setForm2({ ...form2, [e.target.name]: e.target.value })
            setErrors({ info2: '' })
        }
    }

    const renderForm = () => {
        return (
            <Modal dimmer='blurring' open={open2} onClose={close2}>
                <Modal.Header>Postez une vidéo</Modal.Header>
                <Form>
                    <Modal.Content>
                        <div style={{ padding: '1rem' }}>
                            <Form.Field>
                                <Form.Input
                                    label='url video youtube'
                                    name='videoId'
                                    onChange={handleVideoForm}
                                    value={form2.videoId}
                                    error={
                                        errors.videoId2 ? errors.videoId2 : null
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea
                                    name='info'
                                    onChange={handleVideoForm}
                                    value={form2.info}
                                    error={errors.info2 ? errors.info2 : null}
                                />
                            </Form.Field>
                        </div>
                    </Modal.Content>
                    <Modal.Actions style={{ padding: '0.5rem' }}>
                        <Button color='black' onClick={close2}>
                            Annuler
                        </Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='Envoyer'
                            onClick={submitVideo}
                        />
                    </Modal.Actions>
                </Form>
            </Modal>
        )
    }

    //delete Post
    const deletePost = (index) => {
        console.log('index du post', index)
    }

    //presentation de contenu
    const renderPosts = () => {
        return posts.map((post, index) => {
            return (
                <Card key={index} fluid>
                    {post.videoId ? (
                        <Embed
                            active={true}
                            id={post.videoId}
                            source='youtube'
                        />
                    ) : null}
                    <Card.Content>
                        <Card.Description>{post.info}</Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                        <Icon name='like' />
                        {post.like}
                        <Icon name='trash alternate outline' onClick={() => deletePost(index)} style={{float: 'right', cursor: 'pointer'}}/>
                    </Card.Content>
                </Card>
            )
        })
    }

    return (
        <div className='page_wrapper_bis'>
            {open ? renderFormContact() : null}
            {open2 ? renderForm() : null}

            <Grid stackable>
                <Grid.Column mobile={16} tablet={4} computer={4}>
                    <Responsive as={Segment}>
                        <Item>
                            <Item.Image
                                size='tiny'
                                src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg'
                                circular
                            />

                            <Item.Content>
                                <Item.Header as='a'>
                                    Johnny Lawrence
                                </Item.Header>
                                <Item.Description>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </Item.Description>

                                <Item.Extra style={{ padding: '0.5rem' }}>
                                    <Button
                                        onClick={() => setOpen(true)}
                                        primary>
                                        Contact me
                                    </Button>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Responsive>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Segment>
                        <Form>
                            <Header as='h5'>Poster du contenu</Header>
                            <Form.TextArea
                                placeholder='poster un message'
                                name='info'
                                onChange={handleTextArea}
                                value={info}
                                error={errors.info ? errors.info : null}
                            />
                            <Form.Field>
                                <div className='right'>
                                    <Button
                                        onClick={handleSubmit}
                                        circular
                                        color='google plus'
                                        icon='paper plane'
                                    />
                                    <Button
                                        onClick={() => setOpen2(true)}
                                        circular
                                        icon='video'
                                    />
                                </div>
                            </Form.Field>
                        </Form>
                    </Segment>
                    <Header as='h5'>Parlez nous de vous:</Header>
                    {/* verif que _id du membre corresponde avec router.query ------------------- pour afficher le formulaire  */}
                    <Container>{renderPosts()}</Container>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Responsive as={Segment} basic>
                        <Header as='h5'>Spécialités du coach</Header>
                        <Competence options={options} />
                    </Responsive>
                </Grid.Column>
            </Grid>
        </div>
    )
}

Profile.getInitialProps = async () => {
    console.log('for my Leny, My Paloma, My Lou, My Lya')
    return {}
}

export default Profile
