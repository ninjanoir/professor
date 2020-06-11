import { Form, Header } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import coachForYou from '../utils/coachForYou'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


const User = () => {
    const router = useRouter()

    const initialState = {
        nom: '',
        prenom: '',
        compte: '',
        email: '',
        password: '',
        confpwd: '',
    }

    const [form, setForm] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleSubmit = e => {
        e.preventDefault()

        let errs = validate()
        let errPwd = checkpass()

        if (
            Object.values(errs).length === 0 &&
            Object.values(errPwd).length === 0
        ) {
            createUser(form)
        } else {
            if (Object.values(errPwd).length === 0) {
                setErrors(errs)
            } else {
                setErrors(Object.assign(errs, errPwd))
            }
        }
    }

    const handleChange = e => {
        setErrors({
            ...errors,
            [e.target.name]: '',
        })

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleRadio = (e, { value }) => {
        setForm({
            ...form,
            compte: value,
        })

        setErrors({
            ...errors,
            compte: '',
        })
    }

    const checkpass = () => {
        const { password, confpwd } = form
        let err = {}

        if (password !== confpwd) {
            err.confpwd = 'mot de passe non identique'
        }
        setErrors({ ...errors, err })
        return err
    }

    const validate = () => {
        const { nom, prenom, compte, email, password, confpwd } = form
        let err = {}

        if (!nom) {
            err.nom = 'champs nom requis'
        }
        if (!prenom) {
            err.prenom = 'champs prénom requis'
        }
        if (!compte) {
            err.compte = 'champs compte requis'
        }
        if (!email) {
            err.email = 'champs email requis'
        }
        if (!password) {
            err.pwd = 'champs mot de passe requis'
        }
        if (!confpwd) {
            err.confpwd = 'champs confirmation mot de passe requis'
        }

        return err
    }

    const createUser = form => {
        const { nom, prenom, compte, email, password } = form

        try {
            coachForYou
                .post('/register', { nom, prenom, compte, email, password })
                .then(response => {

                    if (response.data.success) {                  
                        router.push('/login')
                    }
                })
                .catch(e => console.log(e))
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        if(Cookies.get('x-auth-token')) { return router.replace('/member')}
        return () => {
            
        }
    }, [router.route])

    return (
        <Form onSubmit={handleSubmit} className='page_wrapper form_style'>
            <Header className='spacer brand'>Devenir membre</Header>
            <Form.Group>
                <Form.Checkbox
                    error={errors.compte ? errors.compte : false}
                    label='Free'
                    radio
                    name='compte'
                    value='free'
                    checked={form.compte === 'free'}
                    onChange={handleRadio}
                />
                <Form.Checkbox
                    error={errors.compte ? errors.compte : false}
                    label='Prénium'
                    radio
                    name='compte'
                    value='prenium'
                    checked={form.compte === 'prenium'}
                    onChange={handleRadio}
                />
                <Form.Checkbox
                    error={errors.compte ? errors.compte : false}
                    label='Gold'
                    radio
                    name='compte'
                    value='gold'
                    checked={form.compte === 'gold'}
                    onChange={handleRadio}
                />
            </Form.Group>

            <Form.Field>
                <Form.Input
                    label='Nom'
                    value={form.nom}
                    name='nom'
                    onChange={handleChange}
                    error={errors.nom ? errors.nom : false}
                />
            </Form.Field>

            <Form.Field>
                <Form.Input
                    label='Prénom'
                    value={form.prenom}
                    name='prenom'
                    onChange={handleChange}
                    error={errors.prenom ? errors.prenom : false}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label='Adresse email'
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email ? errors.email : false}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label='Mot de passe'
                    type='password'
                    name='password'
                    autoComplete='off'
                    value={form.pwd}
                    onChange={handleChange}
                    error={errors.pwd ? errors.pwd : false}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label='confirmez votre mot de passe'
                    type='password'
                    name='confpwd'
                    autoComplete='off'
                    value={form.confpwd}
                    onChange={handleChange}
                    error={errors.confpwd ? errors.confpwd : false}
                />
            </Form.Field>

            <Form.Field>
                <Form.Button type='submit'>Valider</Form.Button>
            </Form.Field>
        </Form>
    )
}

export default User
