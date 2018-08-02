# https://github.com/keleshev/schema
from schema import Optional, Schema, SchemaError

schema = Schema({
    'id': str,
    'name': str,
    'url': str,
    'format': str,
    Optional('tags', default=[]): [str], # TODO: check unique!
    Optional('interval', default=60): int,
    Optional('long_description'): str
})


def validate(config):
    try:
        result = schema.validate(config)
        return {'success': True, 'data': result}
    except SchemaError as err:
        return {'success': False, 'error_message': "" + err.code}
