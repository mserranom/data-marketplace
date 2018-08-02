import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')


def insert(*, table_name, item):
    table = dynamodb.Table(table_name)
    table.put_item(Item=item, TableName=table_name)


# def insert_all(*, table_name, items):
#     table = dynamodb.Table(table_name)
#     with table.batch_writer() as batch:
#         for item in items:
#             batch.put_item(Item=item)


def get_item(table_name, key):
    table = dynamodb.Table(table_name)
    response = table.get_item(Key=key)
    if "Item" in response:
        return response["Item"]
    else:
        return None


def get_all(table_name, key, value):
    table = dynamodb.Table(table_name)
    filtering_exp = Key(key).eq(value)
    response = table.query(KeyConditionExpression=filtering_exp)
    return response["Items"]


def delete(table_name, key):
    table = dynamodb.Table(table_name)
    table.delete_item(Key=key)


# def delete_all(table_name, keys):
#     table = dynamodb.Table(table_name)
#     with table.batch_writer() as batch:
#         for key in keys:
#             batch.delete_item(Key=key)


def insert_and_delete(*, table_name, items_to_add, keys_to_delete, key_names):
    table = dynamodb.Table(table_name)
    with table.batch_writer(overwrite_by_pkeys=key_names) as batch:
        for key in keys_to_delete:
            batch.delete_item(Key=key)
        for item in items_to_add:
            batch.put_item(Item=item)
