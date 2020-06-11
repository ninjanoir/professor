import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { Header } from 'semantic-ui-react'

const SideMeal = props => {
    const router = useRouter()

    return (
        <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            icon='labeled'
            onHide={props.onHide}
            visible={props.visible}
            width='wide'
            vertical
            className='sideMenu'>
            <>
                <Header
                    as='h2'
                    className='brand'
                    style={{ color: 'white', padding: '2rem' }}>
                    CoachForYou
                </Header>
                <Menu.Item as='a' onClick={() => router.push('/search')}>
                    <Icon name='home' />
                </Menu.Item>

                <Menu.Item className='title' onClick={props.onSelect}>
                    Emploi
                </Menu.Item>
                <Menu.Item className='title' onClick={props.onSelect}>
                    Marketing
                </Menu.Item>

                <Menu.Item className='title' onClick={props.onSelect}>
                    Sport
                </Menu.Item>

                <Menu.Item className='title' onClick={props.onSelect}>
                    Communication
                </Menu.Item>
                <Menu.Item className='title' onClick={props.onSelect}>
                    Informatique
                </Menu.Item>
                <Menu.Item className='title' onClick={props.onSelect}>
                    Seduction
                </Menu.Item>

                <Menu.Item className='title' onClick={props.onSelect}>
                    Photographie
                </Menu.Item>

                <Menu.Item className='title' onClick={props.onSelect}>
                    cuisine
                </Menu.Item>

                <Menu.Item className='title' onClick={props.onSelect}>
                    Bricolage
                </Menu.Item>
                <Menu.Item className='title' onClick={props.onSelect}>
                    Musique
                </Menu.Item>
                <Menu.Item className='title' onClick={props.onSelect}>
                    soutien scolaire
                </Menu.Item>
                <Menu.Item className='title' onClick={props.onSelect}>
                    Commercial
                </Menu.Item>
            </>
        </Sidebar>
    )
}

export default SideMeal
