import boto3
import urllib
from chalice import Chalice, CognitoUserPoolAuthorizer

import backend.aws.cognito as cognito
import backend.aws.dynamodb as dynamodb
from backend.api.config_get_by_tag import config_get_by_tag
from backend.api.config_upsert import config_upsert

client = boto3.client('lambda')

app = Chalice(app_name='data-marketplace-backend')
app.debug = True

authorizer = CognitoUserPoolAuthorizer(
    'MyPool', provider_arns=['arn:aws:cognito-idp:us-west-2:280996535957:userpool/us-west-2_CoIS7kwaJ'])


@app.route('/users/me', methods=['GET'], authorizer=authorizer, cors=True)
def me():
    access_token = app.current_request.headers["Authorization"]
    return cognito.get_user_details(access_token)


@app.route('/config', methods=['POST'], authorizer=authorizer, cors=True)
def config_post():
    config_upsert(app)


@app.route('/config', methods=['GET'], authorizer=authorizer, cors=True)
def get_all_configs():
    user_id = cognito.get_user_id(app.current_request)
    return dynamodb.get_all(table_name='configs', key='user_id', value=user_id)


@app.route('/user/{user_id}/config/{id}', methods=['GET'], authorizer=authorizer, cors=True)
def get_config(user_id, id):
    key = { "id": id, "user_id": user_id }
    return dynamodb.get_item(table_name='configs', key=key)


# TODO: id not a primary key!! I need to fix all these endpoints to add user_id/config_id as key
@app.route('/config/{id}', methods=['DELETE'], authorizer=authorizer, cors=True)
def delete_config(id):
    user_id = cognito.get_user_id(app.current_request)
    keys = {"user_id" : user_id, "id": id}
    return dynamodb.delete(table_name='configs', key=keys)


@app.route('/feeds/{user_id}/{id}', methods=['GET'], cors=True)
def get_feed(user_id, id):
    config = get_config(user_id, id)
    key = { "url": config["config"]["url"]}
    return dynamodb.get_item(table_name='live_feeds', key=key)


@app.route('/tags/{tag}', methods=['GET'], cors=True)
def get_configs_by_tag(tag):
    unquoted_tag = urllib.parse.unquote(tag)
    return config_get_by_tag(unquoted_tag)



