import { useState, useEffect } from 'react'
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter()
    const [isloggIn, setIsloggIn] = useState(false)
    const [widthOfWindow, setWidthOfWindow] = useState(null)

    const getInOrOut = () => {
        const token = Cookies.get('x-auth-token')
        if (!token) {
            router.replace('/login')
        } else {
            setIsloggIn(false)
            Cookies.remove('x-auth-token')
            router.replace('/login')
        }
    }

    const updateDimension = () => {
        setWidthOfWindow(window.innerWidth)
    }

    const renderMobileMenu = () => {
        return (
            <Dropdown
                className='right'
                item
                style={{ fontSize: '1.1rem' }}
                icon={isloggIn ? 'user circle outline' : 'sidebar'}>
                <Dropdown.Menu>
                    {isloggIn ? (
                        <Menu.Item onClick={() => router.push('/member')}>
                            Espace membre
                        </Menu.Item>
                    ) : null}
                    <Dropdown.Item onClick={() => router.push('/about')}>
                        Qui-sommes-nous
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => router.push('/contact')}>
                        Contact
                    </Dropdown.Item>
                    <Dropdown.Item onClick={getInOrOut}>
                        <Button
                            icon
                            labelPosition='left'
                            color={isloggIn ? 'red' : 'teal'}>
                            <Icon name='users' />
                            {isloggIn ? 'Se déconnecter' : 'Se connecter'}
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    const renderStandartMenu = () => {
        return (
            <Menu.Item className='right'>
                <Menu.Item onClick={() => router.push('/offres')}>
                    tarif
                </Menu.Item>
                <Menu.Item onClick={() => router.push('/search')}>
                    coachs
                </Menu.Item>
                <Menu.Item onClick={() => router.push('/about')}>
                    a-propos
                </Menu.Item>

                <Menu.Item onClick={() => router.push('/contact')}>
                    contact
                </Menu.Item>

                {isloggIn ? (
                    <Menu.Item onClick={() => router.push('/member')}>
                        Espace membre
                    </Menu.Item>
                ) : null}

                <Menu.Item onClick={getInOrOut}>
                    <Button
                        icon
                        labelPosition='left'
                        className='btn_login'
                        color={isloggIn ? 'red' : '#F6A02E'}>
                        <Icon name='users' />
                        {isloggIn ? 'Se déconnecter' : 'Se connecter'}
                    </Button>
                </Menu.Item>
            </Menu.Item>
        )
    }

    useEffect(() => {
        window.addEventListener('resize', updateDimension)
        updateDimension()

        const token = Cookies.get('x-auth-token')

        if (!token && isloggIn) {
            setIsloggIn(false)

            if (router.route === '/member') {
                router.replace('/login')
            }
        }

        if (token && !isloggIn) {
            setIsloggIn(true)
            if (router.route === '/login' || router.route === '/register') {
                router.replace('/member')
            }
        }

        return () => {
            window.removeEventListener('resize', updateDimension)
        }
    }, [isloggIn, router.route])

    return (
        <Menu secondary className='fixed'>
            <Menu.Item
                className='ui header logo'
                onClick={() => router.push('/')}>
                COACHS FOR YOU
            </Menu.Item>

            {widthOfWindow <= 960 ? renderMobileMenu() : renderStandartMenu()}
        </Menu>
    )
}

export default Navbar
