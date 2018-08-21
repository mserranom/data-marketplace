def parse_config_key(config_key):
    index = config_key.find('/')
    if index < 0:
        raise ValueError(config_key + ' is not a valid config key, should contain "/"')
    return  {
        "user_id": config_key[:index],
        "id": config_key[index + 1:]
    }