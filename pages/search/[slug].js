import {
    Sidebar,
    Segment,
    Header,
    Button,
    Icon,
    Grid,
    Image,
    Card,
    Dimmer,
    Message,
} from 'semantic-ui-react'

import Paginate from './../../components/Paginate'

import Searchbar from './../../components/Searchbar'

import coachForYou from '../../utils/coachForYou'

import { useRouter } from 'next/router'

import { useState, useEffect, useRef } from 'react'
import SideMeal from '../../components/Sidebar'

const Categorie = ({ coachs, avatar }) => {
    const router = useRouter()
    const [options, setOptions] = useState([])

    console.log(coachs)

    const cardRef = useRef()

    const initialState = {
        visible: false,
        totalPages: Math.ceil(coachs.length / 3),
        currentCoachs: [],
        coachsPerPage: 3,
        currentPage: 1,
    }

    const [state, setState] = useState(initialState)

    const [fetchInfo, setFetchInfo] = useState('')
    const [search, setSearch] = useState('')

    //--------gestion autocomplete search bar------------
    const searchSelect = e => {
        if (search.length > 0 && e.target.className === 'title') {
            let resquest = e.target.textContent

            coachForYou
                .get(`/api/coach/${resquest}`)
                .then(res => {
                    if (res.data.success) {
                        router.push(`/search/${resquest}`)
                    } else {
                        setFetchInfo('désolé aucun coach ne correspond')
                    }
                })
                .catch(e => console.error(e))
        }
    }

    const handleSearch = search => {
        coachForYou
            .get(`/api/categorie/${search}`)
            .then(res => {
                let transOps = res.data.map(cat => {
                    return { title: cat.nom }
                })

                setOptions(transOps)
            })
            .catch(e => console.error(e))
    }

    const renderMessage = () => {
        if (coachs.length > 0) {
            setTimeout(() => {
                setFetchInfo(null)
            }, 3000)

            return <Message info>{fetchInfo}</Message>
        } else {
            return <Message info>{fetchInfo}</Message>
        }
    }

    //------------------------paginate---------------------------------------

    const handleChange = (e, data) => {
        setState({ currentPage: data.activePage })
        getCurrentPage(data.activePage)
    }

    const getCurrentPage = numberPage => {
        const lastIndexOfPostpage = numberPage * state.coachsPerPage
        const firstIndexOfPostPage = lastIndexOfPostpage - state.coachsPerPage

        const currentCoachs = coachs.slice(
            firstIndexOfPostPage,
            lastIndexOfPostpage
        )

        return setState({ ...state, currentCoachs })
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

    //implementer le render content avec les id du coach...
    const renderContent = coach => {
        const content = (
            <Button
                animated='fade'
                inverted
                onClick={() => router.push(`/profile/${coach.coach._id}`)}>
                <Button.Content visible>Visitez ce coach</Button.Content>
                <Button.Content hidden>Disponible!</Button.Content>
            </Button>
        )

        return { content }
    }

    const handleSelect = e => {
        e.persist()

        coachForYou
            .get(`/api/coach/${e.target.textContent.toLowerCase()}`)
            .then(res => {
                if (res.data.success) {
                    router.push(`/search/${e.target.textContent.toLowerCase()}`)
                } else {
                    setFetchInfo(
                        'désolé aucun coach dans cette catégorie, pourquoi pas vous !'
                    )
                }
            })
            .catch(e => console.error(e))
    }

    //-----------------------------------Menu sidebar--------------------------
    const handleItemClick = e => {
        setState({
            ...state,
            visible: true,
        })
    }

    useEffect(() => {
        if (coachs.length > 0) {
            getCurrentPage(state.currentPage)
        }

        if (search.length > 0) {
            handleSearch(search)
        }
        return () => {
            console.log('clean up')
        }
    }, [search])

    return (
        <>
            <SideMeal
                onSelect={handleSelect}
                onHide={() => setState({ ...state, visible: false })}
                visible={state.visible}
            />
            <Sidebar.Pushable as={Segment} basic>
                <Sidebar.Pusher className='page_wrapper'>
                    <Segment basic>
                        <div className='ham'>
                            <Button
                                size='big'
                                color='red'
                                icon
                                onClick={handleItemClick}>
                                <Icon name='align left' />
                            </Button>
                        </div>

                        <Header
                            as='h3'
                            className='centered brand'
                            >
                            Vous avez dit coach ?!
                        </Header>

                        <Searchbar
                            onChange={e => setSearch(e.target.value)}
                            onSelect={searchSelect}
                            results={options}
                            value={search}
                        />

                        {!fetchInfo ? null : renderMessage()}

                        <Grid container stackable>
                            <Grid.Row columns={4} className='centered'>
                                {state.currentCoachs.map((coach, index) => (
                                    <Grid.Column width={5} key={index}>
                                        <Card centered>
                                            <Dimmer.Dimmable
                                                as={Image}
                                                dimmer={renderContent(coach)}
                                                onMouseEnter={handleShow}
                                                onMouseLeave={handleHide}
                                                src={
                                                    coach.avatar
                                                        ? coach.avatar.avatar.slice(6)
                                                        : 'https://cdn.pixabay.com/photo/2020/05/24/22/03/vendetta-5216423_960_720.jpg'
                                                }
                                                size='medium'
                                            />
                                            <Card.Content className='leftAlign'>
                                                <Card.Header>
                                                    {`${coach.coach.membre.nom} ${coach.coach.membre.prenom} `}
                                                </Card.Header>
                                                <Card.Meta>
                                                    {coach.coach.meta}
                                                </Card.Meta>
                                                <Card.Description>
                                                    {coach.coach.bio}
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content
                                                extra
                                                className='leftAlign'>
                                                <Icon name='like' />
                                                {coach.like}
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
        </>
    )
}

export async function getServerSideProps({ query }) {
    const res = await coachForYou.get(`/api/coach/${query.slug}`)
    let data = res.data

    if (data.success) {
        data = data.response
    } else {
        data = []
    }

    return {
        props: { coachs: data },
    }
}

export default Categorie
