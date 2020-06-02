import {Menu} from 'semantic-ui-react'

export default class NavForProfile extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = { activeItem: 'profile' }
    }
    



    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })

        return this.props.handleTab(name);
    
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu pointing secondary>
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='competences'
                    active={activeItem === 'competences'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='entreprise'
                    active={activeItem === 'entreprise'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}
