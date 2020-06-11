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

import Paginate from '../../components/Paginate'

import { useState, useEffect, useRef } from 'react'
import Searchbar from '../../components/Searchbar'
import coachForYou from '../../utils/coachForYou'
import { useRouter } from 'next/router'
import SideMeal from './../../components/Sidebar'

const Search = ({ coachs }) => {
    const router = useRouter()

    const initialState = {
        visible: false,
        totalPages: Math.ceil(coachs.length / 3),
        currentCoachs: [],
        coachsPerPage: 3,
        currentPage: 1,
    }

    const [search, setSearch] = useState('')

    const [message, setMessage] = useState('')

    const [state, setState] = useState(initialState)

    //------resultat serch bar-----------------------
    const [options, setOptions] = useState([])

    const cardRef = useRef()

    //-----------------------------handle Search----------------

    const searchSelect = e => {
        if (search.length > 0 && e.target.className === 'title') {
            let resquest = e.target.textContent

            coachForYou
                .get(`/coach/${resquest}`)
                .then(res => {
                    if (res.data.success) {
                        router.push(`/search/${resquest}`)
                    } else {
                        setMessage('désolé aucun coach ne correspond')
                        return
                    }
                })
                .catch(e => console.error(e))
        }
    }

    const renderMessage = () => {
        setTimeout(() => {
            setMessage(null)
        }, 3000)

        return <Message info>{message}</Message>
    }

    const handleSearch = search => {
        coachForYou
            .get(`/categorie/${search}`)
            .then(res => {
                let transOps = res.data.map(cat => {
                    return { title: cat.nom }
                })

                setOptions(transOps)
            })
            .catch(e => console.error(e))
    }

    //-------------pagination-------------------------------
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

    const renderContent = coach => {
        const content = (
            <Button
                animated='fade'
                inverted
                onClick={() => router.push(`/profile/${coach.coach._id}`)}>
                <Button.Content visible>Visitez ce coach</Button.Content>
                <Button.Content hidden>Disponible</Button.Content>
            </Button>
        )

        return { content }
    }

    //-----------------------------------Menu sidebar--------------------------
    const handleItemClick = e => {
        setState({
            ...state,
            visible: true,
        })
    }

    const handleSelect = e => {
        e.persist()
        coachForYou
            .get(`/coach/${e.target.textContent.toLowerCase()}`)
            .then(res => {
                if (res.data.success) {
                    router.push(`/search/${e.target.textContent.toLowerCase()}`)
                } else {
                    setMessage(
                        'désolé aucun coach dans cette catégorie, pourquoi pas vous !'
                    )
                }
            })
            .catch(e => console.error('handle selection failed---',e))
    }

    useEffect(() => {
        getCurrentPage(state.currentPage)

        if (search.length > 0) {
            handleSearch(search)
        }

    }, [state.currentPage, search])

    return (
        <>
            <SideMeal
                onSelect={handleSelect}
                visible={state.visible}
                onHide={() => setState({ ...state, visible: false })}
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
                            style={{ padding: '5rem' }}>
                            Vous avez dit coach ?!
                        </Header>

                        <Searchbar
                            onChange={e => setSearch(e.target.value)}
                            onSelect={searchSelect}
                            results={options}
                            value={search}
                        />

                        {!message ? null : renderMessage()}

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
                                                    coach.avatar.avatar
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

export async function getServerSideProps() {
    const res = await coachForYou.get('/coach')
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

export default Search
