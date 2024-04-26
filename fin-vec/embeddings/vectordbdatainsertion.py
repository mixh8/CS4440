from pinecone import Pinecone
import pandas as pd

pc = Pinecone(api_key="f700ccb8-6e8e-4f10-9fe9-5d83a9ba46cc")
index = pc.Index("finvecdb")
embeddings_df = pd.read_csv("/Users/logandrawdy/Documents/GA Tech- Year Three/CS 4440fake/embeddings.csv")
og_data = pd.read_csv("/Users/logandrawdy/Documents/GA Tech- Year Three/CS 4440fake/dataset.csv")
embeddings_df["Price Change"] = og_data['7d_price_change']
embeddings_df["unix_date"] = og_data["unix_time"]
print(embeddings_df)
vectors = []
for _, row in embeddings_df.iterrows():
    date = row['Date']
    unix_date = row["unix_date"]
    price_change = row["Price Change"]
    ticker = row['Ticker']
    industry = row['industry']
    vector  = [row['0'],row['1']]
    field = {
        "id": ticker + " " + date,
        "values": vector,
        "metadata": {"industry" : industry, "ticker": ticker, "date" : unix_date, "Price Change": price_change}
    }
    vectors.append(field)
    if len(vectors) == 1000:
        index.upsert(vectors)
        vectors = []
        print("batch complete")
index.upsert(vectors)
print("last batch complete")