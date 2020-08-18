import {Segment, Grid, Header, Button} from 'semantic-ui-react'
import {useRouter} from 'next/router' 

const Footer = () => {

const router = useRouter()

    return (

        <Segment placeholder className="footer">
            <Grid.Row>
                <Header as="h5" className="centered brand_small">#coach / #success / #free</Header>
                <Header as="h1" className="centered brand">COACHS FOR YOU</Header>
                <p className="centered slogan">Coach for you est le réseau de coachs actifs et expérimentés qui vous donne les bons conseils et vous aide à réussir haut la main tous vos projets. nous vous convions à notre grande fête</p>

                <div className="centered">
                    <Button className='btn_primary' onClick={()=>{router.push('/contact')}} color='teal' content='Contact' icon='right arrow' labelPosition='right' />
                </div>

                <div className="copyr">© copyrigth 2020, Coachs for you</div>

            </Grid.Row>

        </Segment>
    )
}

export default Footer
