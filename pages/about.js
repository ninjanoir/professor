import { Item, Container, Header, Card } from 'semantic-ui-react'

const About = () => (
    <div className='page_wrapper'>
        <Item.Group className='container'>
            <Item>
                <Item.Image src='/arobinson.png' size='tiny' circular />
                <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'> Alain Robinson</Item.Header>
                    <Item.Meta>Develeppeur web full stack</Item.Meta>
                    <Item.Description>
                        J'ai le plaisir de vous présenter le réseau coachForYou.
                        Si le partage est une valeur qui vous parle je vous
                        invite donc à vous inscrire de participer à
                        l'élaboration et à la réussite de projets multiples. Vos
                        expériences peuvent aider à changer le monde. Quelqu'un,
                        quelque part, pourra bénéficier de votre expérience dans
                        les domaines qui sont les vôtres
                    </Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>

        <Container textAlign='justified'>
            Les catégories évoluent et de nouvelles sont à l'étude. Cependant
            Celles déjà disponibles vous garantissent de nombreux projets en
            cours qui ont besoin de vous. Mon rêve est de pouvoir aider de
            nombreuses personnes dans le monde et valoriser l'entraide et le
            partage de connaissance. Le monde sera un lieu plus agréable à
            vivre, car la paix, la joie sera nôtre.
            <div className='spacer'>
                <Header as='h2' className='brand'>
                    Quel coach etes vous ?
                </Header>

                <Card.Group itemsPerRow={4} stackable>
                    <Card
                        meta='Emploi'
                        raised
                        image='https://images.unsplash.com/photo-1584048333538-9522c04a735f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'
                    />
                    <Card
                        meta='Cuisine'
                        raised
                        image='https://images.unsplash.com/photo-1573407947625-124549936954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'
                    />
                    <Card
                        meta='Sport'
                        raised
                        image='https://images.unsplash.com/photo-1579119986241-5e72d26cb690?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'
                    />
                    <Card
                        meta='informatique'
                        raised
                        image='https://images.unsplash.com/photo-1542494553-a6ce0f1f6ece?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
                    />

                    {/* ------------------------------------------------ */}
                    <Card
                        meta='Photographie'
                        raised
                        image='https://images.unsplash.com/photo-1586796676778-2c50b6bc3937?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'
                    />
                    <Card
                        meta='Bricolage'
                        raised
                        image='https://images.unsplash.com/photo-1553429938-0c318ee3de7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
                    />
                    <Card
                        meta='Musique'
                        raised
                        image='https://images.unsplash.com/flagged/photo-1574869189423-bc7316873c70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'
                    />
                    <Card
                        meta='Seduction'
                        raised
                        image='https://images.unsplash.com/photo-1583324217880-5f4d23550f94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=809&q=80'
                    />
                </Card.Group>
            </div>
        </Container>
    </div>
)

export default About
