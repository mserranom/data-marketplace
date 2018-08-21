
import backend.aws.dynamodb as dynamodb


# TODO: move to util module

ENVIRONMENT = "dev"

def get_name(resource):
    return resource + "-" + ENVIRONMENT


def config_get_by_tag(tag_name):
    tags = dynamodb.get_all(
        table_name=get_name('config_tags'),
        key='tag',
        value=tag_name)

    configs = []
    for tag in tags:
        config_key = tag["config_key"].split("/")
        key = { "user_id": config_key[0], "id": config_key[1] }
        configs.append(dynamodb.get_item(table_name=get_name('configs'), key=key))

    return configs





