import json
from pinecone import Pinecone, ServerlessSpec
import os
import boto3
from boto3.dynamodb.conditions import Key, Attr


def handler(event, context):
    print('received event:')
    print(event)

    # Parse the event body
    event_parameters = event['queryStringParameters']
    ticker = event_parameters['ticker'].upper()
    unix_time = int(event_parameters['unix_time'])
    k = int(event_parameters['k'])
    performance = event_parameters['performance']

    dynamo_client = boto3.client('dynamodb')

    response = dynamo_client.get_item(
        TableName='findata',
        Key={
            'ticker': {'S': ticker},
            'unix_time': {'N': str(unix_time)}
        }
    )

    data = response['Item']

    price_change = float(data['7d_price_change']['S'])

    embedding = [float(data['e_vector_0']['S']),
                 float(data['e_vector_1']['S'])]

    pc_key = os.environ['PINECONE_API_KEY']

    pc = Pinecone(api_key=pc_key)

    idx = pc.Index('finvecdb')

    filter_dict = {
        'date': {
            '$eq': unix_time
        }
    }
    if performance == 'Underperforming':
        filter_dict['Price Change'] = {
            '$lt': price_change
        }
    elif performance == 'Overperforming':
        filter_dict['Price Change'] = {
            '$gt': price_change
        }

    res = idx.query(
        vector=embedding,
        top_k=k,
        filter=filter_dict,
        include_metadata=True

    )
    print("Pinecone result: ", res)

    similar_data = {}

    # add queried stock data
    response = dynamo_client.query(
        TableName='findata',
        KeyConditionExpression='ticker = :ticker',
        ExpressionAttributeValues={
            ':ticker': {'S': ticker}
        },
        ProjectionExpression='unix_time,industry,price'
    )
    data = response['Items']
    similar_data[ticker] = data

    for result in res['matches']:
        ticker = result['metadata']['ticker']
        response = dynamo_client.query(
            TableName='findata',
            KeyConditionExpression='ticker = :ticker',
            ExpressionAttributeValues={
                ':ticker': {'S': ticker}
            },
            ProjectionExpression='unix_time,industry,price'
        )
        data = response['Items']
        similar_data[ticker] = data

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(similar_data, default=str)
    }

