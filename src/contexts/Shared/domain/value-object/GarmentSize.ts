import { ValueObject } from "./ValueObject";

export class GarmentSize extends ValueObject<string> {

    private validGarmentSize = [
        '28', '30', '32', '34', '36', '38', '40', '42', '44', '46',
        'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL',
    ];

    constructor(value: string) {
        super(value)
        this.ensureValidGarmentSize(value)
    }
    
    private ensureValidGarmentSize(value: string) {
        if (!this.validGarmentSize.includes(value.toUpperCase()) || value === '')
            throw Error(`The Garment Size <${value}> is not valid`);
    }
}