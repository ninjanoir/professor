import Slider from './../components/Slider'
import {
    Card,
    Grid,
    Dimmer,
    Image,
    Button,
    Header,
    Icon,
} from 'semantic-ui-react'
import Video from '../components/Embed'
import Comments from '../components/Feed'
import Paginate from '../components/Paginate'
import StayTuned from './../components/StayTuned'
import coachForYou from '../utils/coachForYou'
import Router from 'next/router'


class Index extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totalPages: 0,
            posts: this.props.data,
            currentPage: 1,
            postsPerPage: 3,
            currentPosts: [],
        }

        this.cardRef = React.createRef()
    }

    componentDidMount() {
        let totalPages = Math.ceil(
            this.props.data.length / this.state.postsPerPage
        )
        this.setState({ totalPages: totalPages })
        this.getCurrentPage(this.state.currentPage)


    }

    handleShow = e => {
        this.cardRef.current = e.currentTarget.firstChild
        this.cardRef.current.className = 'ui dimmer active'
    }

    handleHide = () => {
        if (this.cardRef.current !== null) {
            this.cardRef.current.className = 'ui dimmer'
        } else {
            return
        }
    }

    renderContent = coach => {
        const content = (
            <Button
                animated='fade'
                inverted
                onClick={() => Router.push(`/profile/${coach.coach._id}`)}>
                <Button.Content visible>Visitez ce coach</Button.Content>
                <Button.Content hidden>Disponible</Button.Content>
            </Button>
        )

        return { content: content }
    }

    //current post
    getCurrentPage = numberPage => {
        const lastIndexOfPostpage = numberPage * this.state.postsPerPage

        const firstIndexOfPostPage =
            lastIndexOfPostpage - this.state.postsPerPage

        const currentPostPage = this.state.posts.slice(
            firstIndexOfPostPage,
            lastIndexOfPostpage
        )

        return this.setState({ currentPosts: currentPostPage })
    }

    handleChange = (e, data) => {
        this.setState({ currentPage: data.activePage })
        this.getCurrentPage(data.activePage)
    }

    render() {
        const { currentPosts } = this.state



        if (!currentPosts) {
            return <div>Chargement...</div>
        }

        return (
            <>
                <Slider />
                <Header
                    as='h2'
                    className='centered'
                    style={{ fontSize: '2vh', padding: '5rem' }}>
                    Réussir Avec Nos Coachs
                </Header>

                <Grid container stackable>
                    <Grid.Row columns={4} className='centered'>
                        {currentPosts.map((coach, index) => (
                            <Grid.Column width={5} key={index}>
                                <Card centered>
                                    <Dimmer.Dimmable
                                        as={Image}
                                        dimmer={this.renderContent(coach)}
                                        onMouseEnter={this.handleShow}
                                        onMouseLeave={this.handleHide}
                                        src={coach.avatar.avatar.slice(6)}
                                        size='medium'
                                    />
                                    <Card.Content className='leftAlign'>
                                        <Card.Header>{`${coach.coach.membre.prenom} ${coach.coach.membre.nom}`}</Card.Header>
                                        <Card.Meta>
                                            {coach.coach.meta}
                                        </Card.Meta>
                                        <Card.Description>
                                            {coach.coach.bio}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra className='leftAlign'>
                                        <Icon name='like' />
                                        {coach.coach.like}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))}
                        <div className='spacer centered'>
                            <Paginate
                                totalPages={this.state.totalPages}
                                onChange={this.handleChange}
                            />
                        </div>
                    </Grid.Row>
                </Grid>

                <Header
                    as='h2'
                    className='centered'
                    style={{ padding: '5rem' }}>
                    Ils parlent de nous..
                </Header>

                <Grid stackable className='centered'>
                    <Grid.Row columns={12}>
                        <Grid.Column width={6}>
                            <Comments
                                src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'
                                user='Paul Firstman'
                                comment="super mon coach carrément révolutionnaire, il fallait ça pour mieux vivre sa vie...1heure par jour et c'est des années de gagné"
                            />

                            <Comments
                                src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
                                user='Jenny love'
                                comment="Voilà c'est décidé c'est fini d'acheter du poisson au supermarché, mais à quand un bon frigo solaire ?"
                            />
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <Video />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Header
                    as='h2'
                    className='centered'
                    style={{ padding: '5rem' }}>
                    Soyez aux nouvelles !...
                </Header>

                <StayTuned />
            </>
        )
    }
}

Index.getInitialProps = async () => {
    const res = await coachForYou
        .get('/coach')
        .catch(e => console.error('fetch coach index failed', e))
    const data = res.data.response



    return { data }
}

export default Index
