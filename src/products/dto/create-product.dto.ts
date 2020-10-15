import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDefined,
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
    IsUrl,
} from 'class-validator';

export class CreateProductDTO {
    @IsNotEmpty({
        message: 'The name cannot be empty',
    })
    @IsDefined({
        message: 'The name must be defined',
    })
    @IsString({
        message: 'The name must be a string',
    })
    readonly name: string;

    @IsInt({
        message: 'The price must be a integer number',
    })
    @IsPositive({
        message: 'The price must be a positive number',
    })
    @IsDefined({
        message: 'The price must be defined',
    })
    readonly price: number;

    @IsDefined({
        message: 'The manufacturer must be defined',
    })
    @IsString({
        message: 'The manufacturer must be a string',
    })
    readonly manufacturer: string;

    @IsDefined({
        message: 'The category must be defined',
    })
    @IsArray({
        message: 'The categories must be an array',
    })
    @ArrayNotEmpty({
        message: 'There must be at least one category',
    })
    readonly categories: string[];

    @IsNotEmpty({
        message: 'The image cannot be empty',
    })
    @IsUrl()
    @IsDefined({
        message: 'The image must be defined',
    })
    @IsString({
        message: 'The image must be a string',
    })
    readonly image: string;

    @IsNotEmpty({
        message: 'The thumbnail cannot be empty',
    })
    @IsUrl()
    @IsDefined({
        message: 'The thumbnail must be defined',
    })
    @IsString({
        message: 'The thumbnail must be a string',
    })
    readonly thumbnail: string;

    @IsDefined({
        message: 'The stock status must be defined',
    })
    @IsBoolean({
        message: 'The stock status must be a boolean: true or false',
    })
    readonly inStock: boolean;

    constructor(
        name: string,
        price: number,
        manufacturer: string,
        categories: string[],
        image: string,
        thumbnail: string,
        inStock: boolean
    ) {
        this.name = name;
        this.price = price;
        this.manufacturer = manufacturer;
        this.categories = categories;
        this.image = image;
        this.thumbnail = thumbnail;
        this.inStock = inStock;
    }
}
