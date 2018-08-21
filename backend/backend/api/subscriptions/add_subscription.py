import backend.aws.dynamodb as dynamodb
from backend.util.environment import get_name


def add_subscription(config_key, current_user_id):
    item = {
        "config_key": config_key,
        "user_id": current_user_id }
    dynamodb.insert(table_name=get_name('subscriptions'), item=item)