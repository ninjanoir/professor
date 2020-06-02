import Slider from "./../components/slider";
import { Card, Grid, Dimmer, Image, Button, Header,Icon } from "semantic-ui-react";
import Video from "../components/Embed";
import Comments from "../components/Feed";
import Paginate from "../components/Paginate";
import StayTuned from './../components/StayTuned';
import Router from 'next/router'


class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPages: 0,
      posts:this.props.data,
      currentPage: 1,
      postsPerPage: 3,
      currentPosts: [],

    };

    this.cardRef = React.createRef();
  }

  componentDidMount () {
    let totalPages = Math.ceil(this.props.data.length / this.state.postsPerPage);
    this.setState({totalPages: totalPages})
    this.getCurrentPage(this.state.currentPage)
  }



  handleShow = e => {
    this.cardRef.current = e.currentTarget.firstChild;
    this.cardRef.current.className = "ui dimmer active";
  };

  handleHide = () => {
    if (this.cardRef.current !== null) {
      this.cardRef.current.className = "ui dimmer";
    } else {
      return;
    }
  };

  renderContent = () => {
    const content = (
      <Button animated="fade" inverted>
        <Button.Content visible>Réserver ce coach</Button.Content>
        <Button.Content hidden>€12.99 par mois</Button.Content>
      </Button>
    );

    return { content: content };
  };


  //current post
  getCurrentPage = (numberPage) => {

    const lastIndexOfPostpage = numberPage * this.state.postsPerPage;

    const firstIndexOfPostPage = lastIndexOfPostpage - this.state.postsPerPage;

    const currentPostPage = this.state.posts.slice(firstIndexOfPostPage, lastIndexOfPostpage);

    return this.setState({currentPosts: currentPostPage})

  }


  handleChange = (e, data) => {
    this.setState({currentPage: data.activePage})
    this.getCurrentPage(data.activePage)
  }



  render() {
    const { currentPosts } = this.state;


    if (!currentPosts) {
      return <div>Chargement...</div>;
    }

    return (
      <>
        <Slider />
        <Header as="h1" className="centered">
          Réussir avec nos coachs
        </Header>
        <Header as="h4" className="centered">
          Recherchez votre coach par mot clef
        </Header>


        <Grid container stackable>
          <Grid.Row columns={4} className="centered">
            {currentPosts.map((coach, index) => (
              <Grid.Column width={5} key={index}>
                <Card centered>
                  <Dimmer.Dimmable
                    as={Image}
                    dimmer={this.renderContent()}
                    onMouseEnter={this.handleShow}
                    onMouseLeave={this.handleHide}
                    src={coach.avatar}
                    size="medium"
                  />
                  <Card.Content className="leftAlign">
                  <Card.Header>
                    {coach.name}
                  </Card.Header>
                  <Card.Meta>Champion de quoi</Card.Meta>
                  <Card.Description>
                    {coach.resume}
                  </Card.Description>
                  </Card.Content>
                  <Card.Content extra className="leftAlign">
                    <Icon name="like"/>
                    22
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
            <div className="spacer centered">
              <Paginate totalPages={this.state.totalPages} onChange={this.handleChange} />
            </div>
          </Grid.Row>
        </Grid>

        <Header as="h2" className="centered" style={{ padding: "5rem" }}>
          Ils parlent de nous..
        </Header>

        <Grid stackable className="centered">
          <Grid.Row columns={12}>
            <Grid.Column width={6}>
              <Comments
                src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                user="Paul Firstman"
                comment="super mon coach carrément révolutionnaire, il fallait ça pour mieux vivre sa vie...1heure par jour et c'est des années de gagné"
              />

              <Comments
                src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                user="Jenny love"
                comment="Voilà c'est décidé c'est fini d'acheter du poisson au supermarché, mais à quand un bon frigo solaire ?"
              />
            </Grid.Column>

            <Grid.Column width={6}>
              <Video />
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Header as="h2" className="centered" style={{ padding: "5rem" }}>
          Soyez aux nouvelles !...
        </Header>

          <StayTuned />

      </>
    );
  }
}

Index.getInitialProps = async () => {
  return await {
    data: [
      {
        name: "Juliette dev",
        resume: "Coach en programmation informatique",
        avatar:
          "https://image.freepik.com/photos-gratuite/jeune-femme-divan-maquette-ordinateur-portable_23-2148313187.jpg",
      },
      {
        name: "Sébastien Sportman",
        resume: "Coach sportif",
        avatar:
          "https://image.freepik.com/photos-gratuite/souriant-jeune-homme-fait-exercice-dans-salle-gym_23-2147949560.jpg",
      },
      {
        name: "Priscilla Rusher",
        resume: "Coach en developpement personnel",
        avatar:
          "https://image.freepik.com/photos-gratuite/portrait-adulte-femme-tenue-documents_23-2148513892.jpg",
      },
      {
        name: "Julien Assange",
        resume: "Coach en programmation informatique",
        avatar:
          "https://cdn.pixabay.com/photo/2016/12/27/21/49/application-1934972_960_720.jpg",
      },
      {
        name: "Paloma Indi Josephine",
        resume: "Professeur de guitare",
        avatar:
          "https://cdn.pixabay.com/photo/2015/09/17/14/24/guitar-944262_960_720.jpg",
      },
      {
        name: "Leny Robinson",
        resume: "Coach Photographe et aventurier",
        avatar:
          "https://cdn.pixabay.com/photo/2016/03/17/11/42/photographer-1262797_960_720.jpg",
      },
    ],
  };
};

export default Index;
