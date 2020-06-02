
import { useState, useEffect } from 'react'
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
//TODO: make loggIn menu component

const Navbar = () => {
    const router = useRouter()
    const [isloggIn, setIsloggIn] = useState(false)
    const [widthOfWindow, setWidthOfWindow] = useState(null)

    const getInOrOut = () => {
        const token = Cookies.get('x-auth-token')
        if (!token) {
            router.push('/login')
        } else {
            setIsloggIn(false)
            Cookies.remove('x-auth-token')
            router.push('/login')
        }
    }

    const updateDimension = () => {
        setWidthOfWindow(window.innerWidth)
        console.log(window.innerWidth)
    }

    const renderMobileMenu = () => {
        return (
            <Dropdown className='right' item  icon={isloggIn? 'user circle outline' :'sidebar'}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => router.push('/about')}>
                        A propos
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
                <Menu.Item onClick={() => router.push('/about')}>
                    A propos
                </Menu.Item>

                <Menu.Item onClick={() => router.push('/contact')}>
                    Contact
                </Menu.Item>

                <Menu.Item onClick={getInOrOut}>
                    <Button
                        icon
                        labelPosition='left'
                        color={isloggIn ? 'red' : 'teal'}>
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
                router.push('/login')
            }
        }

        if (token && !isloggIn) {
            setIsloggIn(true)
            if (router.route === '/login' || router.route === '/register') {
                router.push('/member')
            }
        }

        return () => {
            window.removeEventListener('resize', updateDimension)
        }
    }, [isloggIn, router.route])

    return (
        <Menu secondary className='yellow inverted fixed'>
            <Menu.Item className='ui header logo' onClick={()=> router.push('/')}>

                    COACHS FOR YOU

            </Menu.Item>
            <Dropdown text='Nos coachs' className='link pointing item icon'>
                <Dropdown.Menu>
                    <Menu.Item onClick={()=> router.push('/offres')}>
                        
                            Try for free
                        
                    </Menu.Item>
                    <Menu.Item onClick={()=> router.push('/search')}>
                        
                            Recherche coach
                        
                    </Menu.Item>
                </Dropdown.Menu>
            </Dropdown>

            {widthOfWindow <= 960 ? renderMobileMenu() : renderStandartMenu()}
        </Menu>
    )
}

export default Navbar
