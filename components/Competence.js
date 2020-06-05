import {Segment, List} from 'semantic-ui-react'

const Competence = props => {
    return (
            <Segment placeholder>
                <List divided verticalAlign='middle'>
                    {props.options.map((categorie, index) => {
                        return (
                            <List.Item key={index} className='task'>
                                <List.Icon
                                    color='grey'
                                    size='big'
                                    name={categorie.icon}
                                    verticalAlign='middle'
                                />
                                <List.Content>{categorie.nom}</List.Content>
                            </List.Item>
                        )
                    })}
                </List>
            </Segment>
    )
}

export default Competence
