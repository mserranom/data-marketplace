import boto3
from botocore.exceptions import ClientError
from chalice import CognitoUserPoolAuthorizer, UnauthorizedError

client = boto3.client('cognito-idp')

authorizer = CognitoUserPoolAuthorizer(
    'user-pool',
    provider_arns=['arn:aws:cognito-idp:us-west-2:280996535957:userpool/us-west-2_CoIS7kwaJ'])


def get_user_id(current_request):
    access_token = current_request.headers["Authorization"]
    response = get_user_details(access_token)
    return response["Username"]


def get_user_details(token):
    try:
        return client.get_user(AccessToken=token)
    except ClientError as err:
        raise UnauthorizedError(err)


