// Definizione e tipizzazione delle risorse

export type Device = {
    title: string,
    category: 'smartphone' | 'tablet' | 'smartwatch',
    brand: string,
    colors: [string, ...string[]],
    price: number,
    sizeScreen?: number,
    ram?: number,
    storage?: number,
    image: string
}

export type ElectricScooter = {
    title: string,
    category: 'electric-scooter',
    price: number,
    brand: string,
    colors: [string, ...string[]],
    image: string,
    speed?: number,
    batteryPower?: number
}