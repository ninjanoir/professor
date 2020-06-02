import { Card, Rating, Button, Icon } from 'semantic-ui-react'
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
                <Button
                    size='big'
                    color='black'
                    onClick={() => router.push('/search')}>
                        <Icon name='searchengin' />
                    Find your coach
                </Button>
            </div>

            <img
                className='ui fluid image fit'
                src='https://cdn.pixabay.com/photo/2016/02/19/11/54/surfing-1210040_960_720.jpg'
                alt='coach'
            />
        </div>
    )
}

export default Slider
