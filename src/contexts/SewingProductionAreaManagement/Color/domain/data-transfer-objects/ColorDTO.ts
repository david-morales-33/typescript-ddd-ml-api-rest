

export class ColorDTO {

    private _className: string = 'Color.DTO';

    constructor(
        readonly id: string,
        readonly label: string,
        readonly state: boolean
    ) { }

    public get ColorName(): string {
        return this._className;
    }
}