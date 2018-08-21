
import yaml
from chalice import BadRequestError

import backend.aws.cognito as cognito
import backend.aws.dynamodb as dynamodb
from backend.config_validator import validate

# TODO: move to util module

ENVIRONMENT = "dev"

def get_name(resource): 
    return resource + "-" + ENVIRONMENT


def _validate_config(raw_config):
    is_yaml = "yaml" in raw_config
    if is_yaml:
        try:
            raw_config = yaml.load(raw_config["yaml"])
        except yaml.YAMLError as err:
            raise BadRequestError("invalid configuration: " + str(err))

    validate_result = validate(raw_config)

    if validate_result["success"]:
        return validate_result["data"]
    else:
        raise BadRequestError("invalid configuration: " + validate_result["error_message"])


def _get_existing_config(config, current_user_id):
    key = { "user_id": current_user_id, "id": config["id"] }
    return dynamodb.get_item(table_name=get_name('configs'), key=key)


def _upsert_config_item(config, current_user_id):
    item = {
        "id": config["id"],
        "user_id": current_user_id,
        "config": config}
    dynamodb.insert(table_name=get_name('configs'), item=item)


def _upsert_polling_subscription(config):
    item = {
        "interval": config["interval"],
        "url": config["url"]}
    dynamodb.insert(table_name=get_name('polling_subscriptions'), item=item)


def _update_config_tags(config, current_user_id, existing_tags):
    tags_to_add = []
    for tag in config["tags"]:
        tags_to_add.append({
            "tag": tag,
            "config_key": current_user_id + "/" + config["id"]})

    tag_keys_to_delete = []
    for tag in existing_tags:
        tag_keys_to_delete.append({
            "tag": tag,
            "config_key": current_user_id + "/" + config["id"]})
    dynamodb.insert_and_delete(table_name=get_name('config_tags'),
                               items_to_add=tags_to_add,
                               keys_to_delete=tag_keys_to_delete,
                               key_names=['tag', 'config_key'])


def config_upsert(app):
    config = _validate_config(app.current_request.json_body)
    current_user_id = cognito.get_user_id(app.current_request)

    existing_config = _get_existing_config(config, current_user_id)

    existing_tags = []
    if existing_config:
        existing_tags = existing_config["config"]["tags"]

    _upsert_config_item(config, current_user_id)
    _upsert_polling_subscription(config)
    _update_config_tags(config, current_user_id, existing_tags)




