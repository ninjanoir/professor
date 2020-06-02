import { Item, Container, Header, Card } from "semantic-ui-react";


const About = () => (
  <div className="page_wrapper">
    <Item.Group>
      <Item>
        <Item.Image src="/arobinson.png" size="tiny" circular />
        <Item.Content verticalAlign="middle">
          <Item.Header as="a"> Alain Robinson</Item.Header>
          <Item.Meta>Develeppeur web</Item.Meta>
          <Item.Description>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
            quidem aspernatur adipisci eaque ratione. Qui aliquid natus ipsum
            obcaecati neque.
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>

    <Container textAlign="justified">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate nam
      rem quibusdam velit ut incidunt perferendis minus culpa similique soluta.
      Deleniti quas laboriosam eligendi minima, officia eos officiis nobis. Amet
      enim ullam quos deleniti ad labore, hic culpa accusantium nesciunt rem a
      tempore possimus quo veniam blanditiis officiis. Labore, officia.
      <div className="spacer">
        <Header as="h2" className='spacer'>Quel coach etes vous ?</Header>

        <Card.Group itemsPerRow={4} stackable>
          <Card
            meta="coach emploi"
            raised
            image='https://image.freepik.com/photos-gratuite/concept-presentation-femme-affaires-heureux_23-2147702550.jpg'
          />
          <Card
            meta="coach cuisine"
            raised
            image='https://image.freepik.com/photos-gratuite/vue-dessus-aliments-sains-vs-aliments-malsains_23-2148194603.jpg'
          />
          <Card
            meta="coach sportif"
            raised
            image='https://image.freepik.com/photos-gratuite/grimpeur-mur-paysage_23-2147665029.jpg'
          />
          <Card
            meta="informatique"
            raised
            image='https://image.freepik.com/photos-gratuite/gros-plan-sourire-technicien-male-se-serrer-main-dans-centre-service_23-2147883870.jpg'
          />

          {/* ------------------------------------------------ */}
                    <Card
            meta="Photographe"
            raised
            image='https://image.freepik.com/photos-gratuite/studio-photo-moderne-equipements-professionnels-lumieres-rougeoyantes_23-2148038959.jpg'
          />
          <Card
            meta="Coach bricolage"
            raised
            image='https://image.freepik.com/photos-gratuite/arrangement-maison-partir-outils-reparation-jaunes-plat_23-2148393072.jpg'
          />
          <Card
            meta="Coach musique"
            raised
            image='https://image.freepik.com/photos-gratuite/femme-guitare-fond-ciel_23-2147769090.jpg'
          />
          <Card
            meta="coach Web dev"
            raised
            image='https://image.freepik.com/photos-gratuite/vue-frontale-homme-femme-examiner-reactions-application_23-2148291493.jpg'
          />
        </Card.Group>
      </div>
    </Container>
  </div>
);

export default About;
