import torch
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import pandas as pd
import torch.nn as nn
from autoencoder import Autoencoder
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import numpy as np

def load_data(file_path):
    df = pd.read_csv(file_path)
    print(df.shape)
    df.replace([np.inf], 100, inplace=True)
    tickers = df['Ticker']
    dates = df['Date']
    industries = df['industry']
    df.drop(['Ticker'], axis=1, inplace=True)
    df.drop(['Date'], axis=1, inplace=True)
    df.drop(['industry'], axis=1, inplace=True)
    df.drop(['industry_encoded'], axis=1, inplace=True)
    scaler = MinMaxScaler() # This is so large numerical features (like price) don't dominate the MSE loss
    data = scaler.fit_transform(df.values)
    return tickers, data, dates, industries

def train(data, epochs=50, batch_size=75, encoding_dim=32):
    data_train, data_test = train_test_split(data, test_size=0.2, random_state=42)
    train_dataset = TensorDataset(torch.FloatTensor(data_train))
    test_dataset = TensorDataset(torch.FloatTensor(data_test))

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

    input_size = data.shape[1]
    model = Autoencoder(input_size, encoding_dim)
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.000005)

    model.train()
    for epoch in range(epochs):
        total_loss = 0
        for batch in train_loader:
            inputs = batch[0]
            _, outputs = model(inputs)
            loss = criterion(outputs, inputs)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        avg_loss = total_loss / len(train_loader)
        print(f'Epoch {epoch+1}, Average Loss: {avg_loss:.4f}')

    model.eval()
    with torch.no_grad():
        total_test_loss = 0
        for batch in test_loader:
            inputs = batch[0]
            _, outputs = model(inputs)
            loss = criterion(outputs, inputs)
            total_test_loss += loss.item()
        avg_test_loss = total_test_loss / len(test_loader)
        print(f'Test Loss: {avg_test_loss:.4f}')

    # Save model
    torch.save(model.state_dict(), 'autoencoder.pth')
    return model

def load_model(model_path, input_size, encoding_dim):
    model = Autoencoder(input_size, encoding_dim)
    model.load_state_dict(torch.load(model_path))
    model.eval()
    return model

def generate_embeddings(data, model):
    # Assumes data is already scaled
    data_loader = DataLoader(TensorDataset(torch.FloatTensor(data)), batch_size=64, shuffle=False)
    embeddings = []
    with torch.no_grad():
        for batch in data_loader:
            inputs = batch[0]
            encoded, _ = model(inputs)
            embeddings.extend(encoded.numpy())
    return embeddings

def process_and_save_embeddings(industries, dates, tickers, data, model_path, encoding_dim=32):
    scaler = MinMaxScaler()
    data = scaler.fit_transform(data)

    input_size = data.shape[1]
    model = load_model(model_path, input_size, encoding_dim)

    embeddings = generate_embeddings(data, model)
    result_df = pd.DataFrame(embeddings)
    result_df.insert(0, 'industry', industries)
    result_df.insert(0, 'Ticker', tickers)  # Insert the tickers column at the first position
    result_df.insert(0, 'Date', dates)
    print(result_df)
    result_df.to_csv('embeddings.csv', index=False)


if __name__ == "__main__":
    tickers, data, dates, industries = load_data('/Users/logandrawdy/Documents/GA Tech- Year Three/CS 4440/dataset.csv')
    train(data, encoding_dim=2)
    process_and_save_embeddings(industries, dates, tickers, data, "autoencoder.pth", encoding_dim=2)
