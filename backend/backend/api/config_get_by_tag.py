
import backend.aws.dynamodb as dynamodb


def config_get_by_tag(tag_name):
    tags = dynamodb.get_all(
        table_name='config_tags',
        key='tag',
        value=tag_name)

    configs = []
    for tag in tags:
        key = { "id": tag["config_id"], "user_id": tag["user_id"] }
        configs.append(dynamodb.get_item(table_name='configs', key=key))

    return configs





