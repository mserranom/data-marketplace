import backend.aws.dynamodb as dynamodb
from backend.util.environment import get_name
from backend.util.config_key import parse_config_key


def get_subscriptions(current_user_id, subscriptions_keys_only):
    subscriptions = dynamodb.get_all(
        table_name=get_name('subscriptions'),
        key='user_id',
        value=current_user_id)

    if subscriptions_keys_only:
        return subscriptions
    else:
        config_keys = []
        for subscription in subscriptions:
            config_keys.append(parse_config_key(subscription['config_key']))
        
        return dynamodb.batch_get_all(get_name('configs'), config_keys)