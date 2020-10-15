import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async getProductById(id: string): Promise<Product | void> {
        const checkObjectIDFormat = new RegExp('^[0-9a-fA-F]{24}$');

        const validId = checkObjectIDFormat.test(id);
        if (!validId) {
            throw new BadRequestException('Id is not in a valid format');
        }
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
        return product;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const createdProduct = new this.productModel(createProductDTO);
        await createdProduct.save();
        return createdProduct;
    }

    async addProducts(createProductDTOArr: CreateProductDTO[]): Promise<string> {
        await this.productModel.insertMany(createProductDTOArr);
        return `${createProductDTOArr.length} products added`;
    }

    async deleteProduct(id: string): Promise<string | void> {
        await this.getProductById(id);
        const result = await this.productModel.deleteOne({ _id: id });
        if (!result.deletedCount) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        }
        return `The product with id: ${id} was deleted`;
    }

    async updateProduct(id: string, updateProductDTO: CreateProductDTO): Promise<string> {
        await this.getProductById(id);

        const result = await this.productModel.updateOne({ _id: id }, updateProductDTO);
        if (!result.nModified) {
            return `The product with id: ${id} was not modified`;
        }
        return `The product with id: ${id} was modified`;
    }
}
