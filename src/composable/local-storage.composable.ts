function setLocalStorage (key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage (key: string): string | null {
    let value: string | null = localStorage.getItem(key);
    if (value) {
        value = JSON.parse(value);
    }
    return value;
}

export default {
    set: setLocalStorage,
    get: getLocalStorage,
}