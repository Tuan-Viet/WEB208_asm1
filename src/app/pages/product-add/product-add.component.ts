import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router) {

  }
  productForm = this.formBuilder.group({
    name: [''],
    price: [0]
  })

  onHandleSubmit() {
    const product: IProduct = {
      id: '',
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0
    }

    this.productService.addProduct(product).subscribe(data => {
      console.log(data);
      alert("Them thanh cong")
      this.router.navigate(['product'])
    })
  }
}
