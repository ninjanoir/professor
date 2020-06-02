import {
    Sidebar,
    Segment,
    Menu,
    Label,
    Input,
    Header,
    Button,
    Icon,
    Grid,
    Image,
    Card,
    Dimmer,
} from 'semantic-ui-react'

import Paginate from '../components/Paginate'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

const Search = ({ coachs }) => {
    const initialState = {
        visible: false,
        totalPages: Math.ceil(coachs.length / 3),
        coachs: coachs,
        currentCoachs: [],
        activeItem: 'all',
        coachsPerPage: 3,
        currentPage: 1,
    }

    const [state, setState] = useState(initialState)

    const cardRef = useRef()

    const getCurrentPage = numberPage => {
        const lastIndexOfPostpage = numberPage * state.coachsPerPage
        const firstIndexOfPostPage = lastIndexOfPostpage - state.coachsPerPage
        const currentCoachs = state.coachs.slice(
            firstIndexOfPostPage,
            lastIndexOfPostpage
        )

        return setState({ ...state, currentCoachs: currentCoachs })
    }

    const handleChange = (e, data) => {
        setState({ ...state, currentPage: data.activePage })

        getCurrentPage(data.activePage)
    }

    const handleShow = e => {
        cardRef.current = e.currentTarget.firstChild
        cardRef.current.className = 'ui dimmer active'
    }

    const handleHide = e => {
        if (cardRef.current !== null) {
            cardRef.current.className = 'ui dimmer'
        } else {
            return
        }
    }

    const renderContent = () => {
        const content = (
            <Button animated='fade' inverted>
                <Button.Content visible>Réserver ce coach</Button.Content>
                <Button.Content hidden>€12.99 par mois</Button.Content>
            </Button>
        )

        return { content }
    }

    const handleItemClick = (e, { name }) => {
        setState({
            ...state,
            visible: true,
            activeItem: name,
        })
    }

    useEffect(() => {
        getCurrentPage(state.currentPage)

        return () => {
            console.log('clean up')
        }
    }, [state.currentPage])

    return (
        <Sidebar.Pushable as={Segment} basic>

            <Sidebar
                as={Menu}
                animation='overlay'
                inverted
                icon='labeled'
                onHide={() => setState({visible: false })}
                vertical
                visible={state.visible}
                width='wide'
                className='sideMenu'>
                <Menu.Item as='div'>
                    <Input
                        style={{ height: '3em', fontSize: '0.8em' }}
                        size='small'
                        icon='search'
                        placeholder='Recherche...'
                    />
                </Menu.Item>
                <Menu.Item
                    as='a'
                    name='all'
                    active={state.activeItem === 'all'}
                    onClick={handleItemClick}>
                    <Label color='teal'>1</Label>
                    Tous les coachs
                </Menu.Item>

                <Menu.Item
                    name='emploi'
                    active={state.activeItem === 'emploi'}
                    onClick={handleItemClick}>
                    <Label>51</Label>
                    Emploi
                </Menu.Item>

                <Menu.Item
                    name='gastronomie'
                    active={state.activeItem === 'gastronomie'}
                    onClick={handleItemClick}>
                    <Label>1</Label>
                    Gastronomie
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher className='page_wrapper'>
                <Segment basic>
                    <Header as='h3' className='centered'>
                        Trouvez le coach idéal pour tout
                    </Header>

                    <div className='ham'>
                        <Button color='teal' icon onClick={handleItemClick}>
                            <Icon name='align left' />
                        </Button>
                    </div>

                    <Grid container stackable>
                        <Grid.Row columns={4} className='centered'>
                            {state.currentCoachs.map((coach, index) => (
                                <Grid.Column width={5} key={index}>
                                    <Card centered>
                                        <Dimmer.Dimmable
                                            as={Image}
                                            dimmer={renderContent()}
                                            onMouseEnter={handleShow}
                                            onMouseLeave={handleHide}
                                            src={coach.avatar}
                                            size='medium'
                                        />
                                        <Card.Content className='leftAlign'>
                                            <Card.Header>
                                                {coach.name}
                                            </Card.Header>
                                            <Card.Meta>
                                                Champion de quoi
                                            </Card.Meta>
                                            <Card.Description>
                                                {coach.resume}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content
                                            extra
                                            className='leftAlign'>
                                            <Icon name='like' />
                                            22
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    </Grid>

                    <div className='spacer centered'>
                        <Paginate
                            totalPages={state.totalPages}
                            onChange={handleChange}
                        />
                    </div>
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:5000/api/coach')

    return {
        props: { coachs: res.data },
    }
}

export default Search
