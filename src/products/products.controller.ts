import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
    private logger = new Logger('ProductsController');
    constructor(private productsService: ProductsService) {}

    @Get()
    getAllProducts(): Promise<Product[]> {
        this.logger.verbose('Get all products');
        return this.productsService.getAllProducts();
    }

    @Get('/:id')
    getProductById(@Param('id') id: string): Promise<Product | void> {
        this.logger.verbose(`Retrieve product with id: ${id}`);
        return this.productsService.getProductById(id);
    }

    @UseGuards(AuthGuard())
    @Post()
    @UsePipes(ValidationPipe)
    createProduct(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
        // To do: Add user info
        this.logger.verbose(`Create product with data: ${JSON.stringify(createProductDTO)}`);
        return this.productsService.createProduct(createProductDTO);
    }

    @UseGuards(AuthGuard())
    @Post('/batch')
    addProducts(@Body() createProductDTOArr: CreateProductDTO[]): Promise<string> {
        // To do: Add user info
        this.logger.verbose(`${createProductDTOArr} products were added`);
        return this.productsService.addProducts(createProductDTOArr);
    }

    @UseGuards(AuthGuard())
    @Delete('/:id')
    deleteProduct(@Param('id') id: string): Promise<void | string> {
        // To do: Add user info
        this.logger.verbose(`Product with id: ${id} was delete`);
        return this.productsService.deleteProduct(id);
    }

    @UseGuards(AuthGuard())
    @Put('/:id')
    updateProduct(
        @Param('id') id: string,
        @Body() updateProductDTO: CreateProductDTO
    ): Promise<string | void> {
        // To do: Add user info
        this.logger.verbose(
            `Product with id: ${id} was updated with new data: ${JSON.stringify(updateProductDTO)}`
        );
        return this.productsService.updateProduct(id, updateProductDTO);
    }
}
