import { List } from "semantic-ui-react";

const ListOffers = ({ items }) => {
    return (
        <List divided relaxed>
        {items.map((item, index) => (
            <List.Item key={index} >
            <List.Icon color="olive" name="gift" size="large" verticalAlign="middle" />
            <List.Content>
                <List.Header as="h5">{item.title}</List.Header>
                <List.Description>{item.description}</List.Description>
            </List.Content>
            </List.Item>
        ))}
        </List>
    );
};

export default ListOffers;
