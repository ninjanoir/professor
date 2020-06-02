import { Header, Grid, Card, Icon, Button } from "semantic-ui-react";
import ListOffers from "./../components/ListOffers";
import { useRouter } from 'next/router';

const Offers = ({ free, prenium, gold }) => {
    const router = useRouter()


    return (
        <div className="page_wrapper">
        <Header as="h1" className="centered">
            Try for free
        </Header>

        <Grid centered stackable>
            <Grid.Column width={5}>
            <Card
                centered
                header="Free"
                meta="testez coachs for you"
                description={<ListOffers items={free} />}
                extra={
                <Button onClick={()=> router.push(`/register`)} className="centered" icon labelPosition="left">
                    Be Free
                    <Icon name="paper plane" />
                </Button>
                }
            />
            </Grid.Column>

            <Grid.Column width={5}>
            <Card
                centered
                header="Prenium"
                meta="Coachez 5 membres Max"
                description={<ListOffers items={prenium} />}
                extra={
                    <Button onClick={()=> router.push(`/register`)} className="centered" icon labelPosition="left">
                        Be Prenium
                        <Icon name="paper plane" />
                    </Button>
                    }
            />
            </Grid.Column>

            <Grid.Column width={5}>
            <Card
                centered
                header="Gold"
                meta="Coachez en Illimité"
                description={<ListOffers items={gold} />}
                extra={
                    <Button onClick={()=> router.push(`/register`)} className="centered" icon labelPosition="left">
                        Be Gold
                        <Icon name="paper plane" />
                    </Button>
                    }
            />
            </Grid.Column>
        </Grid>
        </div>
    );
};

Offers.getInitialProps = () => {
    return {
        free: [
        {
            title: "Trouver un coach",
            
        },
        {
            title: "Créer son profil",
        
        },
        {
            title: "Etre visible",
            
        },
        ],

        prenium: [
        {
            title: "Devenir Coach",
            
        },
        {
            title: "Créer son profil",
            
        },
        {
            title: "5 membres Max",
            
        },
        ],
        gold: [
        {
            title: "Devenir coach",
            
        },
        {
            title: "Créer son profil",
            
        },
        {
            title: "Coachez en illimité",
            
        },
        ],
    };
};

export default Offers;
