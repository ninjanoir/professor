import { Card, Rating, Button, Icon, Header } from 'semantic-ui-react'
import { useRouter } from 'next/router';

const Slider = () => {

    const router = useRouter()

    return (
        <div className='box'>
            <div className='carousel'>
                <Card
                    image='https://cdn.pixabay.com/photo/2019/08/14/07/24/cook-4404944_960_720.jpg'
                    header='Bastien le cuisto Pro'
                    meta='Spécialté mé asiatique'
                    description='il cuisine comme pro et ravi tous les amateur de nems'
                    extra={
                        <Rating icon='heart' defaultRating={1} maxRating={5} />
                    }
                />
            </div>

            <div className='slider-action'>
                    <Header as='h1' className='brand' inverted style={{fontSize: '4vh !important'}} >Pour un monde meilleur, soyez le meilleur ! </Header>

                <Button
                    icon
                    size='big'
                    color='red'
                    labelPosition='right'
                    onClick={() => router.push('/search')}>
                        <Icon name='right arrow'/> Coachs OnLine !
                </Button>
            </div>

            <img
                className='ui fluid image fit'
                src='/intro.jpg'
                alt='coach'
            />
        </div>
    )
}

export default Slider
