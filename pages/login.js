import { Form, Grid, Segment, Button, Divider, Icon } from 'semantic-ui-react'
import {useRouter} from 'next/router'
import { useState, useEffect } from 'react'
import coachForYou from '../utils/coachForYou'
import Cookies from 'js-cookie'

const Login = () => {

    const router = useRouter()

    const initialState = {
        email: '',
        password: '',
        remember: true,
        errors: {},
        width: null,
    }

    const [state, setState] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [save, setSave] = useState({ checked: true })

    useEffect(() => {
        window.addEventListener('resize', updateDimensions)
        updateDimensions()

        router.prefetch('/member')

        return () => {
            window.removeEventListener('resize', updateDimensions)
        }
    }, [])

    const updateDimensions = () => {
        setState({
            ...state,
            width: window.innerWidth,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()



        let errs = validate()

        if (Object.values(errs).length === 0) {

            const { email, password } = state

            coachForYou
                .post('/api/auth', { email, password })
                .then(res => {
                    if (res.data.success) {
                        Cookies.set(
                            'x-auth-token',
                            res.headers['x-auth-token'],
                            {
                                expires: 1 / 48,
                                SameSite: 'strict',
                            }
                        )
                        router.replace('/member')
                    } else {
                        return
                    }
                })
                .catch(e => console.error('login failed------',e))
        } else {
            setErrors(errs)
        }
    }

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })

        setErrors({
            ...errors,
            [e.target.name]: '',
        })
    }

    const validate = () => {
        let errs = {}

        const { email, password } = state

        if (!email) {
            errs.email = 'champs email requis'
        }
        if (!password) {
            errs.password = 'champs password requis'
        }

        return errs
    }

    const handleSave = () => {
        if (save.checked) {
            setSave({ checked: false })
        } else {
            setSave({ checked: true })
        }
    }

    return (
        <div className='page_wrapper'>
            <Segment basic stackable={true.toString()}>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column width={8} className='centered'>
                        <Form onSubmit={handleSubmit} className='lefter'>
                            <h2 className='header'>Bienvenue !</h2>
                            <Form.Field>
                                <Form.Input
                                    onChange={handleChange}
                                    label='Adresse email'
                                    type='email'
                                    placeholder='exemple@mail.com'
                                    name='email'
                                    value={state.email}
                                    autoComplete='off'
                                    error={errors.email ? errors.email : false}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label='Mot de passe'
                                    type='password'
                                    name='password'
                                    placeholder='...'
                                    value={state.password}
                                    onChange={handleChange}
                                    autoComplete='off'
                                    error={
                                        errors.password
                                            ? errors.password
                                            : false
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <div className='ui checkbox'>
                                    <Form.Checkbox
                                        name='remember'
                                        className='hidden'
                                        value={save.checked ? 'oui' : 'non'}
                                        checked={save.checked}
                                        onChange={handleSave}
                                        label='se souvenir de moi'
                                    />
                                </div>
                            </Form.Field>
                            <Button content='Valider' type='submit' />
                        </Form>
                    </Grid.Column>

                    {state.width <= 959 ? (
                        <Divider
                            horizontal
                            style={{ width: '80%', margin: 'auto' }}>
                            ou
                        </Divider>
                    ) : null}

                    <Grid.Column
                        textAlign='center'
                        verticalAlign='middle'
                        className='centered'>
                        <Button
                            onClick={() => router.replace('/register')}
                            icon
                            labelPosition='left'>
                            <Icon name='signup' />
                            Devenez Coach
                        </Button>
                    </Grid.Column>
                </Grid>

                {state.width >= 960 ? <Divider vertical>ou</Divider> : null}
            </Segment>
        </div>
    )
}

export default Login
