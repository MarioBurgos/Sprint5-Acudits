export interface IJoke {
    id: string;
    joke: string;
    value: string;
    status: number;
    fetchAJoke():Promise<IJoke>;//
}