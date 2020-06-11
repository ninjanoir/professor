import { Header, Grid, Card, Icon, Button } from "semantic-ui-react";
import ListOffers from "./../components/ListOffers";
import { useRouter } from 'next/router';

const Offers = ({ free, prenium, gold }) => {
    const router = useRouter()


    return (
        <div className="page_wrapper">
        <Header as="h1" className="centered brand">
            Be Free !
        </Header>

        <Grid centered stackable>
            <Grid.Column width={5}>
            <Card
                centered
                header="Free"
                meta="Compte gratuit"
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
                meta="5 contacts max"
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
                meta="Contacts illimités"
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
            title: "Découverte",
            
        },
        {
            title: "Créer votre profil",
        
        },
        {
            title: "Etre visible",
            
        },
        ],

        prenium: [
        {
            title: "Coacher 5 membres",
            
        },
        {
            title: "Partager votre profil",
            
        },
        {
            title: "5 contacts Max",
            
        },
        ],
        gold: [
        {
            title: "Coacher illimité",
            
        },
        {
            title: "Partager votre profil",
            
        },
        {
            title: "Contacts illimités",
            
        },
        ],
    };
};

export default Offers;
