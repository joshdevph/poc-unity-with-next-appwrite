import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://syd.cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('68660b33001284d5ebd6'); // Your project ID

export const account = new Account(client);