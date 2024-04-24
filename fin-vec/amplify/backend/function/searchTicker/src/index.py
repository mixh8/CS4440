import json
from pinecone import Pinecone, ServerlessSpec
import os


def handler(event, context):
    print('received event:')
    print(event)

    pc_key = os.environ['PINECONE_API_KEY']
  
    pc = Pinecone(api_key=pc_key)

    idx = pc.Index('finvecdb')

    res = idx.query(vector=[1.0950232, 3.4633543], top_k=5, include_metadata=True)
    print(res)

    # TODO implement
    return {
        'statusCode': 200,
        'body': res
    }