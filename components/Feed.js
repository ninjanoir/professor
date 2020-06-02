import { Feed, Icon } from "semantic-ui-react";

const Comments = ({user, comment, src}) => {
    return (
        <Feed>
        <Feed.Event>
            <Feed.Label image={src} />
            <Feed.Content>
                <Feed.Summary>
                    <a>{user}</a> posté un commentaire
                </Feed.Summary>
                <Feed.Extra text>
                    {comment}
                </Feed.Extra>

                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' /> 5
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
        </Feed>
    );
};

export default Comments;
