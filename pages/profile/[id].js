import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

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
    Message,
} from 'semantic-ui-react'

import coachForYou from '../../utils/coachForYou'

import Competence from './../../components/Competence'

import Cookies from 'js-cookie'

import jwt from 'jsonwebtoken'



//--------------------------------------------------------------------------------------Debut du component--------->
const Profile = ({ data: { profil, coachPost, imageProfil } }) => {

    // -------router --------
    const router = useRouter()

    //------------IsAdmin-------
    const [isAdmin, setIsAdmin] = useState('')

    const verifToken = token => {
        let payload = jwt.decode(token)

        return payload
    }

    //------------autoComplete searchbar--------------
    const [options, setOptions] = useState(profil.competence)

    //--------------POST--------------------------
    const [posts, setPosts] = useState(coachPost)

    //-------------POST Textearea-----------------
    const [info, setInfo] = useState('')

    //--------------form VIDEO---------------
    const [form2, setForm2] = useState({})

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

        if (Object.values(err).length === 0) {
            coachForYou
                .post('/posts', {
                    coachId: profil._id,
                    info,
                })
                .then(res => {
                    if (res.data.success) {

                        setPosts([...posts, res.data.result])
                    } else {
                        console.log('post echoué...')
                    }
                })
                .catch(e => {
                    console.log('post failed--',e)
                })

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

    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({})

    const [response, setResponse] = useState('')

    //-----------------Modals-----------------------
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    const close = () => {
        setOpen(false)
    }

    const close2 = () => {
        setOpen2(false)
    }

    //---------------handleForm Contact-------------

    const validateFormContact = () => {
        let err = {}

        const { nom, email, message } = form

        if (!nom) {
            err.nom = 'nom et prenom requis'
        }
        if (!email) {
            err.email = 'votre email est requis'
        }
        if (!message) {
            err.message = 'aucun message saisi'
        }

        return err
    }

    const submitMessage = () => {
        let error = validateFormContact()

        if (Object.values(error).length === 0) {
            const { nom, email, message } = form

            coachForYou
                .post('/mailer', { nom, email, message })
                .then(res => {
                    if (res.data.success) {
                        setResponse('message envoyé avec succes')
                        setForm({})
                    }
                })
                .catch(e => console.error('failed sent message to coach', e))
        } else {
            setErrors(error)
        }
    }

    const successResponse = () => {
        setTimeout(() => {
            setResponse(null)
            close()
        }, 3000)

        return <Message info>{response}</Message>
    }

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
                            {response ? successResponse() : null}

                            <Form.Field>
                                <Form.Input
                                    name='nom'
                                    label='prenom et nom'
                                    placeholder='John Doe'
                                    onChange={handleForm}
                                    error={
                                        errors.nom
                                            ? errors.nom
                                            : null
                                    }
                                    value={form.nom}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Form.Input
                                    name='email'
                                    label='Votre email'
                                    type='email'
                                    placeholder='John Doe'
                                    onChange={handleForm}
                                    error={errors.email ? errors.email : null}
                                    value={form.email}
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

    //--------------------Modal Post Video-------------------------------------
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

        if (Object.values(err).length === 0) {
            setPosts([...posts, form2])

            coachForYou.post('/posts', {
                coachId: profil._id,
                ...form2,
            }).then(res => {
                if(res.data.success){console.log('video postée avec succes')}
            }).catch(e => console.error('failed post video', e))

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
            setForm2({ videoId: '' })
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
                            disabled={
                                isAdmin === profil.membre._id ? false : true
                            }
                        />
                    </Modal.Actions>
                </Form>
            </Modal>
        )
    }

    //delete Post
    const deletePost = post => {
        coachForYou
            .delete(`/posts/${post._id}`)
            .then(res => {
                if (res.data.success) {
                    let newStatePosts = posts.filter(el => {
                        return el._id !== res.data.post._id
                    })

                    setPosts(newStatePosts)
                }
            })
            .catch(e => console.error('delete post failed-----',e))
    }

    //--------------------------presentation de contenu------------------------------
    const renderPosts = () => {

        if (coachPost.length > 0) {
            return posts.map((post, index) => {
                return (
                    <Card key={index} fluid>
                        {post.videoId !== undefined ? (
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

                            {isAdmin === profil.membre._id ? (
                                <Icon
                                    name='trash alternate outline'
                                    onClick={() => deletePost(post)}
                                    style={{
                                        float: 'right',
                                        cursor: 'pointer',
                                    }}
                                />
                            ) : null}
                        </Card.Content>
                    </Card>
                )
            })
        } else {
            return
        }
    }

    useEffect(() => {
        if (Cookies.get('x-auth-token')) {
            console.log('render useEffect-----------------')
            let token = Cookies.get('x-auth-token')

            let verif = verifToken(token)

            setIsAdmin(verif._id)
        } else {
            console.log('visiteur non authnetifié')
            setIsAdmin('')
        }

        return () => {
            console.log('cleanUp useEffect')
        }
    }, [isAdmin])

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
                                src={
                                    imageProfil.avatar
                                        ? `${imageProfil.avatar.slice(6)}`
                                        : 'https://react.semantic-ui.com/images/avatar/large/stevie.jpg'
                                }
                                circular
                            />

                            <Item.Content>
                                <Item.Header as='a'>
                                    {`${profil.membre.nom} ${profil.membre.prenom}`}
                                </Item.Header>
                                <Item.Description>
                                    {profil.meta}
                                </Item.Description>

                                <Item.Extra style={{ padding: '0.5rem' }}>
                                    <Button
                                        onClick={() => setOpen(true)}
                                        primary>
                                        Contactez moi
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
                                        disabled={isAdmin === profil.membre._id ? false : true}
                                        
                                    />
                                    <Button
                                        onClick={() => setOpen2(true)}
                                        circular
                                        icon='video'
                                        disabled={isAdmin === profil.membre._id ? false : true}
                                    />
                                </div>
                            </Form.Field>
                        </Form>
                    </Segment>

                    <Header as='h5'>Parlez nous de vous:</Header>
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

export async function getServerSideProps({ query }) {
    const res = await coachForYou.get(`/posts/${query.id}`)
    const data = await res.data


    return { props: { data } }
}

export default Profile
