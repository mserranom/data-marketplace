import backend.aws.dynamodb as dynamodb
from backend.util.environment import get_name


def delete_subscription(config_key, current_user_id):
    key = {
        "user_id": current_user_id,
        "config_key": config_key }
    dynamodb.delete(table_name=get_name('subscriptions'), key=key)